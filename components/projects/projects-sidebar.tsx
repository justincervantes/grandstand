import axios from 'axios';
import { useToast } from '../../context/ToastContext';
import { get } from 'lodash';

const ProjectsSidebar = (props) => {
    const {
        projects = [],
        selectedProjectId,
        setProjectsSidebar,
        setUpdateExisting,
        setSelectedProjectId,
        clearFormStateValues,
        setTitle,
        setDescription,
        setDateRange,
        setImageUrl,
        setApplicationUrl,
        setGitHubUrl,
        setMostProudOf,
        setMostInteresting,
        setMostUnique,
        setWhyBuilt,
        setTechStack,
        setCodeSnippet,
        setCodeSnippetLanguage,
    } = props ?? {};
    const { addToast } = useToast();

    const loadProject = async (projectId) => {
        clearFormStateValues();
        setSelectedProjectId(projectId);
        setUpdateExisting(true);
        await axios
            .post('/api/projects/getProject', { projectId })
            .then((response) => {
                setTitle(response.data.project.title);
                setDescription(response.data.project.description);
                setDateRange(response.data.project.dateRange);
                setImageUrl(response.data.project.imageUrl);
                setApplicationUrl(response.data.project.applicationUrl);
                setGitHubUrl(response.data.project.gitHubUrl);
                setMostProudOf(response.data.project.mostProudOf);
                setMostInteresting(response.data.project.mostInteresting);
                setMostUnique(response.data.project.mostUnique);
                setWhyBuilt(response.data.project.whyBuilt);
                setTechStack(response.data.project.techStack);
                setCodeSnippet(response.data.project.codeSnippet);
                setCodeSnippetLanguage(response.data.project.codeSnippetLanguage);
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
                setUpdateExisting(false);
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
        clearFormStateValues();
    };

    return (
        <div className="md:fixed">
            <div className="grid grid-flow-col grid-cols-2 p-1 h-full">
                <div className="col-span-2 border rounded-lg flex flex-col overflow-y-auto max-w-md	md:w-[182px] h-fit mx-auto md:mx-0 md:h-[calc(100vh-138px)] scrollbar-thin scrollbar-h-1.5 scrollbar-thumb-gray-200 scrollbar-thumb-rounded">
                    <p className="text-center font-medium text-m">Uploaded Projects</p>
                    <p className="text-center font-medium text-m">Select to Edit</p>
                    <p className="text-center md:hidden">Project Entry Form Below</p>
                    {projects.map((project, index) => {
                        const { title, id: projectId } = project;
                        const isActive = projectId === selectedProjectId;
                        return (
                            <div
                                key={`article-${index}`}
                                onClick={() => {
                                    setUpdateExisting(true);
                                    setSelectedProjectId(projectId);
                                    loadProject(projectId);
                                }}
                                className={`${
                                    isActive ? 'bg-slate-200 ' : ''
                                } border rounded-lg m-1 text-center flex justify-between p-2`}
                            >
                                <div className="grid grow-cols-2">
                                    <div className="px-1 truncate ...">{title}</div>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Delete Project?')) {
                                                deleteProject(projectId);
                                            }
                                        }}
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
