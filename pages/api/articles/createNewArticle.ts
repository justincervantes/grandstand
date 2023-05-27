import { NextApiRequest, NextApiResponse } from 'next';
import establishService from '../../../lib/establishService';
import BlogService from '../../../services/blog.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const blogService = await establishService(BlogService, req.cookies['next-auth.session-token']);
        const blog = await blogService.createNewArticle(req.body.values,req.body.content);
        res.json({ blog });
    } catch ({ message }) {
        res.status(400).json({ errorMessage: message });
    }
};

export default handler;
