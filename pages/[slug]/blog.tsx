import { useRouter } from 'next/router';
import moment from 'moment';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { ArticleState } from '@prisma/client';
const Blog = ({ user }) => {
    const { articles } = user;
    const { image: userProfileImage } = user;
    const router = useRouter();
    return (
        <div className="text-center">
            <p className="text-xl my-2 font-bold md:text-2xl">{`${user.name}`}</p>
            <div className="flex">
                <img
                    src={userProfileImage}
                    className="h-16 w-16 border border-black rounded-full"
                    alt="Home"
                    title="Home"
                />
                <img
                    src="https://cdn-icons-png.flaticon.com/256/5129/5129558.png"
                    className="h-16 w-16"
                    alt="Projects"
                    title="Projects"
                />
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1187/1187544.png"
                    className="h-16 w-16"
                    alt="Blog"
                    title="Blog"
                />
                <img
                    src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
                    className="h-16 w-16"
                    alt="LinkedIn"
                    title="LinkedIn"
                />
                <img
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    className="h-16 w-16"
                    alt="GitHub"
                    title="GitHub"
                />
            </div>
            <p className="text-gray-500 text-lg cursor-pointer" onClick={() => router.back()}>
                Return to Profile
            </p>
            {articles.map((article, index) => {
                const { title, imageUrl, createdAt, slug } = article;
                return (
                    <div
                        className="grid grid-cols-2 border bg-gray-50 shadow-lg rounded-3xl max-w-xs sm:max-w-lg lg:max-w-3xl mx-auto p-2 sm:p-3 lg:p-4 my-4"
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
                            {moment.utc(createdAt).format('L')}
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
        where: {
            slug,
        },
        include: {
            articles: {
                where: {
                    deletedAt: null,
                    state: ArticleState.Published,
                },
            },
        },
    });
    return {
        props: { user: JSON.parse(JSON.stringify(user)) },
    };
}
