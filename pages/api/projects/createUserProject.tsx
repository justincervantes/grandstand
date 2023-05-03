import { NextApiRequest, NextApiResponse } from 'next';
import establishService from '../../../lib/establishService';
import ProjectService from '../../../services/project.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const articleService = await establishService(ProjectService, req.cookies['next-auth.session-token']);
        const article = await articleService.createUserProject(req.body);
        res.json({ article });
    } catch ({ message }) {
        res.status(400).json({ errorMessage: message });
    }
};
export default handler;
