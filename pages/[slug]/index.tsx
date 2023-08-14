import { User } from '@prisma/client';
import { ArticleState } from '@prisma/client';
import { prisma } from '../../lib/prismadb';
import PortfolioLinks, { PortfolioLinkLocations } from '../../components/portfoliolinks';

const Portfolio = ({ user, hasProjects, hasArticles }: { user: User; hasProjects: boolean; hasArticles: boolean }) => {
    const { image, name, description, slug, gitHubUrl, linkedInUrl } = user ?? {};
    return (
        <div className="flex h-screen text-center">
            <div className="m-auto">
                <img className="w-64 h-64 mx-auto mb-5 rounded-full" src={image} alt={'profile picture'}></img>
                <p className="text-3xl font-bold md:text-4xl">{name}</p>
                <p className="text-lg text-gray-500">{description}</p>
                <PortfolioLinks
                    location={PortfolioLinkLocations.HomePage}
                    userProfileImage={image}
                    userSlug={slug}
                    hasProjects={hasProjects}
                    hasArticles={hasArticles}
                    gitHubUrl={gitHubUrl}
                    linkedInUrl={linkedInUrl}
                    userName={name}
                />
            </div>
        </div>
    );
};

export default Portfolio;

export async function getServerSideProps(context) {
    const slug = context?.query?.slug;
    const user: User = await prisma.user.findFirst({
        where: {
            slug,
        },
    });
    if (!user) {
        return {
            redirect: { destination: '/404' },
        };
    }
    await prisma.user.update({
        where: {
            slug,
        },
        data: {
            views: {
                increment: 1,
            },
        },
    });
    const [projectCount, articlesCount] = await Promise.all([
        prisma.project.count({
            where: {
                userId: user.id,
                deletedAt: null,
            },
        }),
        prisma.article.count({
            where: {
                userId: user.id,
                deletedAt: null,
                state: ArticleState.Published,
            },
        }),
    ]);
    return {
        props: {
            user: JSON.parse(JSON.stringify(user)),
            hasProjects: projectCount > 0,
            hasArticles: articlesCount > 0,
        },
    };
}
