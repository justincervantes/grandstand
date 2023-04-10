import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface IToastMessage {
    id: string;
    message: string;
    type: 'Warning' | 'Error' | 'Success';
    created: Date;
    duration: number;
}

interface IToastContext {
    toasts: IToastMessage[];
    addToast: (message: string, type: 'Warning' | 'Error' | 'Success') => void;
    removeToast: (id: string) => void;
}

export const ToastContext = createContext<IToastContext>({
    toasts: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addToast: (message: string, type: 'Warning' | 'Error' | 'Success') => {
        return;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeToast: (id: string) => {
        return;
    },
});

export function useToast(): IToastContext {
    return useContext(ToastContext);
}

const DEFAULT_TOAST_DURATION = 7500;

export function toastInit(): {
    toasts: IToastMessage[];
    addToast: (message: string, type: 'Warning' | 'Error' | 'Success') => void;
    removeToast: (id: string) => void;
} {
    const [toasts, setToasts] = useState<IToastMessage[]>([]);

    const addToast = (message: string, type: 'Warning' | 'Error' | 'Success') => {
        setToasts((prev) => [
            ...prev,
            {
                id: uuidv4(),
                message,
                type,
                duration: DEFAULT_TOAST_DURATION,
                created: new Date(),
            },
        ]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id != id));
    };

    return { toasts, addToast, removeToast };
}
