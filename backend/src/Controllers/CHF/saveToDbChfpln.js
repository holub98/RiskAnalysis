const currencyModel = require("../../Models/currency");
const RoRModel = require("../../Models/dLRoR");
const express = require("express");
const app = express();
const request = require("request");
const moment = require("moment");

app.post("/api/saveChf", async (req, res) => {
  try {
    var url =
      "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=CHF&to_symbol=PLN&outputsize=full&apikey=4AOCSQKH2KXMMI46";

    const today = Date.now();
    const now = moment(today).format("YYYY-MM-DD");
    request.get(
      {
        url: url,
        json: true,
        headers: { "User-Agent": "request" },
      },
      async (err, res, data) => {
        if (err) {
          console.log("Error:", err);
        } else if (res.statusCode !== 200) {
          console.log("Status:", res.statusCode);
        } else {
          for (var time in data["Time Series FX (Daily)"]) {
            try {
              const exist = await currencyModel.find({
                date: time,
                currency: "CHF",
              });
              if (now !== time) {
                if (exist.length == 0) {
                  new currencyModel({
                    date: time,
                    open: data["Time Series FX (Daily)"][time]["1. open"],
                    high: data["Time Series FX (Daily)"][time]["2. high"],
                    low: data["Time Series FX (Daily)"][time]["3. low"],
                    close: data["Time Series FX (Daily)"][time]["4. close"],
                    currency: "CHF",
                  }).save();
                } else {
                  break;
                }
              }
            } catch (error) {
              error.message;
            }
          }
          console.log("Add CHF/PLN");
          currencyModel
            .find({ currency: "CHF" })
            .sort("-date")
            .then(async (result) => {
              let closeValue = result.map((a) => a.close);
              let dateValue = result.map((a) => new Date(a.date));
              for (let i = 0; i < closeValue.length - 1; i++) {
                try {
                  const existRoR = await RoRModel.find({
                    date: dateValue[i],
                    currency: "CHF",
                  });
                  if (existRoR.length == 0) {
                    new RoRModel({
                      date: dateValue[i],
                      rateOfReturn: Math.log(closeValue[i] / closeValue[i + 1]),
                      currency: "CHF",
                    }).save();
                  } else {
                    break;
                  }
                } catch (error) {
                  error.message;
                }
              }
            });
          console.log("Add ror CHF/PLN");
        }
      }
    );
    currencyModel.find({ currency: "CHF" }).then(async (result) => {
      res.send("Dodano poprawnie CHF");
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
