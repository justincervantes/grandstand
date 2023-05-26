import { User, Article } from '@prisma/client';
import { ArticleState } from '@prisma/client';
import moment from 'moment';
import { useRouter } from 'next/router';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
const Article = ({ article, user }: { article: Article; user: User }) => {
    const router = useRouter();
    const { title, content, imageUrl, createdAt } = article ?? {};
    return (
        <div className="text-center">
            <div className="m-auto">
                <p className="text-xl my-2 font-bold md:text-2xl">{`${user.name}'s Blog`}</p>
                <p className="text-gray-500 text-lg cursor-pointer" onClick={() => router.back()}>
                    Return to Profile
                </p>
                <p className="text-3xl font-bold md:text-4xl">{title}</p>
                <p className="text-gray-500 text-lg">Published on {moment.utc(createdAt).format('L')}</p>
                {/* <img className="mx-auto mb-5 rounded-full w-64 w-64" src={imageUrl}></img> */}
                <div className="flex justify-center">
                    <div
                        className="prose prose-gray p-1 max-h-full min-h-full overflow-y-auto max-w-none"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(content)) }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Article;

export async function getServerSideProps(context) {
    const slug = context?.query?.slug;
    const blogSlug = context?.query?.blogSlug;

    const user: User = await prisma.user.findFirst({
        where: {
            slug,
        },
    });

    const article: Article = await prisma.article.findFirst({
        where: {
            userId: user.id,
            title: blogSlug,
            deletedAt: null,
            state: ArticleState.Published,
        },
    });

    if (!user || !article) {
        return {
            redirect: { destination: '/404' },
        };
    }
    return {
        props: {
            article: JSON.parse(JSON.stringify(article)),
            user: JSON.parse(JSON.stringify(user)),
        },
    };
}
