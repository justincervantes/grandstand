import axios from 'axios';
import { get } from 'lodash';
import { useToast } from '../../context/ToastContext';
import { ReactNode, useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import actionDictionary from '../../lib/actionDictionary';
import { localStorageKeys, setLocalStorageSelectedArticle } from '../../lib/localStorageKeys';

const UserArticleActivity = () => {
    const [userActivity, setUserActivity] = useState([]);
    const { addToast } = useToast();
    const tableColumns = [
        { label: 'Article Title', value: 'title' },
        { label: 'Organization', value: 'organizationName' },
        { label: 'Action', value: 'action' },
        { label: 'Date', value: 'date' },
    ];
    const tdStyle = 'border-b border-slate-400 p-4 pl-8 text-black hover:bg-orange-100';
    const router = useRouter();
    const handleArticleClick = (e, organizationId, articleId) => {
        e.preventDefault();
        localStorage.setItem(localStorageKeys.articlesSelectedOrg, organizationId);
        setLocalStorageSelectedArticle(articleId, organizationId);
        router.push('/articles');
    };

    useEffect(() => {
        const getData = async () => {
            await axios
                .post('/api/dashboard/getUserArticleActions')
                .then((response) => {
                    setUserActivity(response.data.userArticleActivity);
                })
                .catch((error) => {
                    const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                    addToast(errorMessage, 'Error');
                });
        };
        getData();
    }, []);

    const renderTableRow = (articleActivity, index): ReactNode[] => {
        const { article, action, date } = articleActivity ?? {};
        const { deletedAt, id: articleId, title: articleTitle, organization } = article ?? {};
        const { id: organizationId, name: organizationName } = organization ?? {};
        return tableColumns.map(({ value }): ReactNode => {
            const deletedArticlenoLinkTitle = (
                <td className={tdStyle} key={articleTitle + index}>
                    {articleTitle}
                </td>
            );
            const validArticleValidLinkTitle = (
                <td className={tdStyle} key={articleTitle + index}>
                    <a
                        key={articleTitle + 'a' + index}
                        onClick={(e) => handleArticleClick(e, organizationId, articleId)}
                        className="underline text-blue-600 hover:text-blue-800 hover:cursor-pointer visited:text-purple-600"
                    >
                        {articleTitle}
                    </a>
                </td>
            );
            const titleValue = deletedAt ? deletedArticlenoLinkTitle : validArticleValidLinkTitle;
            const columnValues = {
                title: titleValue,
                organizationName: (
                    <td className={tdStyle} key={organizationName + index}>
                        {organizationName}
                    </td>
                ),
                action: (
                    <td className={tdStyle} key={actionDictionary[action] + index}>
                        {actionDictionary[action]}
                    </td>
                ),
                date: (
                    <td className={tdStyle} key={moment(date).format('LLL') + index}>
                        {moment(date).format('LLL')}
                    </td>
                ),
            };
            return columnValues[value];
        });
    };

    return (
        <div className="h-full w-full">
            {userActivity.length > 0 && (
                <div className="flex items-center justify-center">
                    <div>
                        <h1 className="font-medium pt-4 text-3xl">User Activity</h1>
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
                                {userActivity?.map((articleActivity, index) => {
                                    return <tr key={`tbody-row-${index}`}>{renderTableRow(articleActivity, index)}</tr>;
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {userActivity.length <= 0 && (
                <div className="flex w-full h-full rounded-lg items-center justify-center bg-orange-100">
                    <span>
                        Once you{' '}
                        <a
                            href="/organizations"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            create
                        </a>{' '}
                        or are invited to an organization, you can start creating{' '}
                        <a href="/articles" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            articles.{' '}
                        </a>{' '}
                        <br />
                        <br />
                        Once you post an article, this dashboard section will update to show your article history.
                        <br />
                        <br />
                        The bottom right (where the bird is) will show a table with the most Recent Activity from your
                        Organizations.
                    </span>
                </div>
            )}
        </div>
    );
};

export default UserArticleActivity;
