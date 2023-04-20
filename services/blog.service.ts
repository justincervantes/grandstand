import { Article, ModifyArticleAction } from '@prisma/client';
import moment from 'moment';
import ErrorDictionary from '../lib/errorDictionary';
import BaseService from './base.service';
import prisma from '../lib/prismadb';

export default class ArticleService extends BaseService {
    constructor(sessionToken) {
        super(sessionToken);
    }

    public createArticle = async ({
        articleTitle,
    }: {
        articleTitle: string;
        organizationId: string;
    }): Promise<Article> => {
        // Validate
        if (!articleTitle) throw new Error(ErrorDictionary.INVALID_REQUEST);

        // Action
        const article = await prisma.article.create({
            data: {
                title: articleTitle,
                content: '',
                createdAt: moment.utc().format(),
                createdBy: { connect: { id: this.sessionUserId } },
                history: {
                    create: [{ action: ModifyArticleAction.create, user: { connect: { id: this.sessionUserId } } }],
                },
            },
        });
        return article;
    };

    getArticles = async (): Promise<Article[]> => {
        const articles = await prisma.article.findMany({
            where: {
                deletedBy: null,
                createdByUserId: this.sessionUserId,
            },
        });
        return articles;
    };

    updateArticle = async ({
        articleId,
        articleTitle,
        content,
    }: {
        articleId: string;
        articleTitle: string;
        content: string;
    }): Promise<Article> => {
        const article = await prisma.article.update({
            where: {
                id: articleId,
            },
            data: {
                content: content,
                title: articleTitle,
                updatedAt: moment.utc().format(),
                updatedBy: { connect: { id: this.sessionUserId } },
                history: {
                    create: [{ action: ModifyArticleAction.update, user: { connect: { id: this.sessionUserId } } }],
                },
            },
        });
        return article;
    };

    deleteArticle = async ({ articleId }: { articleId: string }): Promise<Article> => {
        // Validate
        if (!articleId) throw new Error(ErrorDictionary.INVALID_REQUEST);
        // Action
        const article = await prisma.article.update({
            where: { id: articleId },
            data: {
                deletedAt: moment.utc().toDate(),
                deletedBy: { connect: { id: this.sessionUserId } },
                history: {
                    create: [{ action: ModifyArticleAction.delete, user: { connect: { id: this.sessionUserId } } }],
                },
            },
        });
        return article;
    };
}
