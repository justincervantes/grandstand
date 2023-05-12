const Portfolio = ({ user }) => {
    return (
        <div>
            {user.name}
            {user.description}
        </div>
    );
};

export default Portfolio;

export async function getServerSideProps(context) {
    const slug = context?.query?.slug;
    const user = await prisma.user.findFirstOrThrow({
        where: {
            slug,
        },
    });
    return {
        props: { user: JSON.parse(JSON.stringify(user)) },
    };
}
