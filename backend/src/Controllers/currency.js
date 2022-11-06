const currencyModel = require("../Models/currency");
const RoRModel = require("../Models/dLRoR");
const request = require("request");
const moment = require("moment");

exports.createCurrency = async (req, res) => {
  const currency = req.query.currency;
  try {
    var url = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${currency}&to_symbol=PLN&outputsize=full&apikey=4AOCSQKH2KXMMI46`;

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
                currency: currency,
              });
              if (now !== time) {
                if (exist.length == 0) {
                  new currencyModel({
                    date: time,
                    open: data["Time Series FX (Daily)"][time]["1. open"],
                    high: data["Time Series FX (Daily)"][time]["2. high"],
                    low: data["Time Series FX (Daily)"][time]["3. low"],
                    close: data["Time Series FX (Daily)"][time]["4. close"],
                    currency: currency,
                  }).save();
                } else {
                  break;
                }
              }
            } catch (error) {
              error.message;
            }
          }
          currencyModel
            .find({ currency: "USD" })
            .sort("-date")
            .then(async (result) => {
              let closeValue = result.map((a) => a.close);
              let dateValue = result.map((a) => new Date(a.date));
              for (let i = 0; i < closeValue.length - 1; i++) {
                try {
                  const existRoR = await RoRModel.find({
                    date: dateValue[i],
                    currency: currency,
                  });
                  if (existRoR.length == 0) {
                    new RoRModel({
                      date: dateValue[i],
                      rateOfReturn: Math.log(closeValue[i] / closeValue[i + 1]),
                      currency: currency,
                    }).save();
                  } else {
                    break;
                  }
                } catch (error) {
                  error.message;
                }
              }
            });
        }
      }
    );

    res.send(`Add correctly ${currency}/PLN`);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCurrency = async (req, res) => {
  const currency = req.query.currency;
  try {
    await currencyModel
      .find({ currency: currency })
      .sort("date")
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).send(error);
  }
};
