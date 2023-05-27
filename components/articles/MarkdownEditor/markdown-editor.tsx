import MarkdownPreview from './markdown-preview';
import MarkdownInput from './markdown-input';

const MarkdownEditor = (props) => {
    const { content, setContent } = props ?? {};
    return (
        <div className="sm:grid sm:grid-cols-2 min-h-[calc(40vh)] w-full">
            <div className="sm:col-span-1 min-h-[calc(40vh)] w-full sm:border-r-2 sm:border-dotted">
                <MarkdownInput content={content} setContent={setContent} />
            </div>
            <div className="sm:col-span-1 min-h-[calc(40vh)] w-full overflow-y-auto">
                <MarkdownPreview content={content} />
            </div>
        </div>
    );
};

export default MarkdownEditor;
