import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import { get } from 'lodash';
import { getSession } from 'next-auth/react';
import { useToast } from '../context/ToastContext';
import React, { useEffect, useState } from 'react';
import ProjectsSidebar from '../components/projects/projects-sidebar';
import ProjectsForm from '../components/projects/projects-form';

const Projects = (props) => {
    const { projectsProp = [] } = props;
    const [projects, setProjectsSidebar] = useState(projectsProp);
    const [updateExisting, setUpdateExisting] = useState(false);
    const { addToast } = useToast();
    const [selectedProjectId, setSelectedProjectId] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [applicationUrl, setApplicationUrl] = useState('');
    const [gitHubUrl, setGitHubUrl] = useState('');
    const [mostProudOf, setMostProudOf] = useState('');
    const [mostInteresting, setMostInteresting] = useState('');
    const [mostUnique, setMostUnique] = useState('');
    const [whyBuilt, setWhyBuilt] = useState('');
    const [codeSnippet, setCodeSnippet] = useState('');
    const [techStack, setTechStack] = useState('');

    const clearFormStateValues = () => {
        setSelectedProjectId(null);
        setTitle('');
        setDescription('');
        setImageUrl('');
        setApplicationUrl('');
        setGitHubUrl('');
        setMostProudOf('');
        setMostInteresting('');
        setMostUnique('');
        setWhyBuilt('');
        setCodeSnippet('');
        setTechStack('');
    };

    const handleSubmit = async (values, actions) => {
        let projectId = selectedProjectId;
        if (!updateExisting) {
            await axios
                .post('/api/projects/createProject', values)
                .then((response) => {
                    addToast('Successfully created project', 'Success');
                })
                .catch((error) => {
                    const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                    addToast(errorMessage, 'Error');
                });
            await axios
                .post('/api/projects/getProjects', {})
                .then((response) => setProjectsSidebar(response.data.projects))
                .catch((error) => {
                    const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                    addToast(errorMessage, 'Error');
                });
            actions.resetForm();
        } else {
            await axios
                .post('/api/projects/updateProject', { projectId, values })
                .then((response) => {
                    addToast('Successfully created project', 'Success');
                })
                .catch((error) => {
                    const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                    addToast(errorMessage, 'Error');
                });
            await axios
                .post('/api/projects/getProjects', {})
                .then((response) => setProjectsSidebar(response.data.projects))
                .catch((error) => {
                    const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                    addToast(errorMessage, 'Error');
                });
            actions.resetForm();
        }
    };

    return (
        <div className="md:flex md:justify-between md:whitespace-nowrap">
            <ProjectsSidebar
                projects={projects}
                selectedProjectId={selectedProjectId}
                setProjectsSidebar={setProjectsSidebar}
                setUpdateExisting={setUpdateExisting}
                setSelectedProjectId={setSelectedProjectId}
                clearFormStateValues={clearFormStateValues}
                setTitle={setTitle}
                setDescription={setDescription}
                setImageUrl={setImageUrl}
                setApplicationUrl={setApplicationUrl}
                setGitHubUrl={setGitHubUrl}
                setMostProudOf={setMostProudOf}
                setMostInteresting={setMostInteresting}
                setMostUnique={setMostUnique}
                setWhyBuilt={setWhyBuilt}
                setCodeSnippet={setCodeSnippet}
                setTechStack={setTechStack}
            />
            <ProjectsForm
                handleSubmit={handleSubmit}
                setUpdateExisting={setUpdateExisting}
                updateExisting={updateExisting}
                setSelectedProjectId={setSelectedProjectId}
                clearFormStateValues={clearFormStateValues}
                title={title}
                description={description}
                imageUrl={imageUrl}
                applicationUrl={applicationUrl}
                gitHubUrl={gitHubUrl}
                mostProudOf={mostProudOf}
                mostInteresting={mostInteresting}
                mostUnique={mostUnique}
                whyBuilt={whyBuilt}
                codeSnippet={codeSnippet}
                techStack={techStack}
            />
        </div>
    );
};

export default Projects;

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

    const userProjects = await prisma.user.findFirstOrThrow({
        where: {
            email: currentUserEmail,
        },
        select: {
            projects: {
                where: {
                    deletedAt: null,
                },
            },
        },
    });
    const { projects: projectsProp } = userProjects;
    return {
        props: { projectsProp: JSON.parse(JSON.stringify(projectsProp)) },
    };
}
