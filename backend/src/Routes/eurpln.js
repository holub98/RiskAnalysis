const express = require("express");
const EurPlnModel = require("../Models/eurpln")
const app = express();
const axios = require('axios');

  const options ={
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: {
      from_symbol: 'EUR',
    function: 'FX_DAILY',
    to_symbol: 'USD',
    outputsize: 'compact',
    datatype: 'json'
    },
    headers: {
      'X-RapidAPI-Key': 'f63b5994eemsh8177fbc473e2d5ap11b741jsn020b4cb78cb0',
      'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
    }
  };
 const eurPLN = ()=> axios.get(options).then(function (response) {
     
    console.log(response.data);
   for(let date in response.data["Time Series FX (Daily)"]){
    console.log(date)
    console.log(response.data["Time Series FX (Daily)"][date]["1. open"])
    console.log(response.data["Time Series FX (Daily)"][date]["2. high"])
    console.log(response.data["Time Series FX (Daily)"][date]["3. low"])
    console.log(response.data["Time Series FX (Daily)"][date]["4. close"])

   }

  

}).catch(function (error) {
  console.error(error);
});
 
module.exports = eurPLN;