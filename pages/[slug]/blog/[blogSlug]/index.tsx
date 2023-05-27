import { User, Article } from '@prisma/client';
import { ArticleState } from '@prisma/client';
import moment from 'moment';
import { useRouter } from 'next/router';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
const Article = ({ article, user, hasProjects }) => {
    const router = useRouter();
    const { title, content, imageUrl, createdAt } = article ?? {};
    const { name: userName, image: userProfileImage, slug, linkedInUrl, githubUrl } = user;

    return (
        <div className="text-center">
            <p className="text-xl my-5 font-bold md:text-2xl lg:text-6xl">{userName}</p>
            <div className="flex justify-center border-b pb-5">
                <img
                    src={userProfileImage}
                    className="h-8 w-8 md:w-14 md:h-14 lg:h-12 lg:w-12 border border-black rounded-full mx-2"
                    alt="Home"
                    title="Home"
                    onClick={() => router.push(`/${slug}`)}
                />

                {hasProjects && (
                    <img
                        src="https://cdn-icons-png.flaticon.com/256/5129/5129558.png"
                        className="h-8 w-8 md:w-12 md:h-12 lg:h-12 lg:w-12  mx-2"
                        alt="Projects"
                        title="Projects"
                        onClick={() => router.push(`/${slug}/projects`)}
                    />
                )}
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1187/1187544.png"
                    className="h-8 w-8 md:w-12 md:h-12 lg:h-12 lg:w-12  mx-2"
                    alt="Blog"
                    title="Blog"
                    onClick={() => router.push(`/${slug}/blog`)}
                />
                <img
                    src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
                    className="h-8 w-8 md:w-12 md:h-12 lg:h-12 lg:w-12  rounded-full mx-2"
                    alt="LinkedIn"
                    title="LinkedIn"
                    onClick={() => router.push(linkedInUrl)}
                />
                <img
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    className="h-8 w-8 md:w-12 md:h-12 lg:h-12 lg:w-12 rounded-full mx-2"
                    alt="GitHub"
                    title="GitHub"
                    onClick={() => router.push(githubUrl)}
                />
            </div>

            <div className="m-auto mt-5">
                <div className="mb-5">
                    <img className="mx-auto mb-5 rounded-md w-64 h-64 lg:hidden" src={imageUrl}></img>
                    <p className="text-xl font-bold md:text-4xl">{title}</p>
                    <p className="text-gray-500 text-lg">{moment.utc(createdAt).format('L')}</p>
                </div>

                <div className="flex justify-center">
                    <div
                        className="text-left prose w-11/12 prose-gray p-1 max-h-full min-h-full overflow-y-auto max-w-full"
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
    const blogSlug = context?.query?.blogSlug;

    const user: User = await prisma.user.findFirstOrThrow({
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

    const article: Article = await prisma.article.findFirst({
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
