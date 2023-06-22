import { getSession } from 'next-auth/react';
import EditingLayout from '../components/layout';
import { prisma } from '../lib/prismadb';

const Home = ({ userSlug }) => {
    return (
        <EditingLayout userSlug={userSlug}>
            <div className="grid grid-flow-col p-1 min-h-[80vh]">
                <div className="flex flex-col items-center justify-center bg-white rounded-lg">
                    <span className="mb-3 text-4xl font-bold">grandstand.dev</span>
                    <p className="w-10/12 text-left md:text-md md:w-1/2">
                        A tool to get a free developer profile hosted in{' '}
                        <span className="font-bold">under 1 minute</span>, just sign in with GitHub,
                        fill in your basic details, then check out and share your URL by clicking Preview. Adding{' '}
                        <span className="font-bold">Blogs </span>
                        and <span className="font-bold">Projects</span> will help you stand out to
                        guests on your site.
                    </p>
                </div>
            </div>
        </EditingLayout>
    );
};

export default Home;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const currentUserEmail = session?.user?.email;
    const user = await prisma.user.findFirst({
        where: {
            email: currentUserEmail,
        },
    });
    return {
        props: { userSlug: user?.slug },
    };
}
