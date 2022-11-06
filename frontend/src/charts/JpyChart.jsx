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

function JpyChart() {
  const [jpy, setJpy] = useState([]);
  let closeValueArr =[];
  let dateArr =[];
  const url = `http://localhost:8080/api/currency/?currency=JPY`;
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
    setJpy(response.data)
  }) 
},[url])

 for(let key in jpy){
  closeValueArr.push(jpy[key].close);
  dateArr.push(jpy[key].date.substring(0,10));
 }
  return (
    <Line
    data={{
      labels: dateArr,
      datasets:[{
        data: closeValueArr,
        label: 'JPY/PLN',
        borderColor: '	#33BDB9',
        backgroundColor: '#33BDB9',
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

export default JpyChart