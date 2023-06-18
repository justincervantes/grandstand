import { useEffect, useState } from 'react';

function Loading() {
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    const calculateLoadingPercentage = () => {
        const halfLife = (100 - loadingPercentage) / 2;
        const randomness = Math.floor(Math.random() * 21);
        const percentageToAdd = halfLife > 20 ? 10 + randomness : halfLife;
        const newPercentage = loadingPercentage + percentageToAdd;
        setLoadingPercentage(newPercentage > 95 ? 97.5 : newPercentage);
        console.log('loadingPercentage', loadingPercentage);
    };

    useEffect(() => {
        const intervalId = setInterval(calculateLoadingPercentage, 500);
        return () => {
            clearInterval(intervalId);
        };
    });

    return <div className="h-1 bg-gray-700 rounded-full" style={{ width: `${loadingPercentage}%` }}></div>;
}

export default Loading;
