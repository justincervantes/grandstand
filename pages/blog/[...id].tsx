import React, { useState } from 'react';
import EditingLayout from '../../components/layout';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useToast } from '../../context/ToastContext';

import * as yup from 'yup';
import { getSession } from 'next-auth/react';
import ArticlePreviewModal from '../../components/articles/preview-modal';
const Article = ({ article }) => {
    const { id: articleId } = article;
    const [isOpen, setIsOpen] = useState(false);
    const { addToast } = useToast();
    const router = useRouter();

    const handleSubmit = async (values) => {
        try {
            await axios.post('/api/articles/updateArticle', {
                articleId,
                ...values,
            });
            addToast('Successfully updated article', 'Success');
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
                .matches(
                    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                    'Only lowercase letters and numbers allowed, spaces should be replaced with hyphens',
                )
                .min(2, 'Must be greater than 2 characters')
                .required('Please enter a slug'),
            imageUrl: yup.string().trim().url('Please provide a full http/https URL'),
        });

    const fields = [
        { label: 'Title', name: 'title' },
        { label: 'Article Slug (Path)', name: 'slug' },
        { label: 'Image URL', name: 'imageUrl' },
        {
            label: (
                <div className="flex justify-between">
                    <div>Content (markdown enabled)</div>
                    <div className="flex">
                        <div className="group flex relative mr-2" onClick={() => setIsOpen(true)}>
                            <img src="https://cdn-icons-png.flaticon.com/512/1185/1185279.png" className="h-4 w-4" />

                            <span
                                className="group-hover:opacity-100 transition-opacity bg-gray-900 px-1 text-sm text-gray-100 rounded-md absolute  
                    -translate-x-5 opacity-0 m-4 mx-auto"
                            >
                                Preview
                            </span>
                        </div>
                        <div className="group flex relative">
                            <a
                                href="https://www.markdownguide.org/basic-syntax/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/8988/8988962.png"
                                    className="h-4 w-4"
                                />
                            </a>
                            <span
                                className="group-hover:opacity-100 transition-opacity bg-gray-900 px-1 text-sm text-gray-100 rounded-md absolute  
                    -translate-x-20 opacity-0 m-4 mx-auto"
                            >
                                Markdown Documentation
                            </span>
                        </div>
                    </div>
                </div>
            ),
            name: 'content',
            component: 'textarea',
            rows: 15,
        },
    ];

    return (
        <EditingLayout>
            <Formik initialValues={article} onSubmit={handleSubmit} validationSchema={validationSchema()}>
                {({ values }) => {
                    return (
                        <Form className="bg-gray-50 shadow-lg rounded px-1 md:px-8 py-2 my-4 max-w-3xl mx-auto">
                            <h1 className="font-medium text-xl pl-2 mb-2 text-center">Article Entry Form</h1>
                            <div>
                                {fields.map((field, index) => {
                                    const { label, name, component, rows } = field ?? {};
                                    return (
                                        <div className="mb-2" key={index}>
                                            <label
                                                htmlFor={name}
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                            >
                                                {label}
                                            </label>
                                            <Field
                                                type="text"
                                                id={name}
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
                                <div className="flex justify-end mb-3">
                                    <button
                                        type="submit"
                                        className="mt-2 px-4 py-2 rounded bg-black text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                            <ArticlePreviewModal content={values.content} isOpen={isOpen} setIsOpen={setIsOpen} />
                        </Form>
                    );
                }}
            </Formik>
        </EditingLayout>
    );
};
export default Article;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const articleId = context?.query?.id;

    if (!session) {
        return {
            redirect: {
                destination: '/home',
            },
        };
    }

    const currentUserEmail = session.user.email;
    const user = await prisma.user.findFirstOrThrow({
        where: { email: currentUserEmail },
    });

    const article = await prisma.article.findFirst({
        where: {
            id: articleId.toString(),
            userId: user.id,
        },
    });
    if (!article) {
        return {
            redirect: {
                destination: '/404',
            },
        };
    }
    return {
        props: { article: JSON.parse(JSON.stringify(article)) },
    };
}
