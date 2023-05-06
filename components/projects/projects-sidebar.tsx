import Button from '../button';
import { useEffect, useState } from 'react';
const ProjectsSidebar = (props) => {
    const { userProjects } = props ?? {};
    const [projects, setProjects] = useState([userProjects]);
    return (
        <div className="min-h-[73vh] max-h-[73vh]">
            <div className="grid grid-flow-col grid-cols-2 p-1 h-full">
                <div className="col-span-2 border-l border-y rounded-tl-lg rounded-bl-lg flex flex-col overflow-y-auto h-[73vh] scrollbar-thin scrollbar-h-1.5 scrollbar-thumb-gray-200 scrollbar-thumb-rounded">
                    <div className="p-2">
                        <Button
                        // handleClick={() => setCreateProjectModalIsOpen(true)}
                        >
                            Create New Project
                        </Button>
                    </div>
                    {projects.map((project, index) => {
                        const { title, id: projectId } = project;
                        // const isActive = projectId === selectedProjectId;
                        return (
                            <div
                                key={`article-${index}`}
                                onClick={() => {
                                    // setSelectedArticleId(articleId);
                                    // setLocalStorageSelectedArticle(articleId);
                                }}
                                // className={`${isActive ? 'bg-orange-100 ' : ''}flex justify-between p-2`}
                            >
                                <div className="grid grow-cols-12">
                                    <div className="truncate ...">{title}</div>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        // onClick={() => deleteArticle(article)}
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
