import { NextApiRequest, NextApiResponse } from 'next';
import establishService from '../../../lib/establishService';
import ProjectService from '../../../services/project.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const projectService = await establishService(ProjectService, req.cookies['next-auth.session-token']);
        const project = await projectService.getProject(req.body);
        res.json({ project });
    } catch ({ message }) {
        res.status(400).json({ errorMessage: message });
    }
};
export default handler;
