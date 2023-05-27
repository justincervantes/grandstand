import EditingLayout from '../../components/layout';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { programmingLanguageOptions } from '../../lib/programmingLanguageOptions';
import axios from 'axios';
import { useToast } from '../../context/ToastContext';
import { useRouter } from 'next/router';

const fields = [
    { label: 'Title', name: 'title' },
    { label: 'Slug', name: 'slug' },
    { label: 'Description', name: 'description', component: 'textarea', rows: 2 },
    { label: 'Date Range', name: 'dateRange' },
    { label: 'Image URL', name: 'imageUrl' },
    { label: 'Application URL', name: 'applicationUrl' },
    { label: 'GitHub URL', name: 'gitHubUrl' },
    {
        label: 'What are you most proud of about this project?',
        name: 'mostProudOf',
        component: 'textarea',
        rows: 2,
    },
    {
        label: 'What is the most interesting aspect about this project?',
        name: 'mostInteresting',
        component: 'textarea',
        rows: 2,
    },
    {
        label: 'What is the most unique aspect about this project?',
        name: 'mostUnique',
        component: 'textarea',
        rows: 2,
    },
    { label: 'What motivated you to build this project?', name: 'whyBuilt', component: 'textarea', rows: 2 },
    { label: 'Project Tech Stack:', name: 'techStack' },
];

const validationSchema = () =>
    yup.object().shape({
        title: yup.string().trim().min(2, 'Must be greater than 2 chars').required('Please enter a title'),
        slug: yup
            .string()
            .matches(
                /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                'Only lowercase letters and numbers allowed, spaces should be replaced with hyphens',
            )
            .min(2, 'Must be greater than 2 characters')
            .required('Please enter a slug'),
        description: yup
            .string()
            .trim()
            .min(5, 'Must be greater than 5 characters')
            .required('Please enter a description about your project'),
        dateRange: yup.string().trim().min(3, 'Must be greater than 3 characters'),
        imageUrl: yup.string().trim().url('Please provide a full http/https URL'),
        applicationUrl: yup.string().trim().url('Please provide a full http/https URL'),
        gitHubUrl: yup.string().trim().url('Please provide a full http/https URL'),
        mostProudOf: yup.string().trim().min(5, 'Must be greater than 5 characters'),
        mostInteresting: yup.string().trim().min(5, 'Must be greater than 5 characters'),
        mostUnique: yup.string().trim().min(5, 'Must be greater than 5 characters'),
        whyBuilt: yup.string().trim().min(5, 'Must be greater than 5 characters'),
        techStack: yup.string().trim().min(5, 'Must be greater than 5 characters'),
        codeSnippet: yup.string().trim().min(5, 'Must be greater than 5 characters'),
        codeSnippetLanguage: yup.string(),
        state: yup.string(),
    });

const initialValues = () => ({
    title: '',
    description: '',
    dateRange: '',
    imageUrl: '',
    applicationUrl: '',
    gitHubUrl: '',
    mostProudOf: '',
    mostInteresting: '',
    mostUnique: '',
    whyBuilt: '',
    techStack: '',
    codeSnippet: '',
    codeSnippetLanguage: '',
});

const NewProject = () => {
    const { addToast } = useToast();
    const router = useRouter();

    const handleSubmit = async (values) => {
        axios
            .post('/api/projects/createProject', { ...values })
            .then(() => {
                addToast('Project successfully created', 'Success');
                router.push('/projects');
            })
            .catch();
    };
    return (
        <EditingLayout>
            <Formik initialValues={initialValues()} onSubmit={handleSubmit} validationSchema={validationSchema()}>
                {({ setFieldValue, values }) => {
                    return (
                        <Form className="w-10/12 bg-gray-50 shadow-lg rounded px-8 pt-6 pb-8 mb-4 mx-auto ">
                            <h1 className="font-medium text-xl pl-2 mb-2 text-center">Project Entry Form</h1>

                            {fields.map((field, index) => {
                                const { label, name, component, rows } = field ?? {};
                                return (
                                    <div className="mb-2" key={index}>
                                        <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
                                            {label}
                                        </label>
                                        <Field
                                            type="text"
                                            name={name}
                                            component={component}
                                            rows={rows}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        ></Field>
                                        <ErrorMessage name={name}>
                                            {(errorMessage) => <div className="text-red-500">{errorMessage}</div>}
                                        </ErrorMessage>
                                    </div>
                                );
                            })}
                            <div className="mb-2">
                                <label htmlFor="codeSnippet" className="block text-gray-700 text-sm font-bold mb-2">
                                    Favourite code snippet
                                </label>
                                <Field
                                    type="text"
                                    name="codeSnippet"
                                    component="textarea"
                                    rows={2}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                ></Field>
                                <ErrorMessage name="codeSnippet">
                                    {(errorMessage) => <div className="text-red-500">{errorMessage}</div>}
                                </ErrorMessage>
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="codeSnippetLanguage"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Favourite code snippet, language, and description:
                                </label>
                                <Field
                                    name="codeSnippetLanguage"
                                    as="select"
                                    className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onClick={(e) => setFieldValue('codeSnippetLanguage', e.target.value)}
                                >
                                    {programmingLanguageOptions.map((option, index) => {
                                        return <option value={option.value} label={option.label} key={index} />;
                                    })}
                                </Field>
                                <ErrorMessage name="codeSnippetLanguage">
                                    {(errorMessage) => <div className="text-red-500">{errorMessage}</div>}
                                </ErrorMessage>
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="codeSnippetPreview"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Code Snippet Preview
                                </label>
                                <SyntaxHighlighter language={values.codeSnippetLanguage}>
                                    {values.codeSnippet}
                                </SyntaxHighlighter>
                            </div>
                            <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">
                                State (only published projects are visible)
                            </label>
                            <Field
                                name="state"
                                as="select"
                                className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onClick={(e) => setFieldValue('state', e.target.value)}
                            >
                                <option value="Published" label="Published" />;
                                <option value="Draft" label="Draft" />;
                            </Field>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </EditingLayout>
    );
};

export default NewProject;
