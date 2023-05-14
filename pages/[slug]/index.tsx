const Portfolio = ({ user }) => {
    return (
        <div className="text-center">
            <img className="mx-auto my-5 rounded-full border-gray-400 w-96 w-96 border-8" src={user.image}></img>
            <p className="text-3xl font-bold md:text-4xl">{user.name}</p>
            <p className="text-gray-500 text-lg">{user.description}</p>
            <div className="flex justify-center">
                <a href={user.gitHubUrl}>
                    <img className="w-8 h-8 m-4" src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img>
                </a>
                <a href={user.linkedInUrl}>
                    <img className="w-8 h-8 m-4" src="https://cdn-icons-png.flaticon.com/512/145/145807.png"></img>
                </a>
            </div>
            <p className="text-xl my-2 font-bold md:text-2xl">
                <a href={`${user.slug}/blog`}>View my Blog</a>
            </p>
            <p className="text-xl my-2 font-bold md:text-2xl">
                <a href={`${user.slug}/projects`}>View my Projects</a>
            </p>
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
