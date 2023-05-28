import { Project, User } from '@prisma/client';
import { ArticleState } from '@prisma/client';
import { useRouter } from 'next/router';
import SyntaxHighlighter from 'react-syntax-highlighter';

const Project = ({ project, user }: { project: Project; user: User }) => {
    const router = useRouter();
    const {
        title,
        description,
        dateRange,
        imageUrl,
        applicationUrl,
        gitHubUrl,
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
            <div className="m-auto max-w-4xl h-full bg-gray-100 bg-fixed">
                <p className="text-xl my-2 font-bold md:text-2xl">{`${user.name}'s Blog`}</p>

                <p className="text-3xl font-bold md:text-4xl">{title}</p>
                {description && <p className="text-gray-500 text-lg">{description}</p>}
                {dateRange && (
                    <p className="text-gray-500 text-lg">
                        <span className="font-bold">Date(s): </span>
                        {dateRange}
                    </p>
                )}
                {imageUrl && (
                    <img
                        className="mx-auto my-2 rounded border-gray-400 w-48 h-48 md:w-72 md:h-72 border-4"
                        src={imageUrl}
                    ></img>
                )}
                <p className="flex justify-center items-center text-gray-500 text-lg">
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
                    <p className="text-gray-500 text-lg">
                        <span className="font-bold">I'm most proud of:</span> {mostProudOf}
                    </p>
                )}
                {mostInteresting && (
                    <p className="text-gray-500 text-lg">
                        <span className="font-bold">The most interesting part of the project:</span> {mostInteresting}
                    </p>
                )}
                {mostUnique && (
                    <p className="text-gray-500 text-lg">
                        <span className="font-bold">The most unique part of the project:</span> {mostUnique}
                    </p>
                )}
                {whyBuilt && (
                    <p className="text-gray-500 text-lg">
                        <span className="font-bold">The project was built because:</span> {whyBuilt}
                    </p>
                )}
                {codeSnippet && (
                    <div>
                        <p className="text-gray-500 text-lg">
                            <span className="font-bold">Project code snippet:</span>
                        </p>
                        <SyntaxHighlighter language={codeSnippetLanguage}>{codeSnippet}</SyntaxHighlighter>
                    </div>
                )}
                {techStack && (
                    <p className="text-gray-500 text-lg">
                        <span className="font-bold">Project tech stack:</span> {techStack}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Project;

export async function getServerSideProps(context) {
    const slug = context?.query?.slug;
    const projectSlug = context?.query?.projectSlug.toString();

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
            hasProjects: true,
            hasArticles,
        },
    };
}
