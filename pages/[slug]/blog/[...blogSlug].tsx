import { User, Article, ArticleState } from '@prisma/client';
import moment from 'moment';
import { useRouter } from 'next/router';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { prisma } from '../../../lib/prismadb';
import PortfolioLinks, { PortfolioLinkLocations } from '../../../components/portfoliolinks';

const Article = ({ article, user, hasProjects }) => {
    const router = useRouter();
    const { title, content, imageUrl, createdAt } = article ?? {};
    const { name: userName, image: userProfileImage, slug, linkedInUrl, gitHubUrl } = user;

    return (
        <div className="mb-8 text-center">
            <PortfolioLinks
                userName={userName}
                location={PortfolioLinkLocations.Header}
                userProfileImage={userProfileImage}
                userSlug={slug}
                hasProjects={hasProjects}
                hasArticles={true}
                gitHubUrl={gitHubUrl}
                linkedInUrl={linkedInUrl}
            />
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
