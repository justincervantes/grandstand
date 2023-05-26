import axios from 'axios';
import { useEffect, useState } from 'react';
import { get } from 'lodash';
import MarkdownEditor from './MarkdownEditor/markdown-editor';
import { useToast } from '../../context/ToastContext';
import TitleInput from './title-input';
import ImageInput from './image-input';
import SlugInput from './slug-input';
import ArticleActions from './article-actions';
import ErrorDictionary from '../../lib/errorDictionary';

const ArticleEditor = ({ article, updateStateArticles }) => {
    const {
        id,
        title: titleProp = '',
        imageUrl: imageProp = '',
        slug: slugProp = '',
        content: contentProp = '',
    } = article ?? {};
    const [originalTitle, setOriginalTitle] = useState(titleProp);
    const [originalImage, setOriginalImage] = useState(imageProp);
    const [originalSlug, setOriginalSlug] = useState(slugProp);
    const [originalContent, setOriginalContent] = useState(contentProp);
    const [title, setTitle] = useState(titleProp);
    const [image, setImage] = useState(imageProp ?? '');
    const [slug, setSlug] = useState(slugProp ?? '');
    const [content, setContent] = useState(contentProp);
    const { addToast } = useToast();
    useEffect(() => {
        setTitle(titleProp);
        setImage(imageProp);
        setSlug(slugProp);
        setContent(contentProp);
        setOriginalTitle(titleProp);
        setOriginalImage(imageProp);
        setOriginalSlug(slugProp);
        setOriginalContent(contentProp);
    }, [article]);

    const updateArticle = async () => {
        if (slug.match(/^[-, a-z]+$/)) {
            try {
                await axios.post('/api/articles/updateArticle', {
                    articleId: id,
                    articleTitle: title,
                    imageUrl: image,
                    slug,
                    content,
                });
                setOriginalTitle(title);
                setOriginalImage(image);
                setOriginalSlug(slug);
                setOriginalContent(content);
                updateStateArticles(id, content, title, image, slug);
                addToast('Article successfully updated', 'Success');
            } catch (error) {
                const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                addToast(errorMessage, 'Error');
            }
        } else {
            addToast(ErrorDictionary.INVALID_SLUG, 'Error');
        }
    };

    if (!article)
        return (
            <div className="w-full max-h-[65.8vh] min-h-[65.8vh] flex text-center justify-center items-center bg-gray-200">
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
        <div className="w-full flex flex-col max-h-[calc(62vh-165px)] min-h-[calc(62vh-165px)]">
            <TitleInput placeholder="Set a title..." value={title} setValue={setTitle} className="m-2 w-5/6 text-xl" />
            <ImageInput
                placeholder="Enter an image Url..."
                value={image}
                setValue={setImage}
                className="m-2 w-5/6 text-xl"
            />
            <SlugInput
                placeholder="Enter a unique Url for your article (composed only of lowercase letters and hyphens)"
                value={slug}
                setValue={setSlug}
                className="m-2 w-5/6 text-xl"
            />
            <MarkdownEditor content={content} setContent={setContent} />
            <ArticleActions
                handlePreview={() => console.log('Preview')}
                handleSave={updateArticle}
                isPreviewDisabled={!title || !content}
                isSaveDisabled={
                    originalContent === content &&
                    originalTitle === title &&
                    originalImage === image &&
                    originalSlug === slug
                }
            />
        </div>
    );
};

export default ArticleEditor;
