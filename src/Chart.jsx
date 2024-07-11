import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {toGB} from "./App"

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({label1, label2, totalRam, usedRam}) {
    // const toGB = Math.pow(2, 30);
    let data = [
        {
            label: `${label1} ${((totalRam-usedRam)/toGB).toFixed(2)}GB`,
            value: `${(totalRam-usedRam)/toGB}`,
            color: "rgba(0, 43, 73, 0.8)",
            cutout: "10%",
        },
        {
            label: `${label2} ${(usedRam/toGB).toFixed(2)}GB`,
            value: usedRam/toGB,
            color: "rgba(0, 160, 43, 0.8)",
            cutout: "10%",
        }
    ]

    const options = {
        plugins : {
            responsive: true,
            legend: {
                position: 'top',
                labels:{
                    color: "white",
                    boxWidth: 10
                }
            }
        },
        maintainAspectRatio: false,
        // cutout: data.map((item) => item.cutout),
        scale: {
            pointLabels:{
                fontSize: 2
            },
        },
        totalRam: (totalRam/toGB) + 'GB Total Ram'
    };
    const RamLabel = {
        id: 'ramLabel',
        afterDatasetsDraw(chart, args, plugins){
            const {ctx, data }  = chart;
            // console.log('data', data);
            const x = chart.getDatasetMeta(0).data[0].x;
            const y = chart.getDatasetMeta(0).data[0].y;
            ctx.save();
            ctx.font = 'bold 10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'white'
            // ctx.Baseline= 'middle';
            ctx.fillText(`${chart.config.options.totalRam}`, x, y);
            // const xCenter = chart.getDatasetMeta(0).data[0].x;
            // const yCenter = chart.getDatasetMeta(0).data[0].y;
            // const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;

            // const startAngle = chart.getDatasetMeta(0).data[0].startAngle;
            // const endAngle = chart.getDatasetMeta(0).data[0].endAngle;
            // const centerAngle = (startAngle + endAngle)/2;
            // const xCord = outerRadius * Math.cos(centerAngle)
            // const yCord = outerRadius * Math.sin(centerAngle)
            // ctx.save();
            // ctx.translate(xCenter, yCenter);
            // ctx.font = 'bold 12px sans-serif';
            // ctx.fillStyle = 'white'
            // ctx.fillText('label', xCord, yCord);
            // ctx.restore();
            // chart.config.options.updatedValue
        }
    }

    const finalData ={
        labels: data.map((item) => item.label),
        datasets: [
            {
            data: data.map((item) => (item.value)),
            backgroundColor: data.map((item) => item.color),
            borderColor: data.map((item) => item.color),
            borderWidth: 3,
            dataVisibility: new Array(data.length).fill(true),
            },
        ],
    };
    
    return (
        <div className="w-40 h-40">
            <Pie data={finalData} options={options} plugins={[RamLabel]}/>
        </div>);
}

export default Chart