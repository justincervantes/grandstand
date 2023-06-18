import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

const ArticlePreviewModal = ({ content = '', isOpen, setIsOpen }) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10 w-full items-center
                    as={Fragment}"
                onClose={() => setIsOpen(false)}
            >
                <Transition.Child
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                </Transition.Child>

                <div className="fixed inset-0 z-10">
                    <div className="flex content-center justify-center h-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="h-[85vh] self-center w-11/12 relative transform rounded-lg bg-white text-left shadow-xl transition-all ">
                                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left h-[70vh] overflow-x-hidden overflow-y-auto w-full">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-base font-semibold leading-6 text-gray-900"
                                            >
                                                Article Preview
                                            </Dialog.Title>
                                            <div className="mt-2 prose text-left max-w-none">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: DOMPurify.sanitize(marked(content)),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute justify-center w-full px-4 py-3 bottom-2 bg-gray-50 sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-black rounded-md shadow-sm hover:bg-indigo-700 sm:ml-3"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ArticlePreviewModal;
