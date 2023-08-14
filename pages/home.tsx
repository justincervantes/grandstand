import { getSession } from 'next-auth/react';
import EditingLayout from '../components/layout';
import { prisma } from '../lib/prismadb';
import laptopguytext from '../public/laptopguytext.jpg';
import Image from 'next/image';

const Home = ({ user }) => {
    const { slug: userSlug, articles, projects, views } = user;
    return (
        <EditingLayout
            userSlug={userSlug}
            articleCount={articles?.length ?? 0}
            projectCount={projects?.length ?? 0}
            views={views}
        >
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
        include: {
            articles: { where: { deletedAt: null } },
            projects: { where: { deletedAt: null } },
        },
    });
    return {
        props: { user: JSON.parse(JSON.stringify(user)) },
    };
}
