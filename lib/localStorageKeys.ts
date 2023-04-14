const localStorageKeys = {
    articlesSelectedArticle: 'articles-ArticleList-select',
};

const setLocalStorageSelectedArticle = (articleId) => {
    localStorage.setItem(localStorageKeys.articlesSelectedArticle, JSON.stringify(articleId));
};

export { localStorageKeys, setLocalStorageSelectedArticle };
