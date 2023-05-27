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
import { ArticleState } from '@prisma/client';
import { useRouter } from 'next/router';
const Articles = (props) => {
    const { userArticles } = props ?? {};
    const router = useRouter();
    const [articles, setArticles] = useState([userArticles]);
    const [selectedArticleId, setSelectedArticleId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [createArticleModalIsOpen, setCreateArticleModalIsOpen] = useState(false);
    const [newArticleTitle, setNewArticleTitle] = useState('');
    const { addToast } = useToast();
    const responsiveTextSize = 'lg:text-lg sm:text-base text-sm';

    const updateArticles = (updatedArticleId, content, title, image, slug) => {
        const articlesCopy = articles;
        let updatedArticle = articlesCopy.find(({ id }) => id === updatedArticleId);
        updatedArticle.content = content;
        updatedArticle.title = title;
        updatedArticle.imageUrl = image;
        updatedArticle.slug = slug;
        setArticles(articlesCopy);
    };

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            await axios
                .post('/api/articles/getArticles', {})
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
            .post('/api/articles/createArticle', {
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
            .post('/api/articles/getArticles', {})
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
            .post('/api/articles/deleteArticle', {
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
            .post('/api/articles/getArticles', {})
            .then((response) => setArticles(response.data.article))
            .catch((error) => {
                const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                addToast(errorMessage, 'Error');
            });
        setIsLoading(false);
    };
    const setArticleState = async (articleId: string, articleState: ArticleState) => {
        setIsLoading(true);
        await axios
            .post('/api/articles/setArticleState', {
                articleId,
                articleState,
            })
            .then(() => {
                addToast('Successfully updated article', 'Success');
            })
            .catch((error) => {
                const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                addToast(errorMessage, 'Error');
            });
        await axios
            .post('/api/articles/getArticles', {})
            .then((response) => setArticles(response.data.article))
            .catch((error) => {
                const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                addToast(errorMessage, 'Error');
            });
        setIsLoading(false);
    };

    const sideBarButtonStyling =
        'text-white h-fit whitespace-nowrap rounded-md border border-transparent bg-gray-600 px-1';

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
            <div className="w-full p-1 h-full">
                <div className="border rounded-lg flex flex-col overflow-y-auto h-max items-center scrollbar-thin scrollbar-h-1.5 scrollbar-thumb-gray-200 scrollbar-thumb-rounded">
                    <div className="p-2">
                        <div>
                            <Button handleClick={() => router.push('/blog/new')}>Create New Article</Button>
                        </div>
                    </div>

                    {articles.map((article, index) => {
                        const { title, id: articleId, createdAt, state, slug, imageUrl } = article;
                        const isActive = articleId === selectedArticleId;
                        const validToPublish = slug && imageUrl;
                        return (
                            <div
                                key={`article-${index}`}
                                onClick={() => {
                                    setSelectedArticleId(articleId);
                                    setLocalStorageSelectedArticle(articleId);
                                }}
                                className="flex justify-between p-2"
                            >
                                <div className="grid text-center border p-1 rounded-md">
                                    <div className={`${responsiveTextSize} truncate ...`}>{title}</div>
                                    <p className={responsiveTextSize}>Created: {moment.utc(createdAt).format('L')}</p>
                                    <p className={responsiveTextSize}>Status: {state}</p>
                                    <div className="grid justify-items-center">
                                        <button
                                            onClick={() => {
                                                router.push(
                                                    { pathname: '/blog/edit', query: { articleId } },
                                                    '/blog/edit',
                                                );
                                            }}
                                            className={`${sideBarButtonStyling} hover:bg-yellow-400`}
                                        >
                                            <span className={responsiveTextSize}>Edit</span>
                                        </button>
                                        {state == 'Published' && (
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Set Article to Draft?')) {
                                                        setArticleState(articleId, ArticleState.Draft);
                                                    }
                                                }}
                                                className={`${sideBarButtonStyling} hover:bg-purple-600 my-1`}
                                            >
                                                <span className={responsiveTextSize}>Set as Draft</span>
                                            </button>
                                        )}
                                        {state == 'Draft' && validToPublish && (
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Publish Article?')) {
                                                        setArticleState(articleId, ArticleState.Published);
                                                    }
                                                }}
                                                className={`${sideBarButtonStyling} hover:bg-green-600 my-1`}
                                            >
                                                <span className={responsiveTextSize}>Publish</span>
                                            </button>
                                        )}
                                        {state == 'Draft' && !validToPublish && (
                                            <button
                                                onClick={() => {
                                                    addToast('Valid url and image are required to publish', 'Error');
                                                }}
                                                className={`${sideBarButtonStyling} hover:bg-red-600 my-1`}
                                            >
                                                <span className={responsiveTextSize}>Publish</span>
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Delete Article?')) {
                                                    deleteArticle(article);
                                                }
                                            }}
                                            className={`${sideBarButtonStyling} hover:bg-red-600`}
                                        >
                                            <span className={responsiveTextSize}>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Articles;
