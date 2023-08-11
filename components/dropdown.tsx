import { Fragment, ReactElement } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';

const DropdownMenu = ({
    placeholder = '',
    options = [],
    onOptionClick,
    value = '',
}: {
    placeholder: string;
    options: { label: ReactElement; path: string }[];
    onOptionClick: (option: { label: ReactElement; path: string }) => void;
    value: string;
}) => {
    const router = useRouter();
    const heading =
        'text-base font-medium text-gray-500 hover:text-gray-900 block px-4 py-2 text-sm w-full text-center';
    const activeHeading = 'text-base font-medium text-gray-900 bold block px-4 py-2 text-sm w-full text-center';

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-black border rounded-md shadow-sm ">
                    {value || placeholder}
                    <Bars3Icon className="w-6 h-6 text-white" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {options.map((option, index) => (
                            <Menu.Item key={`dropdown-item-${index}`}>
                                <button
                                    onClick={() => onOptionClick(option)}
                                    className={router.pathname === option?.path ? activeHeading : heading}
                                >
                                    {option.label}
                                </button>
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default DropdownMenu;
