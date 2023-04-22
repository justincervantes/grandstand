import { NextApiRequest, NextApiResponse } from 'next';
import establishService from '../../../lib/establishService';
import DashboardService from '../../../services/dashboard.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const dashboardService = await establishService(DashboardService, req.cookies['next-auth.session-token']);
        const articles = await dashboardService.getRecentPosts();
        res.json({ articles });
    } catch ({ message }) {
        res.status(400).json({ errorMessage: message });
    }
};
export default handler;
