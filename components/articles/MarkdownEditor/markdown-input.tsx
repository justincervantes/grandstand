const MarkdownInput = ({ setContent, content }) => {
    return (
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="m-0 p-1 w-full max-h-full min-h-full overflow-y-auto resize-none	"
            placeholder="Start writing your entry in markdown (## Hello world!)"
        ></textarea>
    );
};

export default MarkdownInput;
