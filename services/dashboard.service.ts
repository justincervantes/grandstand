import BaseService from './base.service';
import { Organization, Article, ArticleUserActions } from '@prisma/client';
import prisma from '../lib/prismadb';

export default class DashboardService extends BaseService {
    constructor(sessionToken) {
        super(sessionToken);
    }

    getRecentPosts = async (): Promise<Partial<Organization>[]> => {
        const organizations = await prisma.organization.findMany({
            where: {
                deletedAt: null,
                users: {
                    some: {
                        id: this.sessionUserId,
                    },
                },
                articles: {
                    some: {
                        deletedAt: null,
                    },
                },
            },
            select: {
                name: true,
                id: true,
                articles: {
                    select: {
                        title: true,
                        createdAt: true,
                        updatedAt: true,
                        id: true,
                    },
                },
            },
        });
        return organizations;
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
                        organization: { select: { id: true, name: true } },
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
                organization: {
                    deletedAt: null,
                    users: {
                        some: {
                            id: this.sessionUserId,
                        },
                    },
                },
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
