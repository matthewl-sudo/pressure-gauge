import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function TempGauge({label, value}) {
    let data = {
        labels: ["CPU temp"],
        datasets: [{
            label: label,
            data: [value, (90-value)],
            backgroundColor: (context) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) {
                    return null
                }
                if (context.dataIndex === 0) {
                    return getGradient(chart);
                }else{
                    return 'transparent'
                }
            },
            borderWidth: 1,
            borderColor: 'black',
            circumference: 180,
            rotation: 270,
            }
        ]
    }
    function getGradient(chart){
        const {ctx, chartArea: {top, bottom, left, right}} = chart;
        const gradientSegment = ctx.createLinearGradient(left, 0 , right, 0);
        gradientSegment.addColorStop(0, 'rgba(0, 175, 120, 0.8)');
        gradientSegment.addColorStop(0.65, 'rgba(255, 215, 0, 0.8)');
        gradientSegment.addColorStop(0.8, 'rgba(255, 0, 0, 0.8)');
        return gradientSegment;
    }

    const options = {
        plugins:{
            legend: {
                display: true,
                labels:{
                    color: "white",
                    boxWidth: 15,
                    boxHeight: 15
                }
            },
        },
        updatedValue: value,
        events: [],
    };

    const tempLabel = {
        id: 'tempLabel',
        afterDatasetsDraw(chart, args, plugins){
            const {ctx, data }  = chart;
            // console.log('data', data);
            const x = chart.getDatasetMeta(0).data[0].x;
            const y = chart.getDatasetMeta(0).data[0].y;
            ctx.save();
            ctx.font = 'bold 20px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'white'
            // ctx.Baseline= 'middle';
            ctx.fillText(`${Math.round(chart.config.options.updatedValue)}°c`, x, y/1.11);
        }
    }

    
    return (
        <div className="w-40 h-40">
            <Doughnut data={data} options={options} plugins={[tempLabel]}/>
        </div>);
}

export default TempGauge