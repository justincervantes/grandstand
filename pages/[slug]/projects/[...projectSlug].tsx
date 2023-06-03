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
        whyBuilt,
        mostProudOf,
        mostInteresting,
        mostUnique,
        techStack,
        codeSnippet,
        codeSnippetLanguage,
    } = project ?? {};
    return (
        <div className="mb-8">
            <p className="my-5 text-xl font-bold text-center md:text-2xl lg:text-6xl">{userName}</p>
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

            {/* Content */}
            <div className="content-center m-auto mt-5 md:w-2/3 lg:w-1/2">
                <span className="block text-3xl font-bold text-center md:text-4xl">{title}</span>
                <p className="text-lg text-center text-gray-500">{description}</p>
                <img className="px-5 mx-auto my-2 border-gray-400 rounded max-h-48 md:max-h-72" src={imageUrl}></img>

                <div className="flex flex-col mt-5 mb-2 flex-nowrap">
                    {projectGitHubUrl && (
                        <div>
                            <div className="flex mb-2">
                                <div className="flex px-2 py-1 mr-2 bg-white border-r border-black flex-nowrap min-w-[6em] border-3">
                                    <img
                                        className="inline mt-[2px] float-left w-5 h-5 mr-1"
                                        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                                    />
                                    <span className="font-bold text-black ">GitHub</span>
                                </div>
                                <span className="mt-1 text-ellipsis overflow-hidden ...">{projectGitHubUrl}</span>
                            </div>
                        </div>
                    )}

                    {applicationUrl && (
                        <div className="flex mb-2">
                            <div className="flex px-2 py-1 mr-2 bg-white border-r border-black flex-nowrap min-w-[6em] border-3">
                                <img
                                    className="inline mt-[2px] float-left w-5 h-5 mr-1"
                                    src="https://cdn-icons-png.flaticon.com/512/1085/1085779.png"
                                />
                                <span className="font-bold text-black">Demo</span>
                            </div>
                            <span className="mt-1 text-ellipsis overflow-hidden ...">{applicationUrl}</span>
                        </div>
                    )}

                    {dateRange && (
                        <div className="flex mb-2">
                            <div className="flex px-2 py-1 mr-2 bg-white border-r border-black flex-nowrap min-w-[6em] border-3">
                                <img
                                    className="inline mt-[2px] float-left w-5 h-5 mr-1"
                                    src="https://cdn-icons-png.flaticon.com/512/3652/3652191.png"
                                />
                                <span className="font-bold text-black">Dates</span>
                            </div>
                            <span className="mt-1 text-ellipsis overflow-hidden ...">{dateRange}</span>
                        </div>
                    )}

                    {techStack && (
                        <div className="flex mb-2">
                            <div className="flex px-2 py-1 mr-2 bg-white border-r border-black flex-nowrap min-w-[6em] border-3">
                                <img
                                    className="inline mt-[2px] float-left w-5 h-5 mr-1"
                                    src="https://cdn-icons-png.flaticon.com/512/6214/6214248.png"
                                />
                                <span className="font-bold text-black">Stack</span>
                            </div>
                            <span className="mt-1 text-ellipsis overflow-hidden ...">{techStack}</span>
                        </div>
                    )}

                    {whyBuilt && (
                        <div className="flex flex-col mt-3">
                            <div className="flex px-2 py-1 mr-2 bg-white mb-2 border-black flex-nowrap min-w-[6em] border-3">
                                <img
                                    className="inline mt-[2px] float-left w-5 h-5 mr-1"
                                    src="https://cdn-icons-png.flaticon.com/512/1930/1930048.png"
                                />
                                <span className="font-bold text-black">Motivation</span>
                            </div>
                            <span className="w-11/12 p-0 m-auto md:w-full">{whyBuilt}</span>
                        </div>
                    )}

                    {mostProudOf && (
                        <div className="flex flex-col mt-3">
                            <div className="flex px-2 py-1 mr-2 bg-white mb-2 border-black flex-nowrap min-w-[6em] border-3">
                                <img
                                    className="inline mt-[2px] float-left w-5 h-5 mr-1"
                                    src="https://cdn-icons-png.flaticon.com/512/6746/6746354.png"
                                />
                                <span className="font-bold text-black">What I'm Most Proud Of</span>
                            </div>
                            <span className="w-11/12 p-0 m-auto md:w-full">{mostProudOf}</span>
                        </div>
                    )}

                    {mostInteresting && (
                        <div className="flex flex-col mt-3">
                            <div className="flex px-2 py-1 mr-2 bg-white mb-2 border-black flex-nowrap min-w-[6em] border-3">
                                <img
                                    className="inline mt-[2px] float-left w-5 h-5 mr-1"
                                    src="https://cdn-icons-png.flaticon.com/512/2339/2339820.png"
                                />
                                <span className="font-bold text-black">Most Interesting Aspect of This Project</span>
                            </div>
                            <span className="w-11/12 p-0 m-auto md:w-full">{mostInteresting}</span>
                        </div>
                    )}

                    {mostUnique && (
                        <div className="flex flex-col mt-3">
                            <div className="flex px-2 py-1 mr-2 bg-white mb-2 border-black flex-nowrap min-w-[6em] border-3">
                                <img
                                    className="inline mt-[2px] float-left w-5 h-5 mr-1"
                                    src="https://cdn-icons-png.flaticon.com/512/5171/5171334.png"
                                />
                                <span className="font-bold text-black">What Makes This Unique</span>
                            </div>
                            <span className="w-11/12 p-0 m-auto md:w-full">{mostUnique}</span>
                        </div>
                    )}

                    {codeSnippet && codeSnippetLanguage && (
                        <div className="flex flex-col mt-3">
                            <div className="flex px-2 py-1 mr-2 bg-white mb-2 border-black flex-nowrap min-w-[6em] border-3">
                                <img
                                    className="inline mt-[2px] float-left w-5 h-5 mr-1"
                                    src="https://cdn-icons-png.flaticon.com/512/59/59118.png"
                                />
                                <span className="font-bold text-black">Favourite Code Snippet</span>
                            </div>
                            <SyntaxHighlighter className="w-11/12 p-0 m-auto md:w-full" language={codeSnippetLanguage}>
                                {codeSnippet}
                            </SyntaxHighlighter>
                        </div>
                    )}
                </div>
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
