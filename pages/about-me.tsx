import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import axios from 'axios';
import * as yup from 'yup';
import { useToast } from '../context/ToastContext';
import { getSession } from 'next-auth/react';
import EditingLayout from '../components/layout';

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
                    const invalidSlugs = [
                        'admin',
                        'null',
                        'god',
                        'spotlight',
                        'home',
                        'about-me',
                        'blog',
                        'projects',
                        'project',
                        'blogs',
                        'aboutme',
                    ];
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
                .url('Please provide a full http/https URL')
                .required('Please enter a link to your GitHub page'),
            linkedInUrl: yup
                .string()
                .trim()
                .url('Please provide a full http/https URL')
                .required('Please enter a link to your LinkedIn page'),
        });

    const fields = [
        { label: 'Display Name', name: 'userName' },
        { label: 'Spotlight Slug (Path)', name: 'slug' },
        { label: 'Description', name: 'description', component: 'textarea', rows: 2 },
        { label: 'Image URL', name: 'imageUrl' },
        { label: 'GitHub URL', name: 'gitHubUrl' },
        { label: 'LinkedIn URL', name: 'linkedInUrl' },
    ];

    return (
        <EditingLayout>
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
                <Form className="bg-gray-50 shadow-lg rounded px-8 pt-6 pb-8 mb-4 max-w-3xl mx-auto">
                    <div>
                        <h1 className="font-medium text-xl pl-2 mb-2 text-center">About Me</h1>
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
