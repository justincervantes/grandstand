import React, { useState } from 'react';
import Loading from '../../components/loading';
import MarkdownEditor from '../../components/articles/MarkdownEditor/markdown-editor';
import EditingLayout from '../../components/layout';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useToast } from '../../context/ToastContext';

import * as yup from 'yup';
const Article = ({ article }) => {
    const { id, content: propContent, title, imageUrl, slug } = article;
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState(propContent);
    const { addToast } = useToast();
    const router = useRouter();

    const handleSubmit = async (values) => {
        try {
            await axios.post('/api/articles/updateArticle', {
                articleId: id,
                articleTitle: values.title,
                imageUrl: values.imageUrl,
                content,
                slug: values.slug,
            });
            addToast('Successfully updated article', 'Success');
            // router.reload();
            router.push('/blog');
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
            </div>
            <Formik
                initialValues={{ title: title, slug: slug, imageUrl: imageUrl }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema()}
            >
                <Form className="bg-gray-50 shadow-lg rounded px-1 md:px-8 py-2 my-4 max-w-3xl mx-auto">
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
            <div className="group flex relative">
                <a href="https://www.npmjs.com/package/marked" target="_blank" rel="noopener noreferrer">
                    <QuestionMarkCircleIcon className="inline h-7 w-7 mr-4" />
                </a>
                <span
                    className="group-hover:opacity-100 transition-opacity bg-gray-900 px-1 text-sm text-gray-100 rounded-md absolute start 
                    translate-x-1 -translate-y-12 opacity-0 m-4 mx-auto"
                >
                    Markdown Documentation
                </span>
                <span className="text-gray-700 text-sm font-bold mb-2">
                    Article Input - formatting powered by Markdown
                </span>
            </div>
            <div className="">
                <MarkdownEditor content={content} setContent={setContent} />
            </div>
        </EditingLayout>
    );
};
export default Article;

export async function getServerSideProps(context) {
    const articleId = context?.query?.articleId;
    if (!articleId) {
        return {
            redirect: {
                destination: '/blog',
            },
        };
    }
    const article = await prisma.article.findFirstOrThrow({
        where: {
            id: articleId,
        },
    });
    if (!article) {
        return {
            redirect: {
                destination: '/blog',
            },
        };
    }
    return {
        props: { article: JSON.parse(JSON.stringify(article)) },
    };
}
