import BaseService from './base.service';
import { Article, ArticleUserActions } from '@prisma/client';
import prisma from '../lib/prismadb';

export default class DashboardService extends BaseService {
    constructor(sessionToken) {
        super(sessionToken);
    }

    getRecentPosts = async (): Promise<Partial<Article>[]> => {
        const articles = await prisma.article.findMany({
            where: {
                deletedBy: null,
                createdByUserId: this.sessionUserId,
            },
            select: {
                title: true,
                createdAt: true,
                updatedAt: true,
                id: true,
            },
        });
        return articles;
    };

    getUserArticleActions = async (): Promise<Partial<ArticleUserActions>[]> => {
        const userArticleActivity = await prisma.articleUserActions.findMany({
            where: {
                user: { id: this.sessionUserId },
            },
            include: {
                article: {
                    select: {
                        id: true,
                        title: true,
                        deletedAt: true,
                    },
                },
            },
            orderBy: { date: 'desc' },
        });
        return userArticleActivity;
    };

    getPostsPerMonth = async (): Promise<Partial<Article>[]> => {
        const posts = await prisma.article.findMany({
            where: {
                deletedBy: null,
                createdByUserId: this.sessionUserId,
            },
            select: {
                createdAt: true,
                updatedAt: true,
            },
            orderBy: { createdAt: 'asc' },
        });
        return posts;
    };
}
