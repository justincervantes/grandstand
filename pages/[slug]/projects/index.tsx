import moment from 'moment';
import { useRouter } from 'next/router';
import { prisma } from '../../../lib/prismadb';
import PortfolioLinks, { PortfolioLinkLocations } from '../../../components/portfoliolinks';

const Projects = ({ projects, user, hasArticles }) => {
    const { slug: userSlug, name: userName, image: userProfileImage, linkedInUrl, gitHubUrl } = user;
    const router = useRouter();

    return (
        <div className="text-center">
            <PortfolioLinks
                userName={userName}
                location={PortfolioLinkLocations.Header}
                userProfileImage={userProfileImage}
                userSlug={userSlug}
                hasProjects={true}
                hasArticles={hasArticles}
                gitHubUrl={gitHubUrl}
                linkedInUrl={linkedInUrl}
            />
            {projects.map((project, index) => {
                const { title, imageUrl, slug, createdAt, description } = project;
                return (
                    <div
                        className="flex w-11/12 p-2 mx-auto my-4 border border-b shadow-sm cursor-pointer bg-gray-50 lg:max-w-3xl sm:p-3 lg:p-4 hover:shadow-2xl"
                        key={index}
                        onClick={() => router.push(`/${userSlug}/projects/${slug}`)}
                    >
                        <div key={`${index}image`} className="m-auto mx-3 basis-1/4">
                            <img
                                className="m-auto h-26 lg:h-44 rounded-xl"
                                src={imageUrl}
                                alt={'project picture'}
                            ></img>
                        </div>
                        <div key={`${index}title`} className="px-2 text-left basis-3/4">
                            <span className="my-2 text-xl font-bold md:text-2xl">{title}</span>
                            <br />
                            <p>{moment.utc(createdAt).format('L')}</p>
                            <p>{description}</p>
                        </div>
                        <div key={index}></div>
                    </div>
                );
            })}
        </div>
    );
};

export default Projects;

export async function getServerSideProps(context) {
    const slug = context?.query?.slug;
    const user = await prisma.user.findFirstOrThrow({
        where: { slug },
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
    const { articles, projects } = user;
    const hasArticles = articles.length > 0;

    return {
        props: { projects: JSON.parse(JSON.stringify(projects)), hasArticles, user: JSON.parse(JSON.stringify(user)) },
    };
}
