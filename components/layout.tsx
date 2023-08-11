import { useEffect, useState } from 'react';
import Header from './header';
import { useRouter } from 'next/router';

export default function EditingLayout({ userSlug, articleCount, projectCount, views, children }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleStart = (url) => url !== router.asPath && setLoading(true);
        const handleComplete = (url) => url === router.asPath && setLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
        };
    });

    return (
        <div className="flex flex-col h-screen">
            <Header
                loading={loading}
                userSlug={userSlug}
                articleCount={articleCount}
                projectCount={projectCount}
                views={views}
            />
            <main className="flex-1 px-5">{children}</main>
        </div>
    );
}
