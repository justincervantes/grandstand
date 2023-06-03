import { Article, ArticleState } from '@prisma/client';
import moment from 'moment';
import ErrorDictionary from '../lib/errorDictionary';
import BaseService from './base.service';
import prisma from '../lib/prismadb';

export default class ArticleService extends BaseService {
    constructor(sessionToken) {
        super(sessionToken);
    }

    public createArticle = async ({ articleTitle }: { articleTitle: string }): Promise<Article> => {
        // Validate
        if (!articleTitle) throw new Error(ErrorDictionary.INVALID_REQUEST);

        // Action
        const article = await prisma.article.create({
            data: {
                title: articleTitle,
                content: '',
                slug: '',
                imageUrl: '',
                createdAt: moment.utc().format(),
                userId: this.sessionUserId,
                state: ArticleState.Draft,
            },
        });
        return article;
    };

    public createNewArticle = async ({
        title,
        slug,
        imageUrl,
        content,
        state,
    }: {
        title: string;
        slug: string;
        imageUrl?: string;
        content?: string;
        state: ArticleState;
    }): Promise<Article> => {
        // Validate
        if (!title || !slug) throw new Error(ErrorDictionary.INVALID_REQUEST);
        // Action
        const article = await prisma.article.create({
            data: {
                userId: this.sessionUserId,
                state: state,
                createdAt: moment.utc().format(),
                title: title,
                content: content ?? '',
                slug: slug,
                imageUrl: imageUrl ?? '',
            },
        });
        return article;
    };

    getArticles = async (): Promise<Article[]> => {
        const articles = await prisma.article.findMany({
            where: {
                deletedAt: null,
                userId: this.sessionUserId,
            },
        });
        return articles;
    };

    updateArticle = async ({
        articleId,
        articleTitle,
        imageUrl,
        content,
        slug,
        state,
    }: {
        articleId: string;
        articleTitle: string;
        imageUrl: string;
        slug: string;
        content: string;
        state: ArticleState;
    }): Promise<Article> => {
        const article = await prisma.article.update({
            where: {
                id: articleId,
            },
            data: {
                content: content,
                title: articleTitle,
                imageUrl,
                slug,
                updatedAt: moment.utc().format(),
                state,
            },
        });
        return article;
    };

    setArticleState = async ({
        articleId,
        articleState,
    }: {
        articleId: string;
        articleState: ArticleState;
    }): Promise<Article> => {
        const article = await prisma.article.update({
            where: {
                id: articleId,
            },
            data: {
                state: articleState,
            },
        });
        return article;
    };

    deleteArticle = async ({ articleId }: { articleId: string }): Promise<Article> => {
        // Validate
        if (!articleId) throw new Error(ErrorDictionary.INVALID_REQUEST);
        // Action
        const article = await prisma.article.delete({
            where: { id: articleId },
        });
        return article;
    };
}
