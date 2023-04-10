import axios from 'axios';
import { useEffect, useState } from 'react';
import { get } from 'lodash';
import { useToast } from '../../context/ToastContext';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

/**
 * Tracks the total number of new articles created by a user over time
 */
const UserLifetimePostsCount = () => {
    const { addToast } = useToast();
    const [dateObjects, setDateObjects] = useState([]);
    const [dates, setDates] = useState(new Map());

    useEffect(() => {
        const getData = async () => {
            await axios
                .post('/api/dashboard/getPostsPerMonth')
                .then((response) => setDateObjects(response.data.posts))
                .catch((error) => {
                    const errorMessage = get(error, 'response.data.errorMessage', 'Something went wrong!');
                    addToast(errorMessage, 'Error');
                });
        };
        getData();
    }, []);

    useEffect(() => {
        const dateMap = new Map();
        if (dateObjects.length > 0) {
            dateObjects.forEach((element) => {
                let dateObj = new Date(element.createdAt);
                let month = dateObj.getUTCMonth() + 1;
                let year = dateObj.getUTCFullYear();
                let zeroIfUnderTen = month < 10 ? 0 : '';
                let newdate = year + '-' + zeroIfUnderTen + month;
                if (dateMap.get(newdate)) {
                    dateMap.set(newdate, dateMap.get(newdate) + 1);
                } else dateMap.set(newdate, 1);
            });
            setDates(dateMap);
        }
    }, [dateObjects]);

    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
            x: {
                reverse: false,
            },
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: '',
            },
        },
        layout: {
            padding: { right: 25 },
        },
    };

    const labels = Array.from(dates.keys());

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Number of Articles Created Per Month',
                data: Array.from(dates.values()),
                borderColor: 'rgb(40, 44, 252)',
                backgroundColor: 'rgba(125, 227, 250, 0.5)',
            },
        ],
    };

    return (
        <div>
            <Line options={options} width={400} height={250} data={chartData} />
        </div>
    );
};

export default UserLifetimePostsCount;
