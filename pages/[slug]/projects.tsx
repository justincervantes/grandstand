import moment from 'moment';
import { useRouter } from 'next/router';
import SyntaxHighlighter from 'react-syntax-highlighter';

const Projects = ({ projects, user, hasArticles }) => {
    const { slug: userSlug, name: userName, image: userProfileImage, linkedInUrl, githubUrl } = user;
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
                    onClick={() => router.push(githubUrl)}
                />
            </div>
            {projects.map((project, index) => {
                // return (
                //     <div className="border bg-gray-50 shadow-lg rounded-3xl max-w-3xl mx-auto p-2 my-4" key={index}>
                //         <p className="text-xl my-2 font-bold md:text-2xl">{title}</p>
                //         {description && <p className="text-gray-500 text-lg">{description}</p>}
                //         {dateRange && (
                //             <p className="text-gray-500 text-lg">
                //                 <span className="font-bold">Date(s): </span>
                //                 {dateRange}
                //             </p>
                //         )}
                //         {imageUrl && (
                //             <img
                //                 className="mx-auto my-2 rounded border-gray-400 w-48 h-48 md:w-72 md:h-72 border-4"
                //                 src={imageUrl}
                //             ></img>
                //         )}
                //         <p className="flex justify-center items-center text-gray-500 text-lg">
                //             {applicationUrl && <a href={applicationUrl}>{applicationUrl}</a>}
                //             {gitHubUrl && (
                //                 <a href={gitHubUrl}>
                //                     <img
                //                         className="w-8 h-8 mx-3"
                //                         src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                //                     ></img>
                //                 </a>
                //             )}
                //         </p>
                //         {mostProudOf && (
                //             <p className="text-gray-500 text-lg">
                //                 <span className="font-bold">I'm most proud of:</span> {mostProudOf}
                //             </p>
                //         )}
                //         {mostInteresting && (
                //             <p className="text-gray-500 text-lg">
                //                 <span className="font-bold">The most interesting part of the project:</span>{' '}
                //                 {mostInteresting}
                //             </p>
                //         )}
                //         {mostUnique && (
                //             <p className="text-gray-500 text-lg">
                //                 <span className="font-bold">The most unique part of the project:</span> {mostUnique}
                //             </p>
                //         )}
                //         {whyBuilt && (
                //             <p className="text-gray-500 text-lg">
                //                 <span className="font-bold">The project was built because:</span> {whyBuilt}
                //             </p>
                //         )}
                //         {codeSnippet && (
                //             <div>
                //                 <p className="text-gray-500 text-lg">
                //                     <span className="font-bold">Project code snippet:</span>
                //                 </p>
                //                 <SyntaxHighlighter language={codeSnippetLanguage}>{codeSnippet}</SyntaxHighlighter>
                //             </div>
                //         )}
                //         {techStack && (
                //             <p className="text-gray-500 text-lg">
                //                 <span className="font-bold">Project tech stack:</span> {techStack}
                //             </p>
                //         )}
                //     </div>
                // );
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
