import moment from 'moment';
import { useRouter } from 'next/router';
import SyntaxHighlighter from 'react-syntax-highlighter';

const Projects = ({ projects, user, hasArticles }) => {
    const { slug: userSlug, name: userName, image: userProfileImage, linkedInUrl, gitHubUrl } = user;
    const router = useRouter();

    return (
        <div className="text-center">
            <p className="text-xl my-5 font-bold md:text-2xl lg:text-6xl">{userName}</p>
            <div className="flex justify-center border-b pb-5">
                <img
                    src={userProfileImage}
                    className="h-8 w-8 md:w-14 md:h-14 lg:h-12 lg:w-12 border border-black rounded-full mx-2"
                    alt="Home"
                    title="Home"
                    onClick={() => router.push(`/${userSlug}`)}
                />
                {hasArticles && (
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1187/1187544.png"
                        className="h-8 w-8 md:w-12 md:h-12 lg:h-12 lg:w-12  mx-2"
                        alt="Blog"
                        title="Blog"
                        onClick={() => router.push(`/${userSlug}/blog`)}
                    />
                )}
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
                    onClick={() => router.push(gitHubUrl)}
                />
            </div>
            {projects.map((project, index) => {
                const { title, imageUrl, slug, createdAt, description, whyBuilt } = project;
                return (
                    <div
                        className="flex border border-b bg-gray-50 shadow-sm max-w-xs sm:max-w-lg lg:max-w-3xl mx-auto p-2 sm:p-3 lg:p-4 my-4 hover:shadow-2xl"
                        key={index}
                        onClick={() => router.push(`/${userSlug}/blog/${slug}`)}
                    >
                        <div key={`${index}image`} className="m-auto mx-3 basis-1/4">
                            <img className="m-auto rounded-xl h-24 w-24" src={imageUrl}></img>
                        </div>
                        <div key={`${index}title`} className="text-left basis-3/4 px-2">
                            <span className="text-xl my-2 font-bold md:text-2xl">{title}</span>
                            <br />
                            <p>{moment.utc(createdAt).format('L')}</p>
                            <p>{description}</p>
                            <p>I built this project because... {whyBuilt}</p>
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
