import React from 'react';
import { getSession } from 'next-auth/react';
import { prisma } from '../../lib/prismadb';
import EditingLayout from '../../components/layout';
import { useRouter } from 'next/router';
const Blog = (props) => {
    const { articles = [] } = props;
    const router = useRouter();
    return (
        <EditingLayout>
            <div className="w-full m-auto">
                <div className="grid grid-cols-3 mb-6">
                    <p className="text-3xl bold">Blog</p>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            router.push('/blog/new');
                        }}
                        className="justify-self-center px-4 py-2 text-base font-medium text-black bg-white border-2 border-black rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-700"
                    >
                        New
                    </button>
                </div>
                {articles.map(({ id, title, description, state }) => (
                    <div className="hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/blog/${id}`)}>
                        <div className="flex w-full leading-normal border-b border-gray-400">
                            <div className="w-full mb-4">
                                <div className="mb-1 text-xl font-bold text-gray-900">{title}</div>
                                <p className="text-base text-gray-700">{description}</p>
                                <p
                                    className={`text-center text-base text-white p-1 my-1 ${
                                        state === 'Published' ? 'bg-green-700' : 'bg-gray-500'
                                    }`}
                                >
                                    {state}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
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
    const { articles } = await prisma.user.findFirst({
        where: {
            email: currentUserEmail,
        },
        select: {
            articles: { where: { deletedAt: null } },
        },
    });
    return {
        props: { articles: JSON.parse(JSON.stringify(articles)) },
    };
}
