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
function ChfChart() {
  const [chf, setChf] = useState([]);
  let closeValueArr =[];
  let dateArr =[];
  const url = `http://localhost:8080/api/chf`;
useEffect(()=>{
  axios.get(url).then((response)=>{
    setChf(response.data)
  }) 
},[url])

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
 for(let key in chf){
  closeValueArr.push(chf[key].close);
  dateArr.push(chf[key].date.substring(0,10));
 }
  return (
    <Line
    data={{
      labels: dateArr,
      datasets:[{
        data: closeValueArr,
        label: 'CHF/PLN',
        borderColor: '#FF0000',
        backgroundColor: '#FF0000',
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
      text: 'Wykres historyczny dla kursu Franka szajcarskiego',
    },
  },
  }}
    />
  )
}

export default ChfChart