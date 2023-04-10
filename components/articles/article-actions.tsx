import Button from '../button';

const ArticleActions = ({ handleSave, handlePreview, isSaveDisabled, isPreviewDisabled }) => {
    return (
        <div className="relative -bottom-4 right-4 flex justify-end">
            <div className="w-32 flex">
                <Button handleClick={handleSave} isDisabled={isSaveDisabled} disabledTooltip="No difference detected">
                    Save
                </Button>
                {/* <Button
                    handleClick={handlePreview}
                    isDisabled={isPreviewDisabled}
                    disabledTooltip="Title and content required"
                >
                    Preview
                </Button> */}
            </div>
        </div>
    );
};

export default ArticleActions;
