import { NextApiRequest, NextApiResponse } from 'next';
import establishService from '../../../lib/establishService';
import ArticleService from '../../../services/blog.service';
import prisma from '../../../lib/prismadb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const submission = { ...req.body.values };

        console.log(submission);
        await prisma.userDetails.create({ data: req.body.values });
        res.json({ status: '200' });
    } catch ({ message }) {
        res.status(400).json({ errorMessage: message });
    }
};

export default handler;
