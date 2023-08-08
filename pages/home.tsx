import { getSession } from 'next-auth/react';
import EditingLayout from '../components/layout';
import { prisma } from '../lib/prismadb';
import laptopguytext from '../public/laptopguytext.jpg';
import Image from 'next/image';

const Home = ({ userSlug }) => {
    return (
        <EditingLayout userSlug={userSlug}>
            <div className="grid grid-flow-col py-1 min-h-[80vh]">
                <div className="flex flex-col items-center justify-center bg-white rounded-lg">
                    <Image
                        className="w-auto max-h-[75vh]"
                        src={laptopguytext}
                        alt="Easily host your portfolio online"
                    />
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
        props: { userSlug: user?.slug ?? null },
    };
}
