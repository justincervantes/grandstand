import { getSession } from 'next-auth/react';
import EditingLayout from '../components/layout';
import { prisma } from '../lib/prismadb';

const Home = ({ userSlug }) => {
    return (
        <EditingLayout userSlug={userSlug}>
            <div className="grid grid-flow-col p-1 min-h-[80vh]">
                <div className="flex flex-col items-center justify-center bg-white rounded-lg">
                    <span className="mb-3 text-4xl font-bold">grandstand.dev</span>
                    <p className="text-center">A quick tool to get a developer's profile hosted.</p>
                    <p className="text-sm text-center">
                        To get started, fill in the About Me section and view your page using Preview.
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
