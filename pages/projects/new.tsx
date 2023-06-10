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
    { label: 'Project Slug (Path - grandstand.dev/userSlug/projects/projectSlug)', name: 'slug' },
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
        label: 'What were the key learning outcomes from this project?',
        name: 'learningOutcomes',
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
            .trim()
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
        dateRange: yup
            .string()
            .trim()
            .min(3, 'Must be greater than 3 characters')
            .required('An approximate date range of when you worked on this is required.'),
        imageUrl: yup.string().trim().url('Please provide a full http/https URL').required('An image is required.'),
        applicationUrl: yup.string().trim().url('Please provide a full http/https URL'),
        gitHubUrl: yup.string().trim().url('Please provide a full http/https URL'),
        mostProudOf: yup.string().trim().min(5, 'Must be greater than 5 characters'),
        learningOutcomes: yup.string().trim().min(5, 'Must be greater than 5 characters'),
        whyBuilt: yup.string().trim().min(5, 'Must be greater than 5 characters'),
        techStack: yup.string().trim().min(5, 'Must be greater than 5 characters'),
        codeSnippet: yup.string().trim().min(5, 'Must be greater than 5 characters'),
        codeSnippetLanguage: yup.string(),
        state: yup.string(),
    });

const initialValues = () => ({
    title: '',
    slug: '',
    description: '',
    dateRange: '',
    imageUrl: '',
    applicationUrl: '',
    gitHubUrl: '',
    mostProudOf: '',
    learningOutcomes: '',
    whyBuilt: '',
    techStack: '',
    codeSnippet: '',
    codeSnippetLanguage: '',
});

const NewProject = () => {
    const { addToast } = useToast();
    const router = useRouter();

    const handleSubmit = async (values) => {
        console.log('submitting');
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
                        <Form className="w-11/12 px-8 pt-6 pb-8 mx-auto mb-4 rounded shadow-lg md:w-10/12 bg-gray-50 ">
                            <h1 className="pl-2 mb-2 text-xl font-medium text-center">Project Entry Form</h1>

                            {fields.map((field, index) => {
                                const { label, name, component, rows } = field ?? {};
                                return (
                                    <div className="mb-2" key={index}>
                                        <label
                                            htmlFor={name}
                                            key={index}
                                            className="block mb-2 text-sm font-bold text-gray-700"
                                        >
                                            {label}
                                        </label>
                                        <Field
                                            type="text"
                                            name={name}
                                            key={index}
                                            component={component}
                                            rows={rows}
                                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        ></Field>
                                        <ErrorMessage name={name} key={index}>
                                            {(errorMessage) => <div className="text-red-500">{errorMessage}</div>}
                                        </ErrorMessage>
                                    </div>
                                );
                            })}
                            <div className="mb-2">
                                <label htmlFor="codeSnippet" className="block mb-2 text-sm font-bold text-gray-700">
                                    Favourite code snippet
                                </label>
                                <Field
                                    type="text"
                                    name="codeSnippet"
                                    component="textarea"
                                    rows={2}
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                ></Field>
                                <ErrorMessage name="codeSnippet">
                                    {(errorMessage) => <div className="text-red-500">{errorMessage}</div>}
                                </ErrorMessage>
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="codeSnippetLanguage"
                                    className="block mb-2 text-sm font-bold text-gray-700"
                                >
                                    Favourite code snippet, language, and description:
                                </label>
                                <Field
                                    name="codeSnippetLanguage"
                                    as="select"
                                    className="px-3 py-2 leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline"
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
                                    className="block mb-2 text-sm font-bold text-gray-700"
                                >
                                    Code Snippet Preview
                                </label>
                                <SyntaxHighlighter language={values.codeSnippetLanguage}>
                                    {values.codeSnippet}
                                </SyntaxHighlighter>
                            </div>
                            <label htmlFor="state" className="block mb-2 text-sm font-bold text-gray-700">
                                State (only published projects are visible)
                            </label>
                            <Field
                                name="state"
                                as="select"
                                className="px-3 py-2 leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline"
                                onClick={(e) => setFieldValue('state', e.target.value)}
                            >
                                <option value="Published" label="Published" />;
                                <option value="Draft" label="Draft" />;
                            </Field>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
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
