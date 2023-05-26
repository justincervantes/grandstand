import { useRouter } from 'next/router';
import moment from 'moment';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { ArticleState } from '@prisma/client';
const Blog = ({ user }) => {
    const { articles } = user;
    const router = useRouter();
    return (
        <div className="text-center">
            <p className="text-xl my-2 font-bold md:text-2xl">{`${user.name}'s Blog`}</p>
            <p className="text-gray-500 text-lg cursor-pointer" onClick={() => router.back()}>
                Return to Profile
            </p>
            {articles.map((article, index) => {
                const { title, content, createdAt } = article;
                return (
                    <div className="border bg-gray-50 shadow-lg rounded-3xl max-w-3xl mx-auto p-2 my-4" key={index}>
                        <div className="text-xl my-2 font-bold md:text-2xl" key={index}>
                            {title}
                        </div>
                        <div key={index}>Uploaded {moment.utc(createdAt).format('L')}</div>
                        <div
                            key={index}
                            className="text-gray-500 text-lg prose prose-gray p-1 max-h-full min-h-full overflow-y-auto max-w-none"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(content)) }}
                        />
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
