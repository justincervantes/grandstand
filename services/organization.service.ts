import { Organization } from '@prisma/client';
import moment from 'moment';
import ErrorDictionary from '../lib/errorDictionary';
import BaseService from './base.service';
import prisma from '../lib/prismadb';

export default class OrganizationService extends BaseService {
    constructor(sessionToken) {
        super(sessionToken);
    }

    addUserToOrganization = async ({
        organizationId,
        newUserEmail,
    }: {
        organizationId: string;
        newUserEmail: string;
    }): Promise<Organization> => {
        // Validate - Throw if the user does not belong to the organization
        if (!organizationId || !newUserEmail) throw new Error(ErrorDictionary.INVALID_REQUEST);
        await prisma.user.findFirstOrThrow({
            where: { id: this.sessionUserId, organizations: { some: { id: organizationId } } },
        });
        const { id: newUserId } = await prisma.user.findUniqueOrThrow({
            where: { email: newUserEmail },
        });

        // Action
        const updatedOrganization = await prisma.organization.update({
            where: { id: organizationId },
            data: {
                users: { connect: [{ id: newUserId }] },
            },
        });
        return updatedOrganization;
    };

    removeUserFromOrganization = async ({
        organizationId,
        userIdToRemove,
    }: {
        organizationId: string;
        userIdToRemove: string;
    }): Promise<Organization> => {
        // Validate - Throw if the user does not belong to the organization
        if (!organizationId || !userIdToRemove) throw new Error(ErrorDictionary.INVALID_REQUEST);
        await prisma.user.findFirstOrThrow({
            where: { id: this.sessionUserId, organizations: { some: { id: organizationId } } },
        });

        // Action
        const organization = await prisma.organization.update({
            where: { id: organizationId },
            data: {
                users: { disconnect: [{ id: userIdToRemove }] },
            },
        });
        return organization;
    };

    createOrganization = async ({ organizationName }: { organizationName: string }): Promise<Organization> => {
        // Validate - Throw if the user's Id is not associated with the email provided
        if (!organizationName) throw new Error(ErrorDictionary.INVALID_REQUEST);

        // Action
        const organization = await prisma.organization.create({
            data: {
                name: organizationName,
                createdAt: moment.utc().toDate(),
                createdBy: { connect: { id: this.sessionUserId } },
                users: { connect: [{ id: this.sessionUserId }] },
            },
        });
        return organization;
    };

    deleteOrganization = async ({ organizationId }: { organizationId: string }): Promise<Organization> => {
        // Validate - Throw if the user does not belong to the organization
        if (!organizationId) throw new Error(ErrorDictionary.INVALID_REQUEST);
        await prisma.user.findFirstOrThrow({
            where: { id: this.sessionUserId, organizations: { some: { id: organizationId } } },
        });

        // Action
        const organization = await prisma.organization.update({
            where: { id: organizationId },
            data: {
                deletedAt: moment.utc().toDate(),
                deletedBy: { connect: { id: this.sessionUserId } },
                users: { connect: [{ id: this.sessionUserId }] },
            },
        });
        return organization;
    };

    getOrganizations = async (): Promise<Organization[]> => {
        const organizations = await prisma.organization.findMany({
            where: {
                deletedAt: null,
                users: {
                    some: {
                        id: this.sessionUserId,
                    },
                },
            },
            include: {
                articles: true,
                users: true,
            },
        });
        return organizations;
    };
}
