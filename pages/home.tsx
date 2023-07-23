import { getSession } from 'next-auth/react';
import EditingLayout from '../components/layout';
import { prisma } from '../lib/prismadb';
import laptopguy from '../public/laptopguy.jpg';
import Image from 'next/image';

const Home = ({ userSlug }) => {
    return (
        <EditingLayout userSlug={userSlug}>
            <div className="grid grid-flow-col py-1 min-h-[80vh]">
                <div className="flex flex-col items-center justify-center bg-white rounded-lg">
                    <Image className="w-auto max-h-[75vh]" src={laptopguy} alt="Easily host your portfolio online" />
                    <span className="mb-3 text-2xl md:text-4xl font-bold py-2 sm:text-white sm:absolute sm:-translate-y-64">
                        grandstand.dev
                    </span>
                    <p className="w-5/6 text-left md:text-md sm:w-9/12 md:2/3 lg:w-1/3 sm:text-white sm:absolute sm:translate-y-44 md:translate-y-52 text-xs sm:text-base">
                        A tool to get a free developer profile hosted with{' '}
                        <span className="font-bold">no coding required.</span> Just sign in with your GitHub
                        credentials, add some basic details, then check out and{' '}
                        <span className="font-bold">share your Profile's URL</span> by clicking on Preview. Adding{' '}
                        <span className="font-bold">Projects</span> or
                        <span className="font-bold"> Blog Posts</span> will help you stand out to guests on your site.
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
