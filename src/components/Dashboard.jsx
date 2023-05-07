import { Pie, Line } from 'react-chartjs-2';
import '../App.css';
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
    const [data, setData] = useState([]);
    const columnNames = ["region", "intensity", "topic", "relevance"];
    console.log("data", data);
    useEffect(() => {
        fetch('http://localhost:8080/api/data/columns')
            .then(data => data.json())
            .then((res) => setData(res))
            .catch(e => {
                console.log("error", e);
            })
    }, [])

    //if we have data then load else show loading. 
    if (data === []) {
        return <h2>Loading</h2>
    }

    const chartData = {
        labels: data.map(entry => entry.region),
        datasets: [
            {
                data: data.map(entry => entry.intensity),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                ],
            },
        ],
    };

    return (
        <div>
            <div className='header' >
                <input placeholder='Search'></input>
                <div className="user-icon">
                </div>
            </div>
            <div className='graphs'>
                <div className='pie'><Pie data={chartData} /></div>
                <div className='line'><Line data={linedata} /></div>
            </div>
            <footer></footer>
        </div>
    );
}
