const UsdPlnModel = require("../../Models/USD/usdpln")
const RoRUsd = require('../../Models/USD/rorUsd')
const rorUSD = () =>{
    UsdPlnModel.find().sort('-date').then((result) =>{
        let closeValue = result.map(a => a.close);
        let dateValue = result.map(a => new Date(a.date))
        for(let i = 0; i< closeValue.length; i++){
          try{
            new RoRUsd({
              date: dateValue[i],
              rateOfReturn : Math.log(closeValue[i]/closeValue[i+1])
            }).save().catch(err => {    
              if (err.name === 'MongoServerError' && err.code === 11000) {
                  console.log("Istnieje takia dzienna stopa zwrotu dolara")
              }});;
        }catch(error){
          error.message;
         }
          }
       }).catch(err =>{
        console.log(err);
       });
}

module.exports = rorUSD;