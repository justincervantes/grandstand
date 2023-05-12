import BaseService from './base.service';
import { Project, User } from '@prisma/client';
import prisma from '../lib/prismadb';
import ErrorDictionary from '../lib/errorDictionary';
import moment from 'moment';

export default class UserService extends BaseService {
    constructor(sessionToken) {
        super(sessionToken);
    }

    public updateUser = async (values): Promise<User> => {
        const { userName, slug, description, imageUrl, gitHubUrl, linkedInUrl } = values;
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
