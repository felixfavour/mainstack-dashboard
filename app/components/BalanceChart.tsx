"use client"
import { CategoryScale, Chart, LinearScale, PointElement, LineElement } from 'chart.js';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';

export default function BalanceChart() {
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement);
  return (
    <div className='come-up'>
      <Line
        datasetIdKey='id'
        options={{
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                display: false
              },
            },
            y: {
              grid: {
                display: false,
              },
              suggestedMax: 80,
              ticks: {
                display: false
              }
            }
          }
        }}
        data={{
          labels: ['Apr 01, 2022', ' ', ' ', ' ', 'Apr 30, 2022'],
          datasets: [{
            label: 'My First Dataset',
            data: [0, 50, 25, 55, 0],
            fill: false,
            tension: 0.5,
            borderColor: "#FF5403",
            borderWidth: 1
          }]
        }} />
    </div>
  )
}