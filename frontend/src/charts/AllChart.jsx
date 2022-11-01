import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

function AllChart() {
  const [euro, setEuro] = useState([]);
  const [chf, setChf] = useState([]);
  const [gbp, setGbp] = useState([]);
  const [usd, setUsd] = useState([]);
  let closeValueEuro =[];
  let closeValueChf =[];
  let closeValueGbp =[];
  let closeValueUsd =[];
  let dateArr =[];
  const urlEuro = `http://localhost:8080/api/euro`;
  const urlChf = `http://localhost:8080/api/chf`;
  const urlGbp = `http://localhost:8080/api/Gbp`;
  const urlUsd = `http://localhost:8080/api/Usd`;
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
  axios.get(urlEuro).then((response)=>{
    setEuro(response.data)
  }) 
},[urlEuro])
useEffect(()=>{
  axios.get(urlChf).then((response)=>{
    setChf(response.data)
  }) 
},[urlChf])
useEffect(()=>{
  axios.get(urlGbp).then((response)=>{
    setGbp(response.data)
  }) 
},[urlGbp])
useEffect(()=>{
  axios.get(urlUsd).then((response)=>{
    setUsd(response.data)
  }) 
},[urlUsd])

 for(let key in euro){
  closeValueEuro.push(euro[key].close);
  dateArr.push(euro[key].date.substring(0,10));
 }
 for(let key in chf){
  closeValueChf.push(chf[key].close);
 }
 for(let key in gbp){
  closeValueGbp.push(gbp[key].close);
 }
 for(let key in usd){
  closeValueUsd.push(usd[key].close);
 }
console.log(closeValueChf)
console.log(closeValueEuro);
console.log(closeValueGbp);
console.log(closeValueUsd);

  return (
    <Line
    data={{
      labels: dateArr,
      datasets:[{
        data: closeValueEuro,
        label: 'EUR/PLN',
        borderColor: '#0000FF',
        backgroundColor: '#0000FF',
      },
      {
        data: closeValueUsd,
        label: 'USD/PLN',
        borderColor: '#008000',
        backgroundColor: '#008000',
      },
      {
        data: closeValueChf,
        label: 'CHF/PLN',
        borderColor: '#FF0000',
        backgroundColor: '#FF0000',
      },
      {
        data: closeValueGbp,
        label: 'GBP/PLN',
        borderColor: '#9900CC',
        backgroundColor: '#9900CC',
      }
    ]
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
      text: 'Wykres historyczny kursu walut',
    },
  },
  }}
    />
  )
}

export default AllChart