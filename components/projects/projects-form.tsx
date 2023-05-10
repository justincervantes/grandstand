import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as yup from 'yup';

const ProjectsForm = (props) => {
    const {
        handleSubmit,
        setUpdateExisting,
        updateExisting,
        clearFormStateValues,
        title,
        description,
        imageUrl,
        applicationUrl,
        gitHubUrl,
        mostProudOf,
        mostInteresting,
        mostUnique,
        whyBuilt,
        codeSnippet,
        techStack,
    } = props;

    const validationSchema = () =>
        yup.object().shape({
            title: yup.string().trim().min(2, 'Must be greater than 2 chars').required('Please enter a title'),
            description: yup
                .string()
                .trim()
                .min(5, 'Must be greater than 5 characters')
                .required('Please enter a description about your project'),
            imageUrl: yup.string().trim().url('Please provide a full http/https URL'),
            applicationUrl: yup.string().trim().url('Please provide a full http/https URL'),
            gitHubUrl: yup.string().trim().url('Please provide a full http/https URL'),
            mostProudOf: yup.string().trim().min(5, 'Must be greater than 5 characters'),
            mostInteresting: yup.string().trim().min(5, 'Must be greater than 5 characters'),
            mostUnique: yup.string().trim().min(5, 'Must be greater than 5 characters'),
            whyBuilt: yup.string().trim().min(5, 'Must be greater than 5 characters'),
            codeSnippet: yup.string().trim().min(5, 'Must be greater than 5 characters'),
            techStack: yup.string().trim().min(5, 'Must be greater than 5 characters'),
        });
    const fields = [
        { label: 'Title', name: 'title' },
        { label: 'Description', name: 'description', component: 'textarea', rows: 2 },
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
        {
            label: 'Favourite code snippet, language, and description:',
            name: 'codeSnippet',
            component: 'textarea',
            rows: 2,
        },
        { label: 'Project Tech Stack:', name: 'techStack' },
    ];

    return (
        <Formik
            initialValues={{
                title,
                description,
                imageUrl,
                applicationUrl,
                gitHubUrl,
                mostProudOf,
                mostInteresting,
                mostUnique,
                whyBuilt,
                codeSnippet,
                techStack,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema()}
            enableReinitialize
        >
            {({ setFieldValue, resetForm }) => {
                return (
                    <Form className="bg-gray-50 shadow-lg rounded px-8 pt-6 pb-8 mb-4 mx-auto md:max-w-lg md:ml-[calc(202px+((100vw-666px)/2))] lg:w-[32rem] lg:ml-[calc(202px+((100vw-730px)/2))]">
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
