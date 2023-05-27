import MarkdownPreview from './markdown-preview';
import MarkdownInput from './markdown-input';

const MarkdownEditor = (props) => {
    const { content, setContent } = props ?? {};
    return (
        <div className="sm:grid sm:grid-cols-2 max-h-[calc(62vh-165px)] min-h-[calc(62vh-165px)] w-full">
            <div className="sm:col-span-1 max-h-[calc(62vh-165px)] min-h-[calc(62vh-165px)] w-full sm:border-r-2 sm:border-dotted">
                <MarkdownInput content={content} setContent={setContent} />
            </div>
            <div className="sm:col-span-1 max-h-[calc(62vh-165px)] min-h-[calc(62vh-165px)] w-full overflow-y-auto">
                <MarkdownPreview content={content} />
            </div>
        </div>
    );
};

export default MarkdownEditor;
