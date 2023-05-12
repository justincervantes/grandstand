const Blog = ({ user }) => {
    const { articles } = user;
    return (
        <div>
            {articles.map((article, index) => {
                return (
                    <div key={index}>
                        <div key={index}>{article.title}</div>
                        <div key={index}>{article.content}</div>
                        <div key={index}>{article.createdAt}</div>
                    </div>
                );
            })}
        </div>
    );
};
export default Blog;

export async function getServerSideProps(context) {
    const slug = context?.query?.slug;
    const user = await prisma.user.findFirstOrThrow({
        where: {
            slug,
        },
        include: {
            articles: {
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
