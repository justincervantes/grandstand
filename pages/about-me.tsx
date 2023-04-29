import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { FormikValues, FormikHelpers } from 'formik/dist/types';

const AboutMe = () => {
    const handleSubmit = async (values, helpers) => {
        console.log('values', values);
        const result = await axios.post('/api/dashboard/getUserArticleActions', {});
        return Promise.resolve();
    };

    return (
        <div>
            <h1 className="mb-5">About Me</h1>
            <Formik initialValues={{}} onSubmit={handleSubmit}>
                <Form className="bg-gray-50 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                    <div>
                        <label htmlFor="userName" className="block text-gray-700 text-sm font-bold mb-2">
                            Name
                        </label>
                        <Field
                            type="text"
                            name="userName"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <Field
                            type="textarea"
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
                        <label htmlFor="githubUrl" className="block text-gray-700 text-sm font-bold mb-2">
                            GitHub
                        </label>
                        <Field
                            type="text"
                            name="githubUrl"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="linkedinUrl" className="block text-gray-700 text-sm font-bold mb-2">
                            LinkedIn
                        </label>
                        <Field
                            type="text"
                            name="linkedinUrl"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="twitterUrl" className="block text-gray-700 text-sm font-bold mb-2">
                            Twitter
                        </label>
                        <Field
                            type="text"
                            name="twitterUrl"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Instagram
                        </label>
                        <Field
                            type="text"
                            name="name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></Field>
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
            </Formik>
        </div>
    );
};

export default AboutMe;
