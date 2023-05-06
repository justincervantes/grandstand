import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { stringify } from 'querystring';

const AboutMe = () => {
    const handleSubmit = async (values, helpers) => {
        console.log('values', values);
        const result = await axios.post('/api/user-details/create-user-details', { values });
        return Promise.resolve();
    };

    const validationSchema = () =>
        yup.object().shape({
            userName: yup.string().trim().length(3, 'Must be greater than 3 chars').required('Please enter a name'),
        });

    const fields = [{ name: 'userName' }, { name: 'description', component: 'textarea', rows: 2 }];

    return (
        <div>
            <Formik initialValues={{ userName: '' }} onSubmit={handleSubmit} validationSchema={validationSchema()}>
                <Form className="bg-gray-50 shadow-lg rounded px-8 pt-6 pb-8 mb-4 max-w-3xl mx-auto">
                    <div className="mb-2">
                        <h1 className="font-medium text-xl pl-2 mb-2 text-center">About Me</h1>
                        {fields.map((field) => {
                            <>
                                <label htmlFor="userName" className="block text-gray-700 text-sm font-bold mb-2">
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    name="userName"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                ></Field>
                                <ErrorMessage name="userName">
                                    {(errorMessage) => <div className="text-red-500">{errorMessage}</div>}
                                </ErrorMessage>
                            </>;
                        })}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                            Description
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
                        <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">
                            Image Link
                        </label>
                        <Field
                            type="text"
                            name="imageUrl"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="profileGitHubUrl" className="block text-gray-700 text-sm font-bold mb-2">
                            GitHub
                        </label>
                        <Field
                            type="text"
                            name="profileGitHubUrl"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="profileLinkedInUrl" className="block text-gray-700 text-sm font-bold mb-2">
                            LinkedIn
                        </label>
                        <Field
                            type="text"
                            name="profileLinkedInUrl"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="mt-2 px-4 py-2 font-bold rounded bg-orange-400 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default AboutMe;
