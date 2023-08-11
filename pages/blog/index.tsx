import React from 'react';
import { getSession } from 'next-auth/react';
import EditingLayout from '../../components/layout';
import { useRouter } from 'next/router';
import { prisma } from '../../lib/prismadb';

const Blog = ({ user }) => {
    const { slug: userSlug, articles, projects, views } = user ?? {};
    const router = useRouter();

    return (
        <EditingLayout
            userSlug={userSlug}
            articleCount={articles?.length ?? 0}
            projectCount={projects?.length ?? 0}
            views={views}
        >
            <div className="w-full h-full">
                <div className="flex justify-between mb-6 md:block">
                    <p className="inline text-3xl align-middle bold">Blog</p>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            router.push('/blog/new');
                        }}
                        className="inline px-4 py-1 ml-6 text-base font-medium text-black bg-white border-2 border-black rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-500"
                    >
                        New
                    </button>
                </div>
                <div className="divide-y divide-slate-300">
                    {articles.map((article, index) => {
                        const { id, title, description, state } = article ?? {};
                        return (
                            <div
                                className="cursor-pointer hover:bg-gray-200"
                                key={index}
                                onClick={() => router.push(`/blog/${id}`)}
                            >
                                <div className="flex w-full leading-normal border-gray-400" key={index}>
                                    <div className="w-full mb-4" key={index}>
                                        <div className="mb-1 text-xl font-bold text-gray-900" key={index}>
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
                {articles.length === 0 && (
                    <div className="flex items-center justify-center m-auto text-center h-2/3 lg:w-10/12">
                        <span className="text-2xl">Add a new blog article to get started.</span>
                    </div>
                )}
            </div>
        </EditingLayout>
    );
};

export default Blog;

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
    const user = await prisma.user.findFirst({
        where: {
            email: currentUserEmail,
        },
        include: {
            articles: { where: { deletedAt: null } },
            projects: { where: { deletedAt: null } },
        },
    });
    return {
        props: { user: JSON.parse(JSON.stringify(user)) },
    };
}
