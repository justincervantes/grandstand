import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Loading from '../components/loading';
import OrganizationArticles from '../components/articles/organization-articles';
import prisma from '../lib/prismadb';
import { localStorageKeys } from '../lib/localStorageKeys';

const Blog = (props) => {
    const { articles = [] } = props;
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) return <Loading />;

    return (
        <React.Fragment>
            <div className="flex justify-between whitespace-nowrap mb-3">
                <h1 className="font-medium text-xl pl-2">Blog</h1>
            </div>
            <div className="max-h-[73npm run decoration-violet-50vh] min-h-[73vh]">
                <OrganizationArticles userArticles={articles} />
            </div>
        </React.Fragment>
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
            createdArticles: true,
        },
    });
    return {
        props: { articles: JSON.parse(JSON.stringify(articles)) },
    };
}
