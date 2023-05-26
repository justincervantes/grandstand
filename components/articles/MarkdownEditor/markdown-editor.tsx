import MarkdownPreview from './markdown-preview';
import MarkdownInput from './markdown-input';

const MarkdownEditor = (props) => {
    const { content, setContent } = props ?? {};
    return (
        <div className="grid grid-cols-2 max-h-[calc(62vh-165px)] min-h-[calc(62vh-165px)] w-full">
            <div className="col-span-1 max-h-[calc(62vh-165px)] min-h-[calc(62vh-165px)] w-full border-r-2 border-dotted">
                <MarkdownInput content={content} setContent={setContent} />
            </div>
            <div className="col-span-1 max-h-[calc(62vh-165px)] min-h-[calc(62vh-165px)] w-full overflow-y-auto">
                <MarkdownPreview content={content} />
            </div>
        </div>
    );
};

export default MarkdownEditor;
