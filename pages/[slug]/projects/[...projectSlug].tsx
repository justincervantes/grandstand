import { Project, User } from '@prisma/client';
import { ArticleState } from '@prisma/client';
import { useRouter } from 'next/router';
import SyntaxHighlighter from 'react-syntax-highlighter';

const Project = ({ project, user, hasArticles }) => {
    const router = useRouter();
    const { name: userName, slug, gitHubUrl, linkedInUrl, image: userProfileImage } = user ?? {};
    const {
        title,
        description,
        dateRange,
        imageUrl,
        applicationUrl,
        gitHubUrl: projectGitHubUrl,
        mostProudOf,
        mostInteresting,
        mostUnique,
        whyBuilt,
        techStack,
        codeSnippet,
        codeSnippetLanguage,
    } = project ?? {};
    return (
        <div className="text-center">
            <p className="my-5 text-xl font-bold md:text-2xl lg:text-6xl">{userName}</p>
            <div className="flex justify-center pb-5 border-b">
                <img
                    src={userProfileImage}
                    className="w-8 h-8 mx-2 border border-black rounded-full md:w-14 md:h-14 lg:h-12 lg:w-12 hover:cursor-pointer"
                    alt="Home"
                    title="Home"
                    onClick={() => router.push(`/${slug}`)}
                />
                <img
                    src="https://cdn-icons-png.flaticon.com/256/5129/5129558.png"
                    className="w-8 h-8 mx-2 md:w-12 md:h-12 lg:h-12 lg:w-12 hover:cursor-pointer"
                    alt="Projects"
                    title="Projects"
                    onClick={() => router.push(`/${slug}/projects`)}
                />

                {hasArticles && (
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1187/1187544.png"
                        className="w-8 h-8 mx-2 md:w-12 md:h-12 lg:h-12 lg:w-12 hover:cursor-pointer"
                        alt="Blog"
                        title="Blog"
                        onClick={() => router.push(`/${slug}/blog`)}
                    />
                )}
                <img
                    src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
                    className="w-8 h-8 mx-2 rounded-full md:w-12 md:h-12 lg:h-12 lg:w-12 hover:cursor-pointer"
                    alt="LinkedIn"
                    title="LinkedIn"
                    onClick={() => router.push(linkedInUrl)}
                />
                <img
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    className="w-8 h-8 mx-2 rounded-full md:w-12 md:h-12 lg:h-12 lg:w-12 hover:cursor-pointer"
                    alt="GitHub"
                    title="GitHub"
                    onClick={() => router.push(gitHubUrl)}
                />
            </div>

            {/* Content */}
            <div className="content-center m-auto mt-5 md:w-1/2">
                <span className="block text-3xl font-bold md:text-4xl">{title}</span>
                <p className="text-lg text-gray-500">{description}</p>
                <img className="px-5 mx-auto my-2 border-gray-400 rounded max-h-48 md:max-h-72" src={imageUrl}></img>

                <div className="px-2 mt-5">
                    <div className="flex mb-2 flex-nowrap">
                        <div className="flex flex-no-wrap px-2 py-1 mr-2 bg-white border-r border-black border-3 min-w-[6em]">
                            <img
                                className="inline mt-[2px] float-left w-5 h-5 mr-1"
                                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                            />
                            <span className="inline font-bold text-black">GitHub</span>
                        </div>
                        <span className="text-ellipsis overflow-hidden ...">{projectGitHubUrl}</span>
                    </div>

                    <div className="flex mb-2">
                        <div className="flex px-2 py-1 mr-2 bg-white border-r border-black flex-nowrap min-w-[6em] border-3">
                            <img
                                className="inline mt-[2px] float-left w-5 h-5 mr-1"
                                src="https://cdn-icons-png.flaticon.com/512/1085/1085779.png"
                            />
                            <span className="font-bold text-black">Demo</span>
                        </div>
                        <span className="text-ellipsis overflow-hidden ...">{projectGitHubUrl}</span>
                    </div>
                </div>
                {/* 
                {dateRange && <p className="text-lg text-gray-500">{dateRange}</p>}
                <p className="flex items-center justify-center text-lg text-gray-500">
                    {applicationUrl && <a href={applicationUrl}>{applicationUrl}</a>}
                    {gitHubUrl && (
                        <a href={gitHubUrl}>
                            <img
                                className="w-8 h-8 mx-3"
                                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                            ></img>
                        </a>
                    )}
                </p>
                {mostProudOf && (
                    <p className="text-lg text-gray-500">
                        <span className="font-bold">I'm most proud of:</span> {mostProudOf}
                    </p>
                )}
                {mostInteresting && (
                    <p className="text-lg text-gray-500">
                        <span className="font-bold">The most interesting part of the project:</span> {mostInteresting}
                    </p>
                )}
                {mostUnique && (
                    <p className="text-lg text-gray-500">
                        <span className="font-bold">The most unique part of the project:</span> {mostUnique}
                    </p>
                )}
                {whyBuilt && (
                    <p className="text-lg text-gray-500">
                        <span className="font-bold">The project was built because:</span> {whyBuilt}
                    </p>
                )}
                {codeSnippet && (
                    <div>
                        <p className="text-lg text-gray-500">
                            <span className="font-bold">Project code snippet:</span>
                        </p>
                        <SyntaxHighlighter language={codeSnippetLanguage}>{codeSnippet}</SyntaxHighlighter>
                    </div>
                )}
                {techStack && (
                    <p className="text-lg text-gray-500">
                        <span className="font-bold">Project tech stack:</span> {techStack}
                    </p>
                )} */}
            </div>
        </div>
    );
};

export default Project;

export async function getServerSideProps(context) {
    const slug = context?.query?.slug;
    const projectSlug = context?.query?.projectSlug.toString();

    const user = await prisma.user.findFirst({
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
            },
        },
    });

    const project: Project = await prisma.project.findFirst({
        where: {
            userId: user.id,
            slug: projectSlug,
            deletedAt: null,
            state: ArticleState.Published,
        },
    });

    if (!user || !project) {
        return {
            redirect: { destination: '/404' },
        };
    }

    await prisma.project.update({
        where: {
            id: project.id,
        },
        data: {
            views: {
                increment: 1,
            },
        },
    });

    const { articles } = user ?? {};
    const hasArticles = articles.length > 0;

    return {
        props: {
            project: JSON.parse(JSON.stringify(project)),
            user: JSON.parse(JSON.stringify(user)),
            hasArticles,
        },
    };
}
