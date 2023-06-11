import { User } from '@prisma/client';
import { ArticleState } from '@prisma/client';
import { prisma } from '../../lib/prismadb';

const Portfolio = ({ user, hasProjects, hasArticles }: { user: User; hasProjects: boolean; hasArticles: boolean }) => {
    const { image, name, description, slug, gitHubUrl, linkedInUrl } = user ?? {};
    return (
        <div className="flex h-screen text-center">
            <div className="m-auto">
                <img className="w-64 h-64 mx-auto mb-5 rounded-full" src={image}></img>
                <p className="text-3xl font-bold md:text-4xl">{name}</p>
                <p className="text-lg text-gray-500">{description}</p>
                <div className="flex justify-center">
                    {hasProjects && (
                        <a href={`${slug}/projects`}>
                            <img
                                className="w-8 h-8 m-4"
                                src="https://cdn-icons-png.flaticon.com/256/5129/5129558.png"
                            ></img>
                        </a>
                    )}
                    {hasArticles && (
                        <a href={`${slug}/blog`}>
                            <img
                                className="w-8 h-8 m-4"
                                src="https://cdn-icons-png.flaticon.com/512/1187/1187544.png"
                            ></img>
                        </a>
                    )}
                    {gitHubUrl && (
                        <a href={gitHubUrl}>
                            <img
                                className="w-8 h-8 m-4"
                                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                            ></img>
                        </a>
                    )}
                    {linkedInUrl && (
                        <a href={linkedInUrl}>
                            <img
                                className="w-8 h-8 m-4"
                                src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
                            ></img>
                        </a>
                    )}
                </div>
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
            hasProjects: projectCount > 0 ? true : false,
            hasArticles: articlesCount > 0 ? true : false,
        },
    };
}
