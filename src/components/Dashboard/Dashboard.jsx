import { Pie, Line } from 'react-chartjs-2';
import './styles.css';
import { useEffect, useState } from 'react';
import { CategoryScale, PointElement, Chart, Tooltip, Title, ArcElement, Legend, LinearScale, LineElement } from 'chart.js';

Chart.register(
    CategoryScale, LinearScale, Tooltip, Title, ArcElement, Legend, PointElement, LineElement
);

const linedata = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "First dataset",
            data: [33, 53, 85, 41, 44, 65],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
        },
        {
            label: "Second dataset",
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            borderColor: "#742774"
        }
    ]
};


export default function Dashboard() {
    const [pieData, setPieData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const columnNames = ["region", "intensity", "topic", "relevance"];

    useEffect(() => {
        fetch('http://localhost:8080/api/data/columns')
            .then(res => res.json())
            .then(res => {
                const pData = [];
                const lData = [];

                res.data.forEach(row => {
                    pData.push(row.slice(0,2))
                    lData.push(row.slice(2))
                })

                setPieData(pData)
                setLineData(lData)
            })
            .catch(e => {
                console.log("error", e);
            })
    }, [])

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
            },
        ],
    };

    const lineChartData = {
        labels: lineData.map(entry => entry[0]),
        datasets: [
            {
                data: lineData.map(entry => entry[1]),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#5cc378'
                ],
            },
        ],
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
                { pieData !== [] &&
                    <div className='pie'><Pie data={pieChartData} /></div>
                }
                { lineData !== [] &&
                    <div className='line'><Line data={lineChartData} /></div>
                }
            </div>
            <footer></footer>
        </div>
    );
}
