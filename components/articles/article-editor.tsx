import axios from 'axios';
import { useEffect, useState } from 'react';
import { get } from 'lodash';
import MarkdownEditor from './MarkdownEditor/markdown-editor';
import { useToast } from '../../context/ToastContext';
import TitleInput from './title-input';
import ArticleActions from './article-actions';

const ArticleEditor = ({ article, updateStateArticles }) => {
    const { id, title: titleProp = '', content: contentProp = '' } = article ?? {};
    const [originalTitle, setOriginalTitle] = useState(titleProp);
    const [originalContent, setOriginalContent] = useState(contentProp);
    const [title, setTitle] = useState(titleProp);
    const [content, setContent] = useState(contentProp);
    const { addToast } = useToast();

    useEffect(() => {
        setTitle(titleProp);
        setContent(contentProp);
        setOriginalTitle(titleProp);
        setOriginalContent(contentProp);
    }, [article]);

    const updateArticle = async () => {
        try {
            await axios.post('/api/articles/updateArticle', {
                articleTitle: title,
                articleId: id,
                content,
            });
            setOriginalTitle(title);
            setOriginalContent(content);
            updateStateArticles(id, content, title);
            addToast('Article successfully updated', 'Success');
        } catch (error) {
            const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
            addToast(errorMessage, 'Error');
        }
    };

    if (!article)
        return (
            <div className="w-full max-h-[72.8vh] min-h-[72.8vh] flex justify-center items-center bg-orange-50">
                Select or create an article
            </div>
        );
    return (
        <div className="w-full flex flex-col max-h-[72.5vh] min-h-[72.5vh]">
            <TitleInput placeholder="Set a title..." value={title} setValue={setTitle} className="m-2 w-5/6 text-xl" />
            <MarkdownEditor content={content} setContent={setContent} />
            <ArticleActions
                handlePreview={() => console.log('Preview')}
                handleSave={updateArticle}
                isPreviewDisabled={!title || !content}
                isSaveDisabled={originalContent === content && originalTitle === title}
            />
        </div>
    );
};

export default ArticleEditor;
