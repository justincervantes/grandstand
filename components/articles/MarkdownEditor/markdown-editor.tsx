import MarkdownPreview from './markdown-preview';
import MarkdownInput from './markdown-input';

const MarkdownEditor = (props) => {
    const { content, setContent } = props ?? {};
    return (
        <div className="grid grid-cols-2 max-h-[67.5vh] min-h-[67.5vh] w-full">
            <div className="col-span-1 max-h-[66.5vh] min-h-[66.5vh] w-full border-r-2 border-dotted">
                <MarkdownInput content={content} setContent={setContent} />
            </div>
            <div className="col-span-1 max-h-[66.5vh] min-h-[66.5vh] w-full overflow-y-auto">
                <MarkdownPreview content={content} />
            </div>
        </div>
    );
};

export default MarkdownEditor;
