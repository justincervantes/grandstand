import BaseService from './base.service';
import { Project } from '@prisma/client';
import prisma from '../lib/prismadb';
import ErrorDictionary from '../lib/errorDictionary';
import moment from 'moment';
export default class ProjectService extends BaseService {
    constructor(sessionToken) {
        super(sessionToken);
    }
    public createProject = async (values: {
        title: string;
        description?: string;
        dateRange?: string;
        imageUrl?: string;
        applicationUrl?: string;
        gitHubUrl?: string;
        mostProudOf?: string;
        mostInteresting?: string;
        mostUnique?: string;
        whyBuilt?: string;
        techStack?: string;
        codeSnippet?: string;
        codeSnippetLanguage?: string;
    }): Promise<Project> => {
        const userProject = await prisma.project.create({
            data: {
                userId: this.sessionUserId,
                ...values,
            },
        });
        return userProject;
    };
    public getProjects = async ({}: {}): Promise<Project[]> => {
        const projects = await prisma.project.findMany({
            where: { userId: this.sessionUserId, deletedAt: null },
        });
        return projects;
    };
    public getProject = async ({ projectId }: { projectId: string }): Promise<Project> => {
        const project = await prisma.project.findFirstOrThrow({
            where: { id: projectId, userId: this.sessionUserId, deletedAt: null },
        });
        return project;
    };
    public deleteProject = async ({ projectId }: { projectId: string }): Promise<Project> => {
        if (!projectId) throw new Error(ErrorDictionary.INVALID_REQUEST);
        const userProject = await prisma.project.update({
            where: { id: projectId },
            data: {
                deletedAt: moment.utc().toDate(),
            },
        });
        return userProject;
    };
    public updateProject = async ({
        projectId,
        values,
    }: {
        projectId: string;
        values: {
            title: string;
            description?: string;
            dateRange?: string;
            imageUrl?: string;
            applicationUrl?: string;
            gitHubUrl?: string;
            mostProudOf?: string;
            mostInteresting?: string;
            mostUnique?: string;
            whyBuilt?: string;
            techStack?: string;
            codeSnippet?: string;
            codeSnippetLanguage?: string;
        };
    }): Promise<Project> => {
        if (!projectId) throw new Error(ErrorDictionary.INVALID_REQUEST);

        const userProject = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                ...values,
            },
        });
        return userProject;
    };
}
