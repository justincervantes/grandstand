import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import DropdownMenu from '../components/dropdown';
import Loading from '../components/loading';
import OrganizationArticles from '../components/articles/organization-articles';
import prisma from '../lib/prismadb';
import { localStorageKeys } from '../lib/localStorageKeys';

const Articles = (props) => {
    const { organizations = [] } = props;
    const [selectedOrganizationName, setSelectedOrganizationName] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const { currentUserEmail } = props;

    useEffect(() => {
        const organizationId = localStorage.getItem(localStorageKeys.articlesSelectedOrg);
        const activeOrg = organizations.find((organization) => organization.id === organizationId);
        if (activeOrg) {
            setSelectedOrganizationName(activeOrg.name);
        }
    }, []);

    const NoOrganizations = () => (
        <div className="w-full h-fill min-h-[73vh] border rounded-lg flex items-center justify-center bg-orange-100">
            <span>
                To start writing articles, you'll need to{' '}
                <a href="/organizations" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    create
                </a>{' '}
                or be invited to an organization
            </span>
        </div>
    );

    const NoOrganizationSelected = () => (
        <div className="w-full min-h-[73vh] border rounded-lg flex items-center justify-center bg-orange-100">
            <span>To view, edit, or create articles, you'll need to select an organization</span>
        </div>
    );

    if (isLoading) return <Loading />;

    return (
        <React.Fragment>
            <div className="flex justify-between whitespace-nowrap mb-3">
                <h1 className="font-medium text-xl pl-2">Articles</h1>
                {organizations.length > 0 && (
                    <div className="flex justify-between">
                        <DropdownMenu
                            placeholder="Select an organization"
                            options={organizations.map(({ name }) => name)}
                            onOptionClick={(option) => {
                                const org = organizations.find(({ name }) => option === name);
                                setSelectedOrganizationName(org.name);
                                localStorage.setItem(localStorageKeys.articlesSelectedOrg, org.id);
                            }}
                            value={selectedOrganizationName}
                        />
                    </div>
                )}
            </div>
            <div className="max-h-[73npm run decoration-violet-50vh] min-h-[73vh]">
                {organizations.length === 0 && <NoOrganizations />}
                {organizations.length > 0 && !selectedOrganizationName && <NoOrganizationSelected />}
                {selectedOrganizationName && (
                    <OrganizationArticles
                        email={currentUserEmail}
                        organization={organizations.find(({ name }) => name === selectedOrganizationName)}
                    />
                )}
            </div>
        </React.Fragment>
    );
};

export default Articles;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/home',
            },
        };
    }
    const currentUserEmail = session.user.email;
    const organizations = await prisma.organization.findMany({
        where: {
            deletedAt: null,
            users: {
                some: {
                    email: currentUserEmail,
                },
            },
        },
    });
    return {
        props: { currentUserEmail, organizations: JSON.parse(JSON.stringify(organizations)) },
    };
}
