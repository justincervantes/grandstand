import { NextApiRequest, NextApiResponse } from 'next';
import establishService from '../../../lib/establishService';
import ProjectService from '../../../services/project.service';
import { sessionToken } from '../../../lib/sessionToken';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const projectService = await establishService(ProjectService, req.cookies[sessionToken]);
        const project = await projectService.deleteProject(req.body);
        res.json({ project });
    } catch ({ message }) {
        res.status(400).json({ errorMessage: message });
    }
};
export default handler;
