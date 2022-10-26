const UsdPlnModel = require("../Models/usdpln")
const axios = require('axios');
const usdPLN = ()=> {
  const options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: {
      from_symbol: 'USD',
      function: 'FX_DAILY',
      to_symbol: 'PLN',
      outputsize: 'full',
      datatype: 'json'
    },
    headers: {
      'X-RapidAPI-Key': 'f63b5994eemsh8177fbc473e2d5ap11b741jsn020b4cb78cb0',
      'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    for(let time in response.data["Time Series FX (Daily)"]){
     try{
         new UsdPlnModel({
          date: time,
          open: response.data["Time Series FX (Daily)"][time]["1. open"],
          high: response.data["Time Series FX (Daily)"][time]["2. high"],
          low: response.data["Time Series FX (Daily)"][time]["3. low"],
          close: response.data["Time Series FX (Daily)"][time]["4. close"]
         }).save();
    }catch(error){
      error.message;
     }}
  }).catch(function (error) {
    console.error(error);
  });
}

module.exports = usdPLN;