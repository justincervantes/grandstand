import axios from 'axios';
import { get } from 'lodash';
import { getSession } from 'next-auth/react';
import { useToast } from '../../context/ToastContext';
import React, { useState } from 'react';
import ProjectsSidebar from '../../components/projects/projects-sidebar';
import ProjectsForm from '../../components/projects/projects-form';
import EditingLayout from '../../components/layout';
import { useRouter } from 'next/router';

const Projects = (props) => {
    const { projects = [] } = props;
    const router = useRouter();

    const handleSubmit = async (values, actions) => {
        let projectId = selectedProjectId;
        if (!updateExisting) {
            await axios
                .post('/api/projects/createProject', values)
                .then(() => {
                    addToast('Successfully created project', 'Success');
                })
                .catch((error) => {
                    const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                    addToast(errorMessage, 'Error');
                });
            await axios
                .post('/api/projects/getProjects', {})
                .then((response) => setProjectsSidebar(response.data.projects))
                .catch((error) => {
                    const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                    addToast(errorMessage, 'Error');
                });
            clearFormStateValues();
            actions.resetForm();
        } else {
            await axios
                .post('/api/projects/updateProject', { projectId, values })
                .then((response) => {
                    addToast('Successfully updated project', 'Success');
                })
                .catch((error) => {
                    const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                    addToast(errorMessage, 'Error');
                });
            await axios
                .post('/api/projects/getProjects', {})
                .then((response) => setProjectsSidebar(response.data.projects))
                .catch((error) => {
                    const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                    addToast(errorMessage, 'Error');
                });
            clearFormStateValues();
            actions.resetForm();
        }
    };

    return (
        <EditingLayout>
            <div className="w-full m-auto">
                <div className="flex justify-between w-full mb-6">
                    <p className="text-3xl bold">Projects</p>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            router.push('/projects/new');
                        }}
                        className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border-black border-2 bg-white px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-indigo-700"
                    >
                        New
                    </button>
                </div>
                {projects.map(({ title, description, state }) => (
                    <div className="hover:bg-gray-50">
                        <div className="w-full border-b border-gray-400 flex leading-normal">
                            <div className="mb-4 w-full">
                                <div className="text-gray-900 font-bold text-xl mb-1">{title}</div>
                                <p className="text-gray-700 text-base">{description}</p>
                                <p
                                    className={`text-center text-base text-white p-1 my-1 ${
                                        state === 'Published' ? 'bg-green-700' : 'bg-gray-500'
                                    }`}
                                >
                                    {state}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </EditingLayout>
    );
};

export default Projects;

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

    const { projects } = await prisma.user.findFirstOrThrow({
        where: {
            email: currentUserEmail,
        },
        select: {
            projects: {
                where: {
                    deletedAt: null,
                },
            },
        },
    });

    return {
        props: { projects: JSON.parse(JSON.stringify(projects)) },
    };
}
