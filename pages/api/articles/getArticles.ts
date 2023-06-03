import { NextApiRequest, NextApiResponse } from 'next';
import establishService from '../../../lib/establishService';
import ArticleService from '../../../services/blog.service';
import { sessionToken } from '../../../lib/sessionToken';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const articleService = await establishService(ArticleService, req.cookies[sessionToken]);
        const article = await articleService.getArticles();
        res.json({ article });
    } catch ({ message }) {
        res.status(400).json({ errorMessage: message });
    }
};
export default handler;
