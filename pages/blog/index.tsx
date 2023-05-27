import React, { useState } from 'react';
import { getSession } from 'next-auth/react';
import Loading from '../../components/loading';
import Articles from '../../components/articles/articles';
import prisma from '../../lib/prismadb';
import EditingLayout from '../../components/layout';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';

const Blog = (props) => {
    const { articles = [] } = props;
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) return <Loading />;

    return (
        <EditingLayout>
            <div className="flex whitespace-nowrap mb-3">
                <h1 className="font-medium text-xl pl-2">Blog</h1>
                <div className="group flex relative">
                    <a href="https://www.npmjs.com/package/marked" target="_blank" rel="noopener noreferrer">
                        <QuestionMarkCircleIcon className="h-7 w-7 ml-4" />
                    </a>
                    <span
                        className="group-hover:opacity-100 transition-opacity bg-gray-900 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
                -translate-x-1/2 -translate-y-12 opacity-0 m-4 mx-auto"
                    >
                        Markdown Documentation
                    </span>
                </div>
            </div>
            <div className="min-h-[60vh]">
                <Articles userArticles={articles} />
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
    const articles = await prisma.user.findFirst({
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
