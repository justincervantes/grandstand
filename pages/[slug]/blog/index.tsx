import { useRouter } from 'next/router';
import moment from 'moment';
import { prisma } from '../../../lib/prismadb';
import PortfolioLinks, { PortfolioLinkLocations } from '../../../components/portfoliolinks';

const Blog = ({ articles, user, hasProjects }) => {
    const { image: userProfileImage, name: userName, slug: userSlug, linkedInUrl, gitHubUrl } = user ?? {};
    const router = useRouter();
    return (
        <div className="text-center">
            <PortfolioLinks
                userName={userName}
                location={PortfolioLinkLocations.Header}
                userProfileImage={userProfileImage}
                userSlug={userSlug}
                hasProjects={hasProjects}
                hasArticles={true}
                gitHubUrl={gitHubUrl}
                linkedInUrl={linkedInUrl}
            />
            <div></div>
            {articles.map((article, index) => {
                const { title, imageUrl, createdAt, slug } = article;
                return (
                    <div
                        className="grid w-11/12 grid-cols-3 p-2 mx-auto my-4 border border-b shadow-sm cursor-pointer bg-gray-50 sm:max-w-lg lg:max-w-3xl sm:p-3 lg:p-4 hover:shadow-2xl"
                        key={index}
                        onClick={() => router.push(`/${userSlug}/blog/${slug}`)}
                    >
                        <div key={`${index}image`} className="col-span-1 m-auto">
                            <img className="h-24 m-auto rounded-xl sm:h-36 lg:h-44" src={imageUrl}></img>
                        </div>
                        <div key={`${index}title`} className="w-11/12 col-span-2 m-auto">
                            <a className="my-2 text-xl font-bold md:text-2xl" href={`blog/${slug}`}>
                                {title}
                            </a>
                            <br />
                            <p>{moment.utc(createdAt).format('L')}</p>
                        </div>
                        <div key={index}></div>
                    </div>
                );
            })}
        </div>
    );
};
export default Blog;

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

    const { projects, articles } = user;

    const hasProjects = projects.length > 0;

    return {
        props: {
            articles: JSON.parse(JSON.stringify(articles)),
            hasProjects,
            user: JSON.parse(JSON.stringify(user)),
        },
    };
}
