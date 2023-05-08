import Button from '../button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '../../context/ToastContext';
import { get } from 'lodash';

const ProjectsSidebar = (props) => {
    const {
        projects = [],
        setProjectsSidebar,
        setUpdateExisting,
        setSelectedProjectId,
        setTitle,
        setDescription,
        setImageUrl,
        setApplicationUrl,
        setGitHubUrl,
        setMostProudOf,
        setMostInteresting,
        setMostUnique,
        setWhyBuilt,
        setCodeSnippet,
        setTechStack,
    } = props ?? {};
    const { addToast } = useToast();

    const loadProject = async (projectId) => {
        setSelectedProjectId(projectId);
        setUpdateExisting(true);
        await axios
            .post('/api/projects/getProject', { projectId })
            .then((response) => {
                setTitle(response.data.project.title);
                setDescription(response.data.project.description);
                setImageUrl(response.data.project.imageUrl);
                setApplicationUrl(response.data.project.applicationUrl);
                setGitHubUrl(response.data.project.gitHubUrl);
                setMostProudOf(response.data.project.mostProudOf);
                setMostInteresting(response.data.project.mostInteresting);
                setMostUnique(response.data.project.mostUnique);
                setWhyBuilt(response.data.project.whyBuilt);
                setCodeSnippet(response.data.project.codeSnippet);
                setTechStack(response.data.project.techStack);
            })
            .catch((error) => {
                const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                addToast(errorMessage, 'Error');
            });
    };

    const deleteProject = async (projectId) => {
        await axios
            .post('/api/projects/deleteProject', { projectId })
            .then((response) => {
                addToast('Successfully deleted project', 'Success');
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
    };

    return (
        <div className="min-h-[73vh] max-h-[73vh]">
            <div className="grid grid-flow-col grid-cols-2 p-1 h-full">
                <div className="col-span-2 border rounded-lg flex flex-col overflow-y-auto h-[73vh] scrollbar-thin scrollbar-h-1.5 scrollbar-thumb-gray-200 scrollbar-thumb-rounded">
                    <div className="p-2">
                        <Button handleClick={() => setUpdateExisting(false)}>Create New Project</Button>
                    </div>
                    {projects.map((project, index) => {
                        const { title, id: projectId } = project;
                        // const isActive = projectId === selectedProjectId;
                        return (
                            <div
                                key={`article-${index}`}
                                onClick={() => {
                                    setUpdateExisting(true);
                                    setSelectedProjectId(projectId);
                                    loadProject(projectId);
                                }}
                                className=" border rounded-lg m-1 text-center"
                                // {`${isActive ? 'bg-orange-100 ' : ''}flex justify-between p-2`}
                            >
                                <div className="grid grow-cols-2">
                                    <div className="px-1 truncate ...">{title}</div>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => deleteProject(projectId)}
                                        className="rounded hover:bg-red-600 hover:text-white px-1 h-fit"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProjectsSidebar;
