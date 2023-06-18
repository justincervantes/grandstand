import React from 'react';
import { getSession } from 'next-auth/react';
import EditingLayout from '../../components/layout';
import { useRouter } from 'next/router';
import { prisma } from '../../lib/prismadb';

const Projects = (props) => {
    const { projects = [] } = props;
    const router = useRouter();

    return (
        <EditingLayout>
            <div className="w-full h-full m-auto">
                <div className="flex justify-between m-auto mb-6 md:block">
                    <p className="inline text-3xl align-middle bold">Projects</p>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            router.push('/projects/new');
                        }}
                        className="inline px-4 py-1 ml-6 text-base font-medium text-black bg-white border-2 border-black rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-500"
                    >
                        New
                    </button>
                </div>
                <div className="divide-y divide-slate-300">
                    {projects.map((project, index) => {
                        const { id, title, description, state } = project ?? {};
                        return (
                            <div
                                className="cursor-pointer hover:bg-gray-50"
                                key={index}
                                onClick={() => router.push(`/projects/${id}`)}
                            >
                                <div className="flex w-full leading-normal" key={index}>
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
                {projects.length === 0 && (
                    <div className="flex items-center justify-center m-auto text-center h-2/3 lg:w-10/12">
                        <span className="text-2xl">
                            Add a new project article to get started. If no blog articles are present, this won't appear
                            as a link in your profile.
                        </span>
                    </div>
                )}
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
