import { User, Article, ArticleState } from '@prisma/client';
import moment from 'moment';
import { useRouter } from 'next/router';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { prisma } from '../../../lib/prismadb';

const Article = ({ article, user, hasProjects }) => {
    const router = useRouter();
    const { title, content, imageUrl, createdAt } = article ?? {};
    const { name: userName, image: userProfileImage, slug, linkedInUrl, gitHubUrl } = user;

    return (
        <div className="mb-8 text-center">
            <p className="my-5 text-xl font-bold md:text-2xl lg:text-6xl">{userName}</p>
            <div className="flex justify-center pb-5 border-b">
                <img
                    src={userProfileImage}
                    className="w-8 h-8 mx-2 border border-black rounded-full md:w-14 md:h-14 lg:h-12 lg:w-12 hover:cursor-pointer"
                    alt="Home"
                    title="Home"
                    onClick={() => router.push(`/${slug}`)}
                />

                {hasProjects && (
                    <img
                        src="https://cdn-icons-png.flaticon.com/256/5129/5129558.png"
                        className="w-8 h-8 mx-2 md:w-12 md:h-12 lg:h-12 lg:w-12 hover:cursor-pointer"
                        alt="Projects"
                        title="Projects"
                        onClick={() => router.push(`/${slug}/projects`)}
                    />
                )}
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1187/1187544.png"
                    className="w-8 h-8 mx-2 md:w-12 md:h-12 lg:h-12 lg:w-12 hover:cursor-pointer"
                    alt="Blog"
                    title="Blog"
                    onClick={() => router.push(`/${slug}/blog`)}
                />
                {gitHubUrl && (
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                        className="w-8 h-8 mx-2 rounded-full md:w-12 md:h-12 lg:h-12 lg:w-12 hover:cursor-pointer"
                        alt="GitHub"
                        title="GitHub"
                        onClick={() => router.push(gitHubUrl)}
                    />
                )}
                {linkedInUrl && (
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
                        className="w-8 h-8 mx-2 rounded-full md:w-12 md:h-12 lg:h-12 lg:w-12 hover:cursor-pointer"
                        alt="LinkedIn"
                        title="LinkedIn"
                        onClick={() => router.push(linkedInUrl)}
                    />
                )}
            </div>

            <div className="m-auto mt-5">
                <div className="mb-5">
                    <img className="w-64 h-64 mx-auto mb-5 rounded-md lg:hidden" src={imageUrl}></img>
                    <p className="text-xl font-bold md:text-4xl">{title}</p>
                    <p className="text-lg text-gray-500">{moment.utc(createdAt).format('L')}</p>
                </div>

                <div className="flex justify-center">
                    <div
                        className="w-11/12 max-w-full max-h-full min-h-full p-1 overflow-y-auto prose text-left prose-gray"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(content)) }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Article;

export async function getServerSideProps(context) {
    const slug = context?.query?.slug;
    const blogSlug = context?.query?.blogSlug.toString();

    const user = await prisma.user.findFirstOrThrow({
        where: {
            slug,
        },
        include: {
            projects: {
                where: {
                    deletedAt: null,
                    state: 'Published',
                },
            },
            articles: {
                where: {
                    deletedAt: null,
                    state: 'Published',
                },
                orderBy: {
                    createdAt: 'desc',
                },
            },
        },
    });

    const article: Article = await prisma.article.findFirstOrThrow({
        where: {
            userId: user.id,
            slug: blogSlug,
            deletedAt: null,
            state: ArticleState.Published,
        },
    });

    if (!user || !article) {
        return {
            redirect: { destination: '/404' },
        };
    }

    await prisma.article.update({
        where: {
            id: article.id,
        },
        data: {
            views: {
                increment: 1,
            },
        },
    });

    const { projects } = user ?? {};
    const hasProjects = projects.length > 0;

    return {
        props: {
            article: JSON.parse(JSON.stringify(article)),
            user: JSON.parse(JSON.stringify(user)),
            hasProjects,
            hasArticles: true,
        },
    };
}
