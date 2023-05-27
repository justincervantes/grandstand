import React, { useState } from 'react';
import Loading from '../../components/loading';
import MarkdownEditor from '../../components/articles/MarkdownEditor/markdown-editor';
import EditingLayout from '../../components/layout';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useToast } from '../../context/ToastContext';
import { invalidSlugs } from '../../lib/slugDictionary';
import * as yup from 'yup';
const Article = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('');
    const { addToast } = useToast();
    const router = useRouter();

    const handleSubmit = async (values) => {
        try {
            await axios.post('/api/articles/createNewArticle', { values, content });
            addToast('Successfully created article', 'Success');
            router.reload();
        } catch (error) {
            addToast(error?.response?.data?.errorMessage, 'Error');
        }
    };

    const validationSchema = () =>
        yup.object().shape({
            title: yup.string().trim().min(2, 'Must be greater than 2 chars').required('Please enter a title'),
            slug: yup
                .string()
                .trim()
                .min(2, 'Must be greater than 2 chars')
                .max(26, 'Cannot be more than 26 chars')
                .matches(/^[-, a-z]+$/, 'Slug may only contain lowercase letters and hyphens (-)')
                .required('Please enter a slug (url path) for the article'),
            imageUrl: yup.string().trim().url('Please provide a full http/https URL'),
        });

    const fields = [
        { label: 'Title', name: 'title' },
        { label: 'Article Slug (Path)', name: 'slug' },
        { label: 'Image URL', name: 'imageUrl' },
    ];
    if (isLoading) return <Loading />;
    return (
        <EditingLayout>
            <div className="flex whitespace-nowrap mb-3">
                <h1 className="font-medium text-xl pl-2">Blog</h1>
                <div className="group flex relative">
                    <a href="https://www.npmjs.com/package/marked" target="_blank" rel="noopener noreferrer">
                        <QuestionMarkCircleIcon className="h-7 w-7 ml-4" />
                    </a>
                    <span
                        className="group-hover:opacity-100 transition-opacity bg-gray-900 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
                -translate-x-1/2 -translate-y-12 opacity-0 m-4 mx-auto"
                    >
                        Markdown Documentation
                    </span>
                </div>
            </div>
            <Formik
                initialValues={{ title: '', slug: '', imageUrl: '' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema()}
            >
                <Form className="bg-gray-50 shadow-lg rounded px-8 py-2 my-4 max-w-3xl mx-auto">
                    <div>
                        {fields.map((field, index) => {
                            const { label, name } = field ?? {};
                            return (
                                <div className="mb-2" key={index}>
                                    <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
                                        {label}
                                    </label>
                                    <Field
                                        type="text"
                                        id={name}
                                        name={name}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    ></Field>
                                    <ErrorMessage name={name}>
                                        {(errorMessage) => <div className="text-red-500">{errorMessage}</div>}
                                    </ErrorMessage>
                                </div>
                            );
                        })}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="mt-2 px-4 py-2 rounded bg-black text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </Form>
            </Formik>
            <div className="">
                <MarkdownEditor content={content} setContent={setContent} />
            </div>
        </EditingLayout>
    );
};
export default Article;
