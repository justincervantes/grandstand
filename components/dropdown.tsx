import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, Bars3Icon } from '@heroicons/react/20/solid';

const DropdownMenu = ({
    placeholder = '',
    options = [],
    onOptionClick,
    value = '',
}: {
    placeholder: string;
    options: string[];
    onOptionClick: (option: string) => void;
    value: string;
}) => {
    const handleClick = (event) => {
        onOptionClick(event.target.innerHTML);
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700  focus:ring-orange-100 focus:ring-offset-2 focus:ring-offset-gray-100">
                    {value || placeholder}
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
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
                <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {options.map((option, index) => (
                            <Menu.Item key={`dropdown-item-${index}`}>
                                {({ active }) => (
                                    <button
                                        onClick={handleClick}
                                        className={`${
                                            active ? 'bg-gray-100 text-gray-900 ' : 'text-gray-700 '
                                        }block px-4 py-2 text-sm w-full text-center`}
                                    >
                                        {option}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default DropdownMenu;
