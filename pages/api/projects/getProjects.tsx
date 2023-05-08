import { NextApiRequest, NextApiResponse } from 'next';
import establishService from '../../../lib/establishService';
import ProjectService from '../../../services/project.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const projectService = await establishService(ProjectService, req.cookies['next-auth.session-token']);
        const projects = await projectService.getProjects(req.body);
        res.json({ projects });
    } catch ({ message }) {
        res.status(400).json({ errorMessage: message });
    }
};
export default handler;
