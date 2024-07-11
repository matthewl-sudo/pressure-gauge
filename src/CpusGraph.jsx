import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js"
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
); 
function CpusGraph({cpus}) {
    const data = {
        labels: cpus?.map((cpu) => cpu.name),
        // labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        datasets: [
            {   
                label: "Cpu core",
                data: cpus?.map((cpu) => Math.round(cpu.cpu_usage)),
                // data: [20, 30, 10, 90, 50, 30, 80, 40, 40, 10, 20, 30, 10, 90, 50, 30, 80, 40, 40, 10],
                backgroundColor: 'rgba(220, 230, 250, 0.8)',
                barThickness: 4,

            }
        ]
    }
    const options = {
        indexAxis: 'y',
        plugins:{
            legend: {
                display: true,
                labels:{
                    color: "white",
                    font: {
                        size: 15
                    },
                    barThickness: 5, 
                    boxWidth: 15,
                    boxHeight: 15
                }
            },
        },
        scales:{
            y: {
                ticks: {
                    color: "white",
                    font: {
                        size: 10
                    },
                },
            },
            x: {
                ticks: {
                    color: "white",
                    font: {
                        size: 10
                    },
                },
                max: 100

            }
        }
    }
    return (
        <div className="w-40">
            <Bar data={data} options={options} />
        </div>
    )
}

export default CpusGraph