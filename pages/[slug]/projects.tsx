const Projects = ({ user }) => {
    const { projects } = user;
    return (
        <div>
            {projects.map((project, index) => {
                return <div key={index}>project.title</div>;
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
