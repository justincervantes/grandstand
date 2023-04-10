import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

const MarkdownPreview = ({ content }) => {
    return (
        <div
            className="prose prose-gray p-1 max-h-full min-h-full overflow-y-auto max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(content)) }}
        />
    );
};

export default MarkdownPreview;
