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

function UsdChart() {
  const [usd, setUsd] = useState([]);
  let closeValueArr =[];
  let dateArr =[];
  const url = `http://localhost:8080/api/usd`;
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
    setUsd(response.data)
  }) 
},[url])

 for(let key in usd){
  closeValueArr.push(usd[key].close);
  dateArr.push(usd[key].date.substring(0,10));
 }
  return (
    <Line
    data={{
      labels: dateArr,
      datasets:[{
        data: closeValueArr,
        label: 'USD/PLN',
        borderColor: '	#008000',
        backgroundColor: '#008000',
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
      text: 'Wykres historyczny dla kursu Dolara amerykańskiego',
    },
  },
  }}
    />
  )
}

export default UsdChart