import { useRouter } from 'next/router';
import SyntaxHighlighter from 'react-syntax-highlighter';

const Projects = ({ user }) => {
    const { projects } = user;
    const router = useRouter();

    return (
        <div className="text-center">
            <p className="text-xl my-2 font-bold md:text-2xl">{`${user.name}'s Projects`}</p>
            <p className="text-gray-500 text-lg cursor-pointer" onClick={() => router.back()}>
                Return to Profile
            </p>
            {projects.map((project, index) => {
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
                } = project;
                return (
                    <div className="border bg-gray-50 shadow-lg rounded-3xl max-w-3xl mx-auto p-2 my-4" key={index}>
                        <p className="text-xl my-2 font-bold md:text-2xl">{title}</p>
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
                                <span className="font-bold">The most interesting part of the project:</span>{' '}
                                {mostInteresting}
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
                );
            })}
        </div>
    );
};

export default Projects;

export async function getServerSideProps(context) {
    const slug = context?.query?.slug;
    const user = await prisma.user.findFirstOrThrow({
        where: {
            slug,
        },
        include: {
            projects: {
                where: {
                    deletedAt: null,
                },
            },
        },
    });
    return {
        props: { user: JSON.parse(JSON.stringify(user)) },
    };
}
