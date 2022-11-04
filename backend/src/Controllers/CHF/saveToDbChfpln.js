const ChfPlnModel = require("../../Models/CHF/chfpln");
const request = require('request');
const moment = require('moment');

const chfPLN = ()=> {
  var url = 'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=CHF&to_symbol=PLN&outputsize=full&apikey=4AOCSQKH2KXMMI46';
  const today = Date.now();
const now = moment(today).format('YYYY-MM-DD');
  request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
    for(let time in data["Time Series FX (Daily)"]){
     try{
      if(now !==time){
         new ChfPlnModel({
          date: time,
          open: data["Time Series FX (Daily)"][time]["1. open"],
          high: data["Time Series FX (Daily)"][time]["2. high"],
          low: data["Time Series FX (Daily)"][time]["3. low"],
          close: data["Time Series FX (Daily)"][time]["4. close"]
         }).save().catch(err => {    
          if (err.name === 'MongoServerError' && err.code === 11000) {
            console.log("Istnieje taki kurs franka")
          }});
        }
    }catch(error){
      error.message;
     }}
  }
})


}

module.exports = chfPLN;