import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from './loading';

export enum PortfolioLinkLocations {
    HomePage,
    Header,
}

function PortfolioLinks({
    userName,
    location,
    userProfileImage,
    userSlug,
    hasProjects,
    hasArticles,
    gitHubUrl,
    linkedInUrl,
}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    let imageStyles: string;
    let containerStyles: string;

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

    switch (+location) {
        case PortfolioLinkLocations.HomePage:
            imageStyles = 'w-8 h-8 m-4 hover:cursor-pointer';
            containerStyles = 'flex justify-center';
            break;
        case PortfolioLinkLocations.Header:
            imageStyles = 'w-8 h-8 mx-2 md:w-14 md:h-14 lg:h-12 lg:w-12 hover:cursor-pointer';
            containerStyles = 'flex justify-center pb-5 border-b';
            break;
        default:
            imageStyles = 'w-8 h-8 m-4 hover:cursor-pointer';
            containerStyles = 'flex justify-center';
    }

    return (
        <>
            {location !== PortfolioLinkLocations.HomePage && (
                <p className="my-5 text-xl font-bold md:text-2xl lg:text-6xl">{userName}</p>
            )}
            <div className={containerStyles}>
                {location !== PortfolioLinkLocations.HomePage && (
                    <img
                        src={userProfileImage}
                        className={`border border-black rounded-full ${imageStyles}`}
                        alt="Home"
                        title="Home"
                        onClick={() => router.push(`/${userSlug}`)}
                    />
                )}

                {hasProjects && (
                    <div onClick={() => router.push(`/${userSlug}/projects`)}>
                        <img
                            className={imageStyles}
                            src="https://cdn-icons-png.flaticon.com/256/5129/5129558.png"
                        ></img>
                    </div>
                )}
                {hasArticles && (
                    <div onClick={() => router.push(`/${userSlug}/blog`)}>
                        <img
                            className={imageStyles}
                            src="https://cdn-icons-png.flaticon.com/512/1187/1187544.png"
                        ></img>
                    </div>
                )}
                {gitHubUrl && (
                    <a href={gitHubUrl} target="_blank" rel="noopener noreferrer">
                        <img className={imageStyles} src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img>
                    </a>
                )}
                {linkedInUrl && (
                    <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                        <img className={imageStyles} src="https://cdn-icons-png.flaticon.com/512/145/145807.png"></img>
                    </a>
                )}
            </div>
            <div className="w-full h-1 rounded-full">{loading && <Loading />}</div>
        </>
    );
}

export default PortfolioLinks;
