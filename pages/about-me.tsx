import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import axios from 'axios';
import * as yup from 'yup';
import { useToast } from '../context/ToastContext';
import { getSession } from 'next-auth/react';
import EditingLayout from '../components/layout';
import { invalidSlugs } from '../lib/slugDictionary';
import { prisma } from '../lib/prismadb';
import FailedSubmissionToast from '../components/failedSubmissionToast';

const AboutMe = ({ user }) => {
    const { name, slug, description, image, gitHubUrl, linkedInUrl } = user ?? {};
    const { addToast } = useToast();
    const router = useRouter();

    const handleSubmit = async (values) => {
        try {
            await axios.post('/api/users/updateUser', { values });
            addToast('Successfully updated details', 'Success');
            router.reload();
        } catch (error) {
            addToast(error?.response?.data?.errorMessage, 'Error');
        }
    };

    const validationSchema = () =>
        yup.object().shape({
            userName: yup.string().trim().min(2, 'Must be greater than 2 chars').required('Please enter a name'),
            slug: yup
                .string()
                .trim()
                .min(2, 'Must be greater than 2 chars')
                .max(26, 'Cannot be more than 26 chars')
                .required('Please enter a name')
                .matches(/^[-, A-Za-z0-9]+$/, 'Slug cannot use any special characters other than the hyphen (-)')
                .test('invalidSlugs', 'Invalid Slug Name', function (slug) {
                    return !invalidSlugs.includes(slug.trim().toLowerCase());
                }),
            description: yup
                .string()
                .trim()
                .min(5, 'Must be greater than 5 characters')
                .required('Please enter a description about yourself'),
            imageUrl: yup
                .string()
                .trim()
                .url('Please provide a full http/https URL')
                .required('Please enter an image link for profile picture'),
            gitHubUrl: yup
                .string()
                .trim()
                .matches(
                    /^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$/i,
                    'Invalid GitHub user URL',
                ),
            linkedInUrl: yup
                .string()
                .trim()
                .matches(/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/, 'Invalid LinkedIn user URL'),
        });

    const fields = [
        { label: 'Display Name *', name: 'userName' },
        { label: 'Grandstand User Slug (Path - grandstand.dev/[slug]) *', name: 'slug' },
        { label: 'Description *', name: 'description', component: 'textarea', rows: 2 },
        { label: 'Image URL *', name: 'imageUrl' },
        { label: 'GitHub URL', name: 'gitHubUrl' },
        { label: 'LinkedIn URL', name: 'linkedInUrl' },
    ];

    return (
        <EditingLayout userSlug={slug}>
            <Formik
                initialValues={{
                    userName: name,
                    slug: slug || '',
                    description: description || '',
                    imageUrl: image || '',
                    gitHubUrl: gitHubUrl || '',
                    linkedInUrl: linkedInUrl || '',
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema()}
            >
                <Form className="max-w-3xl px-8 pt-6 pb-8 mx-auto mb-4 rounded shadow-lg bg-gray-50">
                    <div>
                        <h1 className="pl-2 mb-2 text-xl font-medium text-center">About Me</h1>
                        {fields.map((field, index) => {
                            const { label, name, component, rows } = field ?? {};
                            return (
                                <div className="mb-2" key={index}>
                                    <label htmlFor={name} className="block mb-2 text-sm font-bold text-gray-700">
                                        {label}
                                    </label>
                                    <Field
                                        type="text"
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
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 mt-2 text-base font-medium text-white bg-black rounded shadow-sm hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <FailedSubmissionToast />
                </Form>
            </Formik>
        </EditingLayout>
    );
};

export default AboutMe;

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
    const user = await prisma.user.findFirstOrThrow({
        where: {
            email: currentUserEmail,
        },
    });
    return {
        props: { user: JSON.parse(JSON.stringify(user)) },
    };
}
