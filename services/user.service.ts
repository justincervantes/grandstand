import BaseService from './base.service';
import { User } from '@prisma/client';
import prisma from '../lib/prismadb';
import ErrorDictionary from '../lib/errorDictionary';

export default class UserService extends BaseService {
    constructor(sessionToken) {
        super(sessionToken);
    }

    public updateUser = async (values): Promise<User> => {
        const { userName, slug, description, imageUrl, gitHubUrl, linkedInUrl } = values;
        const invalidSlugs = [
            'admin',
            'null',
            'god',
            'spotlight',
            'home',
            'about-me',
            'blog',
            'projects',
            'project',
            'blogs',
            'aboutme',
        ];

        // Validate
        if (invalidSlugs.includes(slug.trim().toLowerCase())) throw new Error(ErrorDictionary.INVALID_SLUG);

        const checkSlug = await prisma.user.findFirst({
            where: {
                slug,
            },
        });

        if (checkSlug != null) throw new Error(ErrorDictionary.INVALID_SLUG);

        // Update if valid
        const updatedUser = await prisma.user.update({
            where: {
                id: this.sessionUserId,
            },
            data: {
                name: userName,
                slug,
                description,
                image: imageUrl,
                gitHubUrl,
                linkedInUrl,
            },
        });
        return updatedUser;
    };
}
