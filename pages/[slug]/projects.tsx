import { useRouter } from 'next/router';
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
                return (
                    <div className="border bg-gray-50 shadow-lg rounded max-w-3xl mx-auto py-2 my-4" key={index}>
                        <p className="text-xl my-2 font-bold md:text-2xl">{project.title}</p>
                        <p className="text-gray-500 text-lg">{project.description}</p>
                        <img
                            className="mx-auto my-2 rounded border-gray-400 w-48 h-48 md:w-72 md:h-72 border-4"
                            src={project.imageUrl}
                        ></img>
                        <p className="flex justify-center items-center text-gray-500 text-lg">
                            <a href={project.applicationUrl}>{project.applicationUrl}</a>
                            <a href={project.gitHubUrl}>
                                <img
                                    className="w-8 h-8 mx-3"
                                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                                ></img>
                            </a>
                        </p>
                        <p className="text-gray-500 text-lg">
                            <span className="font-bold">I'm most proud of:</span> {project.mostProudOf}
                        </p>
                        <p className="text-gray-500 text-lg">
                            <span className="font-bold">The most interesting part of the project:</span>{' '}
                            {project.mostInteresting}
                        </p>
                        <p className="text-gray-500 text-lg">
                            <span className="font-bold">The most unique part of the project:</span> {project.mostUnique}
                        </p>
                        <p className="text-gray-500 text-lg">
                            <span className="font-bold">The project was built because:</span> {project.whyBuilt}
                        </p>
                        <p className="text-gray-500 text-lg">
                            <span className="font-bold">Project code snippet:</span> {project.codeSnippet}
                        </p>
                        <p className="text-gray-500 text-lg">
                            <span className="font-bold">Project tech stack:</span> {project.techStack}
                        </p>
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
