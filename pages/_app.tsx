import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import '../styles/globals.css';
import Layout from '../components/layout';
import { ToastContext, toastInit } from '../context/ToastContext';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
    const { toasts, addToast, removeToast } = toastInit();
    return (
        <SessionProvider session={session}>
            <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ToastContext.Provider>
        </SessionProvider>
    );
}
