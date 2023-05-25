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
            <div className="w-full max-h-[72.8vh] min-h-[72.8vh] flex text-center justify-center items-center bg-orange-50">
                <div className="block">
                    <span className="font-medium text-xl text-gray-700">Select or create an article</span>
                    <br />
                    <br />
                    <span className="font-medium text-base text-gray-700">
                        This blog uses the npm marked package to translate Markdown into html which is styled using
                        Tailwind Typography.
                        <br />
                        <br />
                        When editing, the panel on the right will show how your text will be displayed on your Blog.
                        <br />
                        <br />A full list of the Markdown formatting options is available{' '}
                        <a
                            href="https://www.npmjs.com/package/marked"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-blue-600 hover:text-blue-800 hover:cursor-pointer visited:text-purple-600"
                        >
                            here
                        </a>
                        .
                    </span>
                </div>
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
