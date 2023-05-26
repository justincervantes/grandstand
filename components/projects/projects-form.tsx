import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

const ProjectsForm = (props) => {
    const {
        handleSubmit,
        setUpdateExisting,
        updateExisting,
        clearFormStateValues,
        title,
        description,
        dateRange,
        imageUrl,
        applicationUrl,
        gitHubUrl,
        mostProudOf,
        mostInteresting,
        mostUnique,
        whyBuilt,
        techStack,
        codeSnippet,
        codeSnippetLanguage,
        codeSnippetPreview,
        setCodeSnippetPreview,
    } = props;

    useEffect(() => {
        setCodeSnippetPreview(codeSnippet);
    }, [codeSnippet]);

    const onCodeSnippetChange = (e) => {
        setCodeSnippetPreview(e.target.value);
    };

    const [codeSnippetPreviewLanguage, setCodeSnippetPreviewLanguage] = useState('');

    useEffect(() => {
        setCodeSnippetPreviewLanguage(codeSnippetLanguage);
    }, [codeSnippetLanguage]);

    const onSnippetLanguageClick = (e) => {
        setCodeSnippetPreviewLanguage(e.currentTarget.value);
    };

    const validationSchema = () =>
        yup.object().shape({
            title: yup.string().trim().min(2, 'Must be greater than 2 chars').required('Please enter a title'),
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
        });
    const fields = [
        { label: 'Title', name: 'title' },
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
    const selectOptions = [
        { value: '', label: 'Select a language' },
        { value: 'c', label: 'C' },
        { value: 'cLike', label: 'CLike' },
        { value: 'css', label: 'CSS' },
        { value: 'go', label: 'Go' },
        { value: 'html', label: 'HTML' },
        { value: 'java', label: 'Java' },
        { value: 'javascript', label: 'Javascript' },
        { value: 'kotlin', label: 'Kotlin' },
        { value: 'matlab', label: 'MatLab' },
        { value: 'other', label: 'Other' },
        { value: 'perl', label: 'Perl' },
        { value: 'php', label: 'PHP' },
        { value: 'python', label: 'Python' },
        { value: 'r', label: 'R' },
        { value: 'ruby', label: 'Ruby' },
        { value: 'rust', label: 'Rust' },
        { value: 'sql', label: 'SQL' },
        { value: 'swift', label: 'Swift' },
    ];

    return (
        <Formik
            initialValues={{
                title,
                description,
                dateRange,
                imageUrl,
                applicationUrl,
                gitHubUrl,
                mostProudOf,
                mostInteresting,
                mostUnique,
                whyBuilt,
                techStack,
                codeSnippet,
                codeSnippetLanguage,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema()}
            enableReinitialize
        >
            {({ setFieldValue, resetForm }) => {
                return (
                    <Form className="bg-gray-50 shadow-lg rounded px-8 pt-6 pb-8 mb-4 mx-auto md:w-[28rem] md:ml-[calc(202px+((100vw-696px)/2))] lg:w-[32rem] lg:ml-[calc(202px+((100vw-730px)/2))]">
                        <h1 className="font-medium text-xl pl-2 mb-2 text-center">Project Entry Form</h1>
                        {updateExisting && <p className="text-center font-medium text-m">Editing Existing Project</p>}
                        {!updateExisting && <p className="text-center font-medium text-m">Creating New Project</p>}
                        <div className="flex justify-center">
                            {updateExisting && (
                                <button
                                    className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50 text-gray-700 shadow-sm justify-center items-center border-gray-300 bg-white"
                                    type="reset"
                                    onClick={() => {
                                        setUpdateExisting(false);
                                        clearFormStateValues();
                                        resetForm();
                                    }}
                                >
                                    Create New Project
                                </button>
                            )}
                            {!updateExisting && (
                                <button
                                    className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50 text-gray-700 shadow-sm justify-center items-center border-gray-300 bg-white"
                                    type="reset"
                                    onClick={() => {
                                        setUpdateExisting(false);
                                    }}
                                >
                                    Reset Form
                                </button>
                            )}
                        </div>
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
                                Favourite code snippet, language, and description:
                            </label>
                            <Field
                                type="text"
                                name="codeSnippet"
                                component="textarea"
                                rows={2}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onKeyUp={onCodeSnippetChange}
                            ></Field>
                            <ErrorMessage name="codeSnippet">
                                {(errorMessage) => <div className="text-red-500">{errorMessage}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="codeSnippetLanguage" className="block text-gray-700 text-sm font-bold mb-2">
                                Favourite code snippet, language, and description:
                            </label>
                            <Field
                                name="codeSnippetLanguage"
                                as="select"
                                className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onClick={onSnippetLanguageClick}
                            >
                                {selectOptions.map((option, index) => {
                                    return <option value={option.value} label={option.label} key={index} />;
                                })}
                            </Field>
                            <ErrorMessage name="codeSnippetLanguage">
                                {(errorMessage) => <div className="text-red-500">{errorMessage}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="codeSnippetPreview" className="block text-gray-700 text-sm font-bold mb-2">
                                Code Snippet Preview
                            </label>
                            <SyntaxHighlighter language={codeSnippetPreviewLanguage}>
                                {codeSnippetPreview}
                            </SyntaxHighlighter>
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
                );
            }}
        </Formik>
    );
};

export default ProjectsForm;
