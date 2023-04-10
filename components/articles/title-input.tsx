import { PencilSquareIcon } from '@heroicons/react/20/solid';

const TextInput = ({ className: classesFromProps = '', value, setValue, placeholder = '' }) => {
    const classProps = ` ${classesFromProps}`;
    const className = `focus:outline-0 text-m ${classProps}`.trim();
    return (
        <label className="flex justify-between border-b-2 border-dotted">
            <input
                placeholder={placeholder}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={className}
            />
            <PencilSquareIcon className="h-6 w-6 mt-3 mr-2" />
        </label>
    );
};

export default TextInput;
