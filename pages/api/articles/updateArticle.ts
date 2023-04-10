import { NextApiRequest, NextApiResponse } from 'next';
import establishService from '../../../lib/establishService';
import ArticleService from '../../../services/article.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const articleService = await establishService(ArticleService, req.cookies['next-auth.session-token']);
        const article = await articleService.updateArticle(req.body);
        res.json({ article });
    } catch ({ message }) {
        res.status(400).json({ errorMessage: message });
    }
};

export default handler;
