import { useEffect, useState, useCallback } from 'react';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { get } from 'lodash';
import moment from 'moment';
import Loading from '../components/loading';
import CreateOrganizationModal from '../components/organizations/create-organization-modal';
import AddUserToOrganizationModal from '../components/organizations/add-user-to-organization-modal';
import { useToast } from '../context/ToastContext';
import { localStorageKeys } from '../lib/localStorageKeys';
import prisma from '../lib/prismadb';

const Organizations = ({ organizations: organizationsFromProps }) => {
    const [organizations, setOrganizations] = useState(organizationsFromProps);
    const [isLoading, setIsLoading] = useState(false);
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [createOrganizationName, setCreateOrganizationName] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState({
        id: 0,
        name: '',
        subscriptionExpiry: '',
        users: [],
    });
    const [orgNewUserEmail, setOrgNewUserEmail] = useState('');
    const [addUserModalIsOpen, setAddUserModalIsOpen] = useState(false);
    const { addToast } = useToast();

    const modalEscape = useCallback((event) => {
        if (event.key === 'Escape') {
            setCreateModalIsOpen(false);
            setAddUserModalIsOpen(false);
        }
    }, []);

    useEffect(() => {
        const lastSelectedOrganizationId = localStorage.getItem(localStorageKeys.organizationsSelectedOrg);
        const activeOrganization = organizations.find(({ id }) => id === lastSelectedOrganizationId);
        if (activeOrganization) setSelectedOrganization(activeOrganization);
        else setSelectedOrganization(organizations[0]);
    }, [organizations]);

    useEffect(() => {
        document.addEventListener('keydown', modalEscape, false);

        return () => {
            document.removeEventListener('keydown', modalEscape, false);
        };
    }, [modalEscape]);

    const createOrganization = async () => {
        if (createOrganizationName.trim().length < 3) {
            addToast('Organization name must be at least 3 characters.', 'Error');
            return;
        }
        setIsLoading(true);
        await axios
            .post('/api/organizations/createOrganization', {
                organizationName: createOrganizationName,
            })
            .then(() => {
                addToast('Successfully created organization', 'Success');
            })
            .catch((error) => {
                const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                addToast(errorMessage, 'Error');
            });
        setCreateModalIsOpen(false);
        readOrganizations();
        setIsLoading(false);
    };
    const readOrganizations = async () => {
        await axios
            .post('/api/organizations/getOrganizations')
            .then((response) => setOrganizations(response.data.organizations))
            .catch((error) => {
                const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                addToast(errorMessage, 'Error');
            });
        setIsLoading(false);
    };
    const handleOrganizationChange = (organizationId) => {
        const organization = organizations.find((organization) => organization.id === organizationId);
        setSelectedOrganization(organization);
        localStorage.setItem(localStorageKeys.organizationsSelectedOrg, organization.id);
    };

    const deleteOrganization = async (organizationId) => {
        const proceed = confirm(
            'Are you sure you want to delete this organization? You will lose access to any associated articles.',
        );
        if (!proceed) return;
        setIsLoading(true);
        await axios
            .post('/api/organizations/deleteOrganization', {
                organizationId,
            })
            .then(() => {
                addToast('Successfully deleted organization', 'Success');
            })
            .catch((error) => {
                const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                addToast(errorMessage, 'Error');
            });
        readOrganizations();
        setIsLoading(false);
    };

    const addUser = async () => {
        if (orgNewUserEmail.trim().length == 0) {
            addToast('Please enter an email address to add.', 'Error');
            return;
        }
        setIsLoading(true);
        await axios
            .post('/api/organizations/addUserToOrganization', {
                newUserEmail: orgNewUserEmail,
                organizationId: selectedOrganization.id,
            })
            .then(() => {
                addToast('Successfully added a user to the organization', 'Success');
            })
            .catch((error) => {
                const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                addToast(errorMessage, 'Error');
            });
        readOrganizations();
        setAddUserModalIsOpen(false);
        setIsLoading(false);
    };

    const removeUser = async (userIdToRemove, organizationId) => {
        const proceed = confirm('Are you sure you want to remove this user?');
        if (!proceed) return;
        setIsLoading(true);
        await axios
            .post('/api/organizations/removeUserFromOrganization', {
                userIdToRemove,
                organizationId,
            })
            .then(() => {
                addToast('Successfully deleted a user from the organization', 'Success');
            })
            .catch((error) => {
                const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                addToast(errorMessage, 'Error');
            });
        readOrganizations();
        setIsLoading(false);
    };

    const tableColumns = [
        { label: 'Name', value: 'name' },
        { label: 'Email', value: 'email' },
        { label: '', value: 'actions' },
    ];

    if (isLoading) return <Loading />;
    const { name, subscriptionExpiry, users = [] } = selectedOrganization ?? {};

    return (
        <>
            <div className="min-h-[78vh] max-h-[78vh]">
                <div className="flex justify-between mb-2">
                    <span className="font-medium text-xl pl-2">My Organizations</span>
                    <button
                        className="justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 ml-1 mb-1"
                        onClick={() => {
                            setCreateOrganizationName('');
                            setCreateModalIsOpen(true);
                        }}
                    >
                        Create Organization
                    </button>
                </div>
                <div className="grid grid-flow-col grid-cols-12 p-1 h-full">
                    <div className="col-span-2 border-l border-y rounded-tl-lg rounded-bl-lg flex flex-col overflow-y-auto min-h-[73vh] max-h-[73h] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded">
                        {organizations.map((organization, index) => {
                            const { id: organizationId, name } = organization ?? {};
                            const { id: selectedOrganizationId } = selectedOrganization ?? {};
                            const isActive = organizationId === selectedOrganizationId;
                            const isFirst = index === 0;
                            return (
                                <div
                                    key={index}
                                    className={`flex justify-between ${isActive ? 'bg-orange-100 ' : ''}${
                                        isFirst ? 'rounded-tl-lg ' : ''
                                    }p-2`}
                                    onClick={() => handleOrganizationChange(organizationId)}
                                >
                                    {name}
                                    <button
                                        key={'button' + index}
                                        className="px-1 rounded hover:bg-red-600 hover:text-white"
                                        onClick={() => {
                                            deleteOrganization(organizationId);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div className=" col-span-10 grid">
                        {organizations.length > 0 && (
                            <div className="border rounded-tr-lg rounded-br-lg p-4 flex flex-col">
                                <div className="border rounded-tr-lg rounded-br-lg p-4 flex flex-col">
                                    <span className="text-3xl font-semibold pb-1">{name}</span>
                                    <span className="text-m font-regular">{`Account Status: ${
                                        subscriptionExpiry
                                            ? `Member - Expiring ${moment(subscriptionExpiry).format('YYYY-MM-DD')}`
                                            : 'Trial'
                                    }`}</span>
                                    <span>Manage Subscription (Pending Stripe Integration)</span>
                                    <span>
                                        Endpoint (GET):{' '}
                                        {`${process.env.NEXT_PUBLIC_DOMAIN}/api/articles/${selectedOrganization?.id}`}
                                    </span>
                                    <br />
                                    <div className="flex justify-between mb-2">
                                        <span className="text-xl pb-2">User Management</span>

                                        <button
                                            className="justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 ml-1 mb-1"
                                            onClick={() => {
                                                setOrgNewUserEmail('');
                                                setAddUserModalIsOpen(true);
                                            }}
                                        >
                                            Add user by email
                                        </button>
                                    </div>
                                    <table className="table-fixed w-full text-black border border-slate-100">
                                        <thead>
                                            <tr>
                                                {tableColumns.map((column, index) => (
                                                    <th
                                                        key={`thead-col-${index}`}
                                                        className="bg-orange-100 border-b font-medium px-8 py-3 text-black dark:text-slate-200 text-left"
                                                    >
                                                        {column.label}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => (
                                                <tr key={`tbody-row-${index}`}>
                                                    <td className="border-b border-slate-100 p-4 pl-8 text-black">
                                                        {user.name}
                                                    </td>
                                                    <td className="border-b border-slate-100 p-4 pl-8 text-black">
                                                        {user.email}
                                                    </td>
                                                    <td className="border-b border-slate-100 py-4 pl-8 pr-12 text-black text-right">
                                                        <button
                                                            key={'button' + index}
                                                            className="pl-1 pr-1 rounded hover:bg-red-600 hover:text-white"
                                                            onClick={() => {
                                                                removeUser(user.id, selectedOrganization.id);
                                                            }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {organizations.length == 0 && (
                            <div className="w-full h-fill border rounded-lg flex items-center justify-center bg-orange-100">
                                <span>Create an organization to proceed</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <CreateOrganizationModal
                isOpen={createModalIsOpen}
                onOK={createOrganization}
                onCancel={() => setCreateModalIsOpen(false)}
                setOrganizationName={setCreateOrganizationName}
            />
            <AddUserToOrganizationModal
                isOpen={addUserModalIsOpen}
                onOK={addUser}
                onCancel={() => setAddUserModalIsOpen(false)}
                setUserEmail={setOrgNewUserEmail}
            />
        </>
    );
};

export default Organizations;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/home',
            },
        };
    }

    const organizations = await prisma.organization.findMany({
        where: {
            deletedAt: null,
            users: {
                some: {
                    email: session.user.email,
                },
            },
        },
        include: {
            articles: true,
            users: true,
        },
    });

    return {
        props: { organizations: JSON.parse(JSON.stringify(organizations)) },
    };
}
