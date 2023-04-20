import axios from 'axios';
import { get } from 'lodash';
import { useToast } from '../../context/ToastContext';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { setLocalStorageSelectedArticle } from '../../lib/localStorageKeys';
import Image from 'next/image';
import logo from '/public/logo.png';

const RecentOrganizationsActivity = () => {
    const [articles, setArticles] = useState([]);
    const router = useRouter();
    const { addToast } = useToast();

    const handleArticleClick = (e, articleId) => {
        e.preventDefault();
        setLocalStorageSelectedArticle(articleId);
        router.push('/blog');
    };
    const tdStyle = 'border-b border-slate-400 p-4 pl-8 text-black hover:bg-orange-100';
    const tableColumns = [
        { label: 'Title', value: 'title' },
        { label: 'Date Created/Modified', value: 'date' },
    ];

    useEffect(() => {
        const getData = async () => {
            await axios
                .post('/api/dashboard/getRecentPosts')
                .then((response) => {
                    const retrievedArticles = response.data.articles;
                    setArticles(retrievedArticles);
                })
                .catch((error) => {
                    const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                    addToast(errorMessage, 'Error');
                });
        };
        getData();
    }, []);

    return (
        <div className="h-full w-full">
            {articles.length > 0 && (
                <div>
                    <h1 className="font-medium pt-4 text-3xl">Recent Activity in your Organizations</h1>
                    <br />
                    <table className="table-fixed text-black border border-slate-400">
                        <thead>
                            <tr>
                                {tableColumns.map((column, index) => (
                                    <th
                                        key={`thead-col-${index}`}
                                        className="bg-orange-100 border-b border-slate-400 font-medium px-8 py-3 text-black dark:text-slate-200 text-left"
                                    >
                                        {column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article, index) => {
                                const { title: articleTitle, createdAt, id: articleId } = article;
                                const formattedArticleCreatedAtDate = moment.utc(createdAt).format('YYYY-MM-DD');
                                return (
                                    <tr key={`tbody-row-${index}`}>
                                        <td className={tdStyle}>
                                            <a
                                                onClick={(e) => handleArticleClick(e, articleId)}
                                                className="underline text-blue-600 hover:text-blue-800 hover:cursor-pointer visited:text-purple-600"
                                            >
                                                <span>{`${articleTitle}`}</span>
                                            </a>
                                        </td>
                                        <td className={tdStyle}>{formattedArticleCreatedAtDate}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            {articles.length <= 0 && <Image className="h-48 w-auto" src={logo} alt="Logo" />}
        </div>
    );
};

export default RecentOrganizationsActivity;
