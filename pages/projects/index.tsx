import { getSession } from 'next-auth/react';
import React from 'react';
import EditingLayout from '../../components/layout';
import { useRouter } from 'next/router';
import { prisma } from '../../lib/prismadb';

const Projects = (props) => {
    const { projects = [] } = props;
    const router = useRouter();

    return (
        <EditingLayout>
            <div className="w-full m-auto">
                <div className="grid grid-cols-3 mb-6">
                    <p className="text-3xl bold">Projects</p>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            router.push('/projects/new');
                        }}
                        className="justify-self-center px-4 py-2 text-base font-medium text-black bg-white border-2 border-black rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-700"
                    >
                        New
                    </button>
                </div>
                {projects.map((project, index) => {
                    const { id, title, description, state } = project ?? {};
                    return (
                        <div
                            className="hover:bg-gray-50 cursor-pointer"
                            key={index}
                            onClick={() => router.push(`/projects/${id}`)}
                        >
                            <div className="flex w-full leading-normal border-b border-gray-400" key={index}>
                                <div className="w-full mb-4">
                                    <div className="mb-1 text-xl font-bold text-gray-900" key={`title-${index}`}>
                                        {title}
                                    </div>
                                    <p className="text-base text-gray-700" key={`descr-${index}`}>
                                        {description}
                                    </p>
                                    <p
                                        className={`text-center text-base text-white p-1 my-1 ${
                                            state === 'Published' ? 'bg-green-700' : 'bg-gray-500'
                                        }`}
                                        key={`state-${index}`}
                                    >
                                        {state}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </EditingLayout>
    );
};

export default Projects;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/home',
            },
        };
    }
    const currentUserEmail = session.user.email;

    const { projects } = await prisma.user.findFirstOrThrow({
        where: {
            email: currentUserEmail,
        },
        select: {
            projects: {
                where: {
                    deletedAt: null,
                },
            },
        },
    });

    return {
        props: { projects: JSON.parse(JSON.stringify(projects)) },
    };
}
