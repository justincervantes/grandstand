import { getSession } from 'next-auth/react';
import EditingLayout from '../components/layout';

const Preview = ({ slug }) => {
    return (
        <EditingLayout>
            <div className="grid grid-flow-col p-1 min-h-[80vh]">
                <div className="flex flex-col items-center rounded-lg justify-center bg-white">
                    {slug ? (
                        <iframe src={slug} className="w-full h-full aspect-auto" />
                    ) : (
                        <div>
                            <span className="text-4xl mb-3">Profile Incomplete</span>
                            <p>To preview your website, you must complete the About Me section.</p>
                        </div>
                    )}
                </div>
            </div>
        </EditingLayout>
    );
};

export default Preview;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/home',
            },
        };
    }
    const user = await prisma.user.findFirstOrThrow({
        where: {
            email: session.user.email,
        },
    });
    return {
        props: { slug: user.slug },
    };
}
