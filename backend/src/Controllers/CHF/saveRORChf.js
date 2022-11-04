const ChfPlnModel = require("../../Models/CHF/chfpln");
const RoRChf = require("../../Models/CHF/rorChf");

const rorCHF = () =>{
    ChfPlnModel.find().sort('-date').then((result) =>{
        let closeValue = result.map(a => a.close);
        let dateValue = result.map(a => new Date(a.date))
        for(let i = 0; i< closeValue.length; i++){
          try{
            new RoRChf({
              date: dateValue[i],
              rateOfReturn : Math.log(closeValue[i]/closeValue[i+1])
            }).save().catch(err => {    
              if (err.name === 'MongoServerError' && err.code === 11000) {
                console.log("Istnieje takia dzienna stopa zwrotu franka")
              }});;
        }catch(error){
          error.message;
         }
          }
       }).catch(err =>{
        console.log(err);
       });
      
}

module.exports = rorCHF;