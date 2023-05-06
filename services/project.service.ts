import BaseService from './base.service';
import { Project } from '@prisma/client';
import prisma from '../lib/prismadb';
import ErrorDictionary from '../lib/errorDictionary';
import moment from 'moment';
export default class ProjectService extends BaseService {
    constructor(sessionToken) {
        super(sessionToken);
    }
    public createUserProject = async (values: {
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
    }): Promise<Project> => {
        const userProject = await prisma.project.create({
            data: {
                userId: this.sessionUserId,
                ...values,
            },
        });
        return userProject;
    };
    public deleteUserProject = async ({ projectId }: { projectId: string }): Promise<UserProject> => {
        if (!projectId) throw new Error(ErrorDictionary.INVALID_REQUEST);

        const userProject = await prisma.project.update({
            where: { id: projectId },
            data: {
                deletedAt: moment.utc().toDate(),
            },
        });
        return userProject;
    };
}
