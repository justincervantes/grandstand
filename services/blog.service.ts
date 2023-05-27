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

    public createNewArticle = async (
        values: {
            title: string;
            slug: string;
            imageUrl?: string;
        },
        content?: string,
    ): Promise<Article> => {
        // Validate
        if (!values.title || !values.slug) throw new Error(ErrorDictionary.INVALID_REQUEST);
        // Action
        const article = await prisma.article.create({
            data: {
                userId: this.sessionUserId,
                state: ArticleState.Draft,
                createdAt: moment.utc().format(),
                title: values.title,
                content: content ?? '',
                slug: values.slug,
                imageUrl: values.imageUrl ?? '',
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
    }: {
        articleId: string;
        articleTitle: string;
        imageUrl: string;
        slug: string;
        content: string;
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
