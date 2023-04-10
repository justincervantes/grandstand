const localStorageKeys = {
    organizationsSelectedOrg: 'organizations-OrganizationList-select',
    articlesSelectedOrg: 'articles-OrganizationList-select',
    articlesSelectedArticle: 'articles-ArticleList-select',
};

const setLocalStorageSelectedArticle = (articleId, organizationId) => {
    const organizationSelectedArticleStorage = JSON.parse(
        localStorage.getItem(localStorageKeys.articlesSelectedArticle) || '[]',
    );
    // find the object holding the current organization in the array, if it exists
    let storageObject = organizationSelectedArticleStorage.find(
        (orgObject) => orgObject.organizationId === organizationId,
    );
    // if it exists, just modify it to add the article - this is a pointer so it does not need to be added, only modified
    if (storageObject) {
        storageObject.articleId = articleId;
    } else {
        // if it doesn't exist, make a new object to add to the array
        let newStorageObject = {
            organizationId: organizationId,
            articleId: articleId,
        };
        organizationSelectedArticleStorage.push(newStorageObject);
    }
    // save the array to storage
    localStorage.setItem(localStorageKeys.articlesSelectedArticle, JSON.stringify(organizationSelectedArticleStorage));
};

export { localStorageKeys, setLocalStorageSelectedArticle };
