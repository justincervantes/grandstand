import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { IToastMessage, useToast } from '../context/ToastContext';
import { faCheckCircle, faExclamationCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToastMessage: React.FC<IToastMessage> = ({ id, message, type, duration }) => {
    const [show, setShow] = useState<boolean>(true);
    const { removeToast } = useToast();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);
        }, duration - 500);
        return () => {
            if (timeout) {
                removeToast(id);
            }
        };
    }, [duration]);

    let backgroundCSS = 'bg-yellow-400';
    let iconColor = 'text-yellow-100';
    let icon = faExclamationCircle;

    switch (type) {
        case 'Error':
            backgroundCSS = 'bg-red-400';
            iconColor = 'text-red-100';
            icon = faTimesCircle;
            break;
        case 'Success':
            backgroundCSS = 'bg-green-400';
            iconColor = 'text-green-100';
            icon = faCheckCircle;
            break;
    }
    return (
        <Transition
            appear={true}
            show={show}
            enter={'transition-opacity duration-500'}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className={`p-2 rounded text-sm ${backgroundCSS}`}>
                <div>
                    <FontAwesomeIcon
                        onClick={(e) => {
                            setShow(false);
                        }}
                        className={`mr-2 ${iconColor}`}
                        icon={icon}
                        size={'lg'}
                    />
                    {message}
                </div>
            </div>
        </Transition>
    );
};

const ShowToast: React.FC = () => {
    const { toasts } = useToast();

    return (
        <div className={'fixed bottom-0 left-0 z-50 m-4'}>
            {toasts.map((toast, index) => {
                return (
                    <div key={index} className={'mb-2'}>
                        <ToastMessage
                            key={index}
                            id={toast.id}
                            type={toast.type}
                            message={toast.message}
                            duration={toast.duration}
                            created={toast.created}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ShowToast;
