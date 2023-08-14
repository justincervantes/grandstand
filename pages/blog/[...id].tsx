import React, { useState } from 'react';
import EditingLayout from '../../components/layout';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useToast } from '../../context/ToastContext';
import * as yup from 'yup';
import { getSession } from 'next-auth/react';
import ArticlePreviewModal from '../../components/articles/preview-modal';
import { prisma } from '../../lib/prismadb';
import FailedSubmissionToast from '../../components/failedSubmissionToast';

const Article = ({ article, user }) => {
    const { id: articleId } = article;
    const { slug: userSlug, articles, projects, views } = user ?? {};
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
                .matches(
                    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                    'Only lowercase letters and numbers allowed, spaces should be replaced with hyphens',
                )
                .min(2, 'Must be greater than 2 characters')
                .required('Please enter a slug'),
            imageUrl: yup.string().trim().url('Please provide a full http/https URL').required('An image is required.'),
            content: yup
                .string()
                .trim()
                .min(5, 'Must be greater than 5 chars')
                .required('Please enter content (at least 5 chars)'),
            state: yup.string().required('A state is required.'),
        });

    const fields = [
        { label: 'Title *', name: 'title' },
        { label: `Article Slug (Path - grandstand.dev/${userSlug ?? '[userSlug]'}/blog/[slug]) *`, name: 'slug' },
        { label: 'Image URL *', name: 'imageUrl' },
        {
            label: (
                <div className="flex justify-between">
                    <div>Content (markdown enabled) *</div>
                    <div className="flex">
                        <div className="relative flex mr-3 group" onClick={() => setIsOpen(true)}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1185/1185279.png"
                                className="w-6 h-6 cursor-pointer"
                            />

                            <span className="absolute px-1 m-4 mx-auto text-sm text-gray-100 transition-opacity -translate-x-5 -translate-y-10 bg-gray-900 rounded-md opacity-0 group-hover:opacity-100">
                                Preview
                            </span>
                        </div>
                        <div className="relative flex group">
                            <a
                                href="https://www.markdownguide.org/basic-syntax/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/8988/8988962.png"
                                    className="w-6 h-6"
                                />
                            </a>
                            <span className="absolute px-1 m-4 mx-auto text-sm text-gray-100 transition-opacity -translate-x-20 translate-y-3 bg-gray-900 rounded-md opacity-0 group-hover:opacity-100">
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
        <EditingLayout
            userSlug={userSlug}
            articleCount={articles?.length ?? 0}
            projectCount={projects?.length ?? 0}
            views={views}
        >
            <Formik initialValues={article} onSubmit={handleSubmit} validationSchema={validationSchema()}>
                {({ setFieldValue, values }) => {
                    return (
                        <Form className="max-w-3xl px-1 py-2 mx-auto my-4 rounded shadow-lg md:px-8 bg-gray-50">
                            <h1 className="pl-2 mb-2 text-xl font-medium text-center">Article Entry Form</h1>
                            <div>
                                {fields.map((field, index) => {
                                    const { label, name, component, rows } = field ?? {};
                                    return (
                                        <div className="mb-2" key={index}>
                                            <label
                                                htmlFor={name}
                                                className="block mb-2 text-sm font-bold text-gray-700"
                                            >
                                                {label}
                                            </label>
                                            <Field
                                                type="text"
                                                id={name}
                                                name={name}
                                                component={component}
                                                rows={rows}
                                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            ></Field>
                                            <ErrorMessage name={name}>
                                                {(errorMessage) => <div className="text-red-500">{errorMessage}</div>}
                                            </ErrorMessage>
                                        </div>
                                    );
                                })}
                                <label htmlFor="state" className="block mb-2 text-sm font-bold text-gray-700">
                                    State (only published projects are visible) *
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
                                        className="px-4 py-2 mt-2 text-base font-medium text-white bg-black rounded shadow-sm hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                            <ArticlePreviewModal content={values.content} isOpen={isOpen} setIsOpen={setIsOpen} />
                            <FailedSubmissionToast />
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
        include: {
            articles: { where: { deletedAt: null } },
            projects: { where: { deletedAt: null } },
        },
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
        props: { user: JSON.parse(JSON.stringify(user)), article },
    };
}
