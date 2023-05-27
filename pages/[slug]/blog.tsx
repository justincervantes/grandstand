import { useRouter } from 'next/router';
import moment from 'moment';
const Blog = ({ articles, user, hasProjects }) => {
    const { image: userProfileImage, name: userName, slug, linkedInUrl, githubUrl } = user ?? {};
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
                    onClick={() => router.push(`/${slug}`)}
                />

                {hasProjects && (
                    <img
                        src="https://cdn-icons-png.flaticon.com/256/5129/5129558.png"
                        className="h-8 w-8 md:w-12 md:h-12 lg:h-12 lg:w-12  mx-2"
                        alt="Projects"
                        title="Projects"
                        onClick={() => router.push(`/${slug}/projects`)}
                    />
                )}
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1187/1187544.png"
                    className="h-8 w-8 md:w-12 md:h-12 lg:h-12 lg:w-12  mx-2"
                    alt="Blog"
                    title="Blog"
                    onClick={() => router.push(`/${slug}/blog`)}
                />
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
            {articles.map((article, index) => {
                const { title, imageUrl, createdAt, slug } = article;
                return (
                    <div
                        className="grid grid-cols-2 border border-b bg-gray-50 shadow-sm max-w-xs sm:max-w-lg lg:max-w-3xl mx-auto p-2 sm:p-3 lg:p-4 my-4 hover:shadow-2xl"
                        key={index}
                    >
                        <div key={`${index}image`} className="m-auto">
                            <a href={`blog/${slug}`}>
                                <img className="m-auto rounded-xl h-24 sm:h-36 lg:h-44" src={imageUrl}></img>
                            </a>
                        </div>
                        <div key={`${index}title`} className="m-auto">
                            <a className="text-xl my-2 font-bold md:text-2xl" href={`blog/${slug}`}>
                                {title}
                            </a>
                            <br />
                            <p>{moment.utc(createdAt).format('L')}</p>
                        </div>
                        <div key={index}></div>
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

    const { projects, articles } = user;

    const hasProjects = projects.length > 0;

    return {
        props: {
            articles: JSON.parse(JSON.stringify(articles)),
            hasProjects,
            user: JSON.parse(JSON.stringify(user)),
        },
    };
}
