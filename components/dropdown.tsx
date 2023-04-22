import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

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
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50  focus:ring-orange-100 focus:ring-offset-2 focus:ring-offset-gray-100">
                    {value || placeholder || (
                        <img src="https://cdn-icons-png.flaticon.com/512/4254/4254068.png" width={15} height={15} />
                    )}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 sm:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
