import { NextApiRequest, NextApiResponse } from 'next';
import establishService from '../../../lib/establishService';
import UserService from '../../../services/user.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const projectService = await establishService(UserService, req.cookies['__Secure-next-auth.session-token']);
        const project = await projectService.updateUser(req.body.values);
        res.json({ status: '200', project });
    } catch ({ message }) {
        res.status(400).json({ errorMessage: message });
    }
};

export default handler;
