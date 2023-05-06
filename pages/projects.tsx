import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { get } from 'lodash';
import { getSession } from 'next-auth/react';
import { useToast } from '../context/ToastContext';
import React, { useEffect, useState } from 'react';
import ProjectsSidebar from '../components/projects/projects-sidebar';

const Projects = (props) => {
    const { projects = [] } = props;
    const { addToast } = useToast();
    const handleSubmit = async (values) => {
        const {
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
        } = values;
        await axios
            .post('/api/projects/createUserProject', {
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
            })
            .catch((error) => {
                const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                addToast(errorMessage, 'Error');
            });
    };

    return (
        <div className="flex justify-between whitespace-nowrap">
            <ProjectsSidebar userProjects={projects} />
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    imageUrl: '',
                    applicationUrl: '',
                    gitHubUrl: '',
                    mostProudOf: '',
                    mostInteresting: '',
                    mostUnique: '',
                    whyBuilt: '',
                    techStack: '',
                }}
                onSubmit={handleSubmit}
            >
                <Form className="bg-gray-50 shadow-lg rounded px-8 pt-6 pb-8 mb-4 max-w-3xl mx-auto">
                    <h1 className="font-medium text-xl pl-2 mb-2 text-center">Project Input</h1>
                    <div>
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-1 mt-2">
                            Project Title:
                        </label>
                        <Field
                            type="text"
                            name="title"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-1 mt-2">
                            Project Description:
                        </label>
                        <Field
                            type="text"
                            component="textarea"
                            rows={2}
                            name="description"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-1 mt-2">
                            Project Image Link:
                        </label>
                        <Field
                            type="text"
                            name="imageUrl"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="applicationUrl" className="block text-gray-700 text-sm font-bold mb-1 mt-2">
                            Link to Application:
                        </label>
                        <Field
                            type="text"
                            name="applicationUrl"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="gitHubUrl" className="block text-gray-700 text-sm font-bold mb-1 mt-2">
                            GitHub Link:
                        </label>
                        <Field
                            type="text"
                            name="gitHubUrl"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="mostProudOf" className="block text-gray-700 text-sm font-bold mb-1 mt-2">
                            What are you most proud of about this project?
                        </label>
                        <Field
                            type="text"
                            component="textarea"
                            rows={2}
                            name="mostProudOf"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="mostInteresting" className="block text-gray-700 text-sm font-bold mb-1 mt-2">
                            What is the most interesting aspect about this project?
                        </label>
                        <Field
                            type="text"
                            component="textarea"
                            rows={2}
                            name="mostInteresting"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="mostUnique" className="block text-gray-700 text-sm font-bold mb-1 mt-2">
                            What is the most unique aspect about this project?
                        </label>
                        <Field
                            type="text"
                            component="textarea"
                            rows={2}
                            name="mostUnique"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="whyBuilt" className="block text-gray-700 text-sm font-bold mb-1 mt-2">
                            What motivated you to build this project?
                        </label>
                        <Field
                            type="text"
                            component="textarea"
                            rows={2}
                            name="whyBuilt"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="codeSnippet" className="block text-gray-700 text-sm font-bold mb-1 mt-2">
                            Code snippet, language of code snippet, and description of code snippet:
                        </label>
                        <Field
                            type="text"
                            component="textarea"
                            rows={2}
                            name="codeSnippet"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="techStack" className="block text-gray-700 text-sm font-bold mb-1 mt-2">
                            Project Tech Stack:
                        </label>
                        <Field
                            type="text"
                            component="textarea"
                            rows={2}
                            name="techStack"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
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

    const projects = await prisma.user.findFirstOrThrow({
        where: {
            email: currentUserEmail,
        },
        select: {
            userProjects: {
                where: {
                    deletedAt: null,
                },
            },
        },
    });
    const { userProjects } = projects;
    return {
        props: { projects: JSON.parse(JSON.stringify(userProjects)) },
    };
}
