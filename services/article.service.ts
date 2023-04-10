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
        organizationId,
    }: {
        articleTitle: string;
        organizationId: string;
    }): Promise<Article> => {
        // Validate - Throw if the user does not belong to the organization
        if (!articleTitle || !organizationId) throw new Error(ErrorDictionary.INVALID_REQUEST);
        await prisma.user.findFirstOrThrow({
            where: { id: this.sessionUserId, organizations: { some: { id: organizationId } } },
        });

        // Action
        const article = await prisma.article.create({
            data: {
                title: articleTitle,
                content: '',
                createdAt: moment.utc().format(),
                createdBy: { connect: { id: this.sessionUserId } },
                organization: { connect: { id: organizationId } },
                history: {
                    create: [{ action: ModifyArticleAction.create, user: { connect: { id: this.sessionUserId } } }],
                },
            },
        });
        return article;
    };

    getArticles = async ({ organizationId }: { organizationId: string }): Promise<Article[]> => {
        // Validate - Throw if the user does not belong to the organization
        if (!organizationId) throw new Error(ErrorDictionary.INVALID_REQUEST);
        await prisma.user.findFirstOrThrow({
            where: { id: this.sessionUserId, organizations: { some: { id: organizationId } } },
        });

        // Action
        const articles = await prisma.article.findMany({
            where: {
                deletedBy: null,
                organizationId: organizationId,
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
        // Validate - Throw if the user does not belong to the organization
        if (!articleTitle || !articleId) throw new Error(ErrorDictionary.INVALID_REQUEST);
        const { organizationId } = await prisma.article.findFirstOrThrow({
            where: { id: articleId },
            select: { organizationId: true },
        });
        await prisma.user.findFirstOrThrow({
            where: { id: this.sessionUserId, organizations: { some: { id: organizationId } } },
        });

        // Action
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

    deleteArticle = async ({
        articleId,
        organizationId,
    }: {
        articleId: string;
        organizationId: string;
    }): Promise<Article> => {
        // Validate - Throw if the user does not belong to the organization
        if (!articleId) throw new Error(ErrorDictionary.INVALID_REQUEST);
        await prisma.user.findFirstOrThrow({
            where: { id: this.sessionUserId, organizations: { some: { id: organizationId } } },
        });

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
