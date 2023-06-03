import moment from 'moment';
import { useRouter } from 'next/router';

const Projects = ({ projects, user, hasArticles }) => {
    const { slug: userSlug, name: userName, image: userProfileImage, linkedInUrl, gitHubUrl } = user;
    const router = useRouter();

    return (
        <div className="text-center">
            <p className="my-5 text-xl font-bold md:text-2xl lg:text-6xl">{userName}</p>
            <div className="flex justify-center pb-5 border-b">
                <img
                    src={userProfileImage}
                    className="w-8 h-8 mx-2 border border-black rounded-full md:w-14 md:h-14 lg:h-12 lg:w-12 hover:cursor-pointer"
                    alt="Home"
                    title="Home"
                    onClick={() => router.push(`/${userSlug}`)}
                />
                {hasArticles && (
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1187/1187544.png"
                        className="w-8 h-8 mx-2 md:w-12 md:h-12 lg:h-12 lg:w-12 hover:cursor-pointer"
                        alt="Blog"
                        title="Blog"
                        onClick={() => router.push(`/${userSlug}/blog`)}
                    />
                )}
                {gitHubUrl && (
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                        className="w-8 h-8 mx-2 rounded-full md:w-12 md:h-12 lg:h-12 lg:w-12"
                        alt="GitHub"
                        title="GitHub"
                        onClick={() => router.push(gitHubUrl)}
                    />
                )}
                {linkedInUrl && (
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
                        className="w-8 h-8 mx-2 rounded-full md:w-12 md:h-12 lg:h-12 lg:w-12"
                        alt="LinkedIn"
                        title="LinkedIn"
                        onClick={() => router.push(linkedInUrl)}
                    />
                )}
            </div>
            {projects.map((project, index) => {
                const { title, imageUrl, slug, createdAt, description, whyBuilt } = project;
                return (
                    <div
                        className="flex w-11/12 p-2 mx-auto my-4 border border-b shadow-sm bg-gray-50 lg:max-w-3xl sm:p-3 lg:p-4 hover:shadow-2xl"
                        key={index}
                        onClick={() => router.push(`/${userSlug}/projects/${slug}`)}
                    >
                        <div key={`${index}image`} className="m-auto mx-3 basis-1/4">
                            <img className="m-auto h-26 lg:h-44 rounded-xl" src={imageUrl}></img>
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
