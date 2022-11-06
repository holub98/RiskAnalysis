import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";

function GbpChart() {
  const [gbp, setGbp] = useState([]);
  let closeValueArr =[];
  let dateArr =[];
  const url = `http://localhost:8080/api/currency/?currency=GBP`;
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
useEffect(()=>{
  axios.get(url).then((response)=>{
    setGbp(response.data)
  }) 
},[url])

 for(let key in gbp){
  closeValueArr.push(gbp[key].close);
  dateArr.push(gbp[key].date.substring(0,10));
 }
  return (
    <Line
    data={{
      labels: dateArr,
      datasets:[{
        data: closeValueArr,
        label: 'GBP/PLN',
        borderColor: '#9900CC',
        backgroundColor: '#9900CC',
      }]
  }}
  options={{
    responsive: true,
    pointRadius: 0,
    pointHitRadius: 1,
    borderWidth: 1,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Wykres historyczny dla kursu Funta szterlinga',
    },
  },
  }}
    />
  )
}

export default GbpChart