import { Pie, Line } from 'react-chartjs-2';
import './styles.css';
import { useEffect, useState } from 'react';
import { CategoryScale, PointElement, Chart, Tooltip, Title, ArcElement, Legend, LinearScale, LineElement } from 'chart.js';

Chart.register(
    CategoryScale, LinearScale, Tooltip, Title, ArcElement, Legend, PointElement, LineElement
);

export default function Dashboard() {
    const [pieData, setPieData] = useState([]);
    const [lineData, setLineData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/data/columns')
            .then(res => res.json())
            .then(res => {
                const dataMap = new Map();
                const lmap = new Map();

                res.forEach(row => {
                    const key = row[0];
                    const value = row[1];

                    if (key !== "") {
                        if (dataMap.has(key)) {
                            dataMap.set(key, dataMap.get(key) + value);
                        } else {
                            dataMap.set(key, value);
                        }
                    }

                    const lkey = row[2];
                    const lvalue = row[3];

                    if (lkey !== "") {
                        if (lmap.has(lkey)) {
                            lmap.set(lkey, lmap.get(lkey) + lvalue);
                        } else {
                            lmap.set(lkey, lvalue);
                        }
                    }
                });

                const pData = Array.from(dataMap.entries());
                setPieData(pData);

                const lData = Array.from(lmap.entries());
                setLineData(lData)
            })
            .catch(e => {
                console.log("error", e);
            })
    }, []);

    const pieChartData = {
        labels: pieData.map(entry => entry[0]),
        datasets: [
            {
                data: pieData.map(entry => entry[1]),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#5cc378'
                ],
                label: "Relevance",
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Intensity in different regions',
                align: 'center',
                font: {
                    size: 16,
                    weight: 'bold',
                },
            },
            legend: {
                position: 'right',
            },
        },
        layout: {
            padding: {
                bottom: 10,
            },
        },
    };

    const lineChartData = {
        labels: lineData.map(entry => entry[0]),
        datasets: [
            {
                data: lineData.map(entry => entry[1]),
                backgroundColor: [
                    '#FF6384'
                ],
                label: "Relevance",
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Relevance of Different Topics',
                align: 'center',
                font: {
                    size: 16,
                    weight: 'bold',
                },
            },
            legend: {
                position: 'bottom',
            },
        },
        layout: {
            padding: {
                bottom: 10,
            },
        },
    };


    return (
        <div className='dashboard'>
            <div className='header' >
                <input placeholder='Search'></input>
                <div className="user-icon">
                    😄
                </div>
            </div>
            <div className='graphs'>
                {pieData.length !== [] &&
                    <div className='pie'><Pie data={pieChartData} options={pieChartOptions} /></div>
                }
                {lineData.length !== [] &&
                    <div className='line'><Line data={lineChartData} options={lineChartOptions} /></div>
                }
            </div>
            <footer></footer>
        </div>
    );
}
