import { NextApiRequest, NextApiResponse } from 'next';
import establishService from '../../../lib/establishService';
import BlogService from '../../../services/blog.service';
import { sessionToken } from '../../../lib/sessionToken';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const blogService = await establishService(BlogService, req.cookies[sessionToken]);
        const blog = await blogService.createNewArticle(req.body);
        res.json({ blog });
    } catch ({ message }) {
        res.status(400).json({ errorMessage: message });
    }
};

export default handler;
