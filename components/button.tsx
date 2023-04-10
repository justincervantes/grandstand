const Button = (props) => {
    const { handleClick, children, isDisabled = false, disabledTooltip = '' } = props;
    const title = isDisabled ? disabledTooltip : '';
    const regularClasses =
        'w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 text-gray-700 shadow-sm mx-1';
    const disabledClasses =
        'w-full justify-center rounded-md border border-gray-100 bg-white px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 shadow-sm mx-1';
    const classes = isDisabled ? disabledClasses : regularClasses;
    return (
        <button disabled={isDisabled} className={classes} onClick={handleClick} title={title}>
            {children}
        </button>
    );
};

export default Button;
