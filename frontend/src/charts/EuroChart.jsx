import React, { useEffect, useState} from 'react'
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
const EuroChart =() => {
  const [euro, setEuro] = useState([]);
  let closeValueArr =[];
  let dateArr =[];
  const url = `http://localhost:8080/api/euro`;
useEffect(()=>{
  axios.get(url).then((response)=>{
    setEuro(response.data)
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
 for(let key in euro){
  closeValueArr.push(euro[key].close);
  dateArr.push(euro[key].date.substring(0,10));
 }
console.log(dateArr);
  return (
    
    <Line
    data={{
      labels: dateArr,
      datasets:[{
        data: closeValueArr,
        label: 'EUR/PLN',
        borderColor: '#0000FF',
        backgroundColor: '#0000FF',
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
      text: 'Wykres historyczny dla kursu Euro',
    },
  },
  }}
    />

  )
}

export default EuroChart