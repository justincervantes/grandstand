import { getSession } from 'next-auth/react';
import RecentOrganizationsActivity from '../components/dashboard/recent-organizations-activity';
import UserArticleActivity from '../components/dashboard/user-article-activity';
import UserLifetimePostsCount from '../components/dashboard/user-lifetime-posts-count';

const Dashboard = () => {
    return (
        <div className="grid grid-flow-col p-1 min-h-[80vh]">
            <div className="col-span-10 border rounded-lg mr-4 flex overflow-y-auto h-[83vh] scrollbar-thin scrollbar-h-1.5 scrollbar-thumb-gray-200 scrollbar-thumb-rounded">
                <UserArticleActivity />
            </div>
            <div className=" col-span-2 grid">
                <div className="border rounded-lg mb-2 flex items-center justify-center h-[32vh]">
                    <UserLifetimePostsCount />
                </div>
                <div className="border rounded-lg mt-2 flex h-[49vh] overflow-y-auto scrollbar-thin scrollbar-h-1.5 scrollbar-thumb-gray-200 scrollbar-thumb-rounded">
                    <div className="m-auto ">
                        <RecentOrganizationsActivity />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/home',
            },
        };
    }
    return {
        props: {},
    };
}
