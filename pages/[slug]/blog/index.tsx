import { useRouter } from 'next/router';
import moment from 'moment';
const Blog = ({ articles, user, hasProjects }) => {
    const { image: userProfileImage, name: userName, slug: userSlug, linkedInUrl, gitHubUrl } = user ?? {};
    const router = useRouter();
    return (
        <div className="text-center">
            <p className="my-5 text-xl font-bold md:text-2xl lg:text-6xl">{userName}</p>
            <div className="flex justify-center pb-5 border-b">
                <img
                    src={userProfileImage}
                    className="w-8 h-8 mx-2 border border-black rounded-full md:w-14 md:h-14 lg:h-12 lg:w-12"
                    alt="Home"
                    title="Home"
                    onClick={() => router.push(`/${userSlug}`)}
                />
                {hasProjects && (
                    <img
                        src="https://cdn-icons-png.flaticon.com/256/5129/5129558.png"
                        className="w-8 h-8 mx-2 md:w-12 md:h-12 lg:h-12 lg:w-12"
                        alt="Projects"
                        title="Projects"
                        onClick={() => router.push(`/${userSlug}/projects`)}
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
            <div></div>
            {articles.map((article, index) => {
                const { title, imageUrl, createdAt, slug } = article;
                return (
                    <div
                        className="grid w-11/12 grid-cols-3 p-2 mx-auto my-4 border border-b shadow-sm bg-gray-50 sm:max-w-lg lg:max-w-3xl sm:p-3 lg:p-4 hover:shadow-2xl cursor-pointer"
                        key={index}
                        onClick={() => router.push(`/${userSlug}/blog/${slug}`)}
                    >
                        <div key={`${index}image`} className="col-span-1 m-auto">
                            <img className="h-24 m-auto rounded-xl sm:h-36 lg:h-44" src={imageUrl}></img>
                        </div>
                        <div key={`${index}title`} className="w-11/12 col-span-2 m-auto">
                            <a className="my-2 text-xl font-bold md:text-2xl" href={`blog/${slug}`}>
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
