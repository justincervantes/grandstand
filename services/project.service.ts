import BaseService from './base.service';
import { UserProject } from '@prisma/client';
import prisma from '../lib/prismadb';
import ErrorDictionary from '../lib/errorDictionary';
import moment from 'moment';
export default class ProjectService extends BaseService {
    constructor(sessionToken) {
        super(sessionToken);
    }
    public createUserProject = async ({
        title,
        description,
        imageUrl,
        applicationUrl,
        gitHubUrl,
        mostProudOf,
        mostInteresting,
        mostUnique,
        whyBuilt,
        techStack,
    }: {
        title: string;
        description?: string;
        imageUrl?: string;
        applicationUrl?: string;
        gitHubUrl?: string;
        mostProudOf?: string;
        mostInteresting?: string;
        mostUnique?: string;
        whyBuilt?: string;
        techStack?: string;
    }): Promise<UserProject> => {
        const userProject = await prisma.userProject.create({
            data: {
                userId: this.sessionUserId,
                title,
                description,
                imageUrl,
                applicationUrl,
                gitHubUrl,
                mostProudOf,
                mostInteresting,
                mostUnique,
                whyBuilt,
                techStack,
            },
        });
        return userProject;
    };
    public deleteUserProject = async ({ projectId }: { projectId: string }): Promise<UserProject> => {
        if (!projectId) throw new Error(ErrorDictionary.INVALID_REQUEST);

        const userProject = await prisma.userProject.update({
            where: { id: projectId },
            data: {
                deletedAt: moment.utc().toDate(),
            },
        });
        return userProject;
    };
}
