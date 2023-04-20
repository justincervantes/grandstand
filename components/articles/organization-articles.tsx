import { useEffect, useState } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import moment from 'moment';
import CreateArticleModal from './create-article-modal';
import ArticleEditor from './article-editor';
import Loading from '../loading';
import Button from '../button';
import { localStorageKeys, setLocalStorageSelectedArticle } from '../../lib/localStorageKeys';
import { useToast } from '../../context/ToastContext';

const OrganizationArticles = (props) => {
    const { userArticles } = props ?? {};

    const [articles, setArticles] = useState([userArticles]);
    const [selectedArticleId, setSelectedArticleId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [createArticleModalIsOpen, setCreateArticleModalIsOpen] = useState(false);
    const [newArticleTitle, setNewArticleTitle] = useState('');
    const { addToast } = useToast();

    const updateArticles = (updatedArticleId, content, title) => {
        const articlesCopy = articles;
        let updatedArticle = articlesCopy.find(({ id }) => id === updatedArticleId);
        updatedArticle.content = content;
        updatedArticle.title = title;
        setArticles(articlesCopy);
    };

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            await axios
                .post('/api/blog/getArticles', {})
                .then((response) => setArticles(response.data.article))
                .catch((error) => {
                    const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                    addToast(errorMessage, 'Error');
                });
            setIsLoading(false);
        };
        fetchArticles();
    }, []);

    useEffect(() => {
        const articleStorage = JSON.parse(localStorage.getItem(localStorageKeys.articlesSelectedArticle) || 'null');
        if (articleStorage) {
            setSelectedArticleId(articleStorage);
        }
    }, []);

    const createArticle = async () => {
        if (newArticleTitle.trim().length < 3) {
            addToast('Article title must be at least 3 characters.', 'Error');
            return;
        }
        setIsLoading(true);
        await axios
            .post('/api/blog/createArticle', {
                articleTitle: newArticleTitle,
            })
            .then((response) => {
                setLocalStorageSelectedArticle(response.data.article.id);
                addToast('Successfully created article', 'Success');
            })
            .catch((error) => {
                const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                addToast(errorMessage, 'Error');
            });
        await axios
            .post('/api/blog/getArticles', {})
            .then((response) => setArticles(response.data.article))
            .catch((error) => {
                const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                addToast(errorMessage, 'Error');
            });
        setIsLoading(false);
    };

    const deleteArticle = async ({ id: articleId }) => {
        setIsLoading(true);
        await axios
            .post('/api/blog/deleteArticle', {
                articleId,
            })
            .then(() => {
                addToast('Successfully deleted article', 'Success');
            })
            .catch((error) => {
                const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                addToast(errorMessage, 'Error');
            });
        await axios
            .post('/api/blog/getArticles', {})
            .then((response) => setArticles(response.data.article))
            .catch((error) => {
                const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                addToast(errorMessage, 'Error');
            });
        setIsLoading(false);
    };

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-[73vh] max-h-[73vh]">
            <CreateArticleModal
                isOpen={createArticleModalIsOpen}
                onOK={() => {
                    createArticle();
                    setCreateArticleModalIsOpen(false);
                }}
                onCancel={() => setCreateArticleModalIsOpen(false)}
                setArticleTitle={setNewArticleTitle}
            />
            <div className="grid grid-flow-col grid-cols-12 p-1 h-full">
                <div className="col-span-2 border-l border-y rounded-tl-lg rounded-bl-lg flex flex-col overflow-y-auto h-[73vh] scrollbar-thin scrollbar-h-1.5 scrollbar-thumb-gray-200 scrollbar-thumb-rounded">
                    <div className="p-2">
                        <Button handleClick={() => setCreateArticleModalIsOpen(true)}>Create Article</Button>
                    </div>

                    {articles.map((article, index) => {
                        const { title, id: articleId, createdAt } = article;
                        const isActive = articleId === selectedArticleId;
                        return (
                            <div
                                key={`article-${index}`}
                                onClick={() => {
                                    setSelectedArticleId(articleId);
                                    setLocalStorageSelectedArticle(articleId);
                                }}
                                className={`${isActive ? 'bg-orange-100 ' : ''}flex justify-between p-2`}
                            >
                                <div className="grid grow-cols-12">
                                    <div className="truncate ...">{title}</div>
                                    <p className="text-sm">{moment.utc(createdAt).format('L')}</p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => deleteArticle(article)}
                                        className="rounded hover:bg-red-600 hover:text-white px-1 h-fit"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="col-span-10 border w-full min-h-[73vh] max-h-[73h] grid">
                    {selectedArticleId && (
                        <ArticleEditor
                            article={articles.find(({ id }) => id === selectedArticleId)}
                            updateStateArticles={updateArticles}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrganizationArticles;
