const SDModel = require("../Models/standardDeviation");
const RoRModel = require("../Models/dLRoR");
const statistic = require("simple-statistics");

exports.createSD = async (req, res, next) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const currency = req.query.currency;
    try {
      const SDExist = await SDModel.find({
        startDate: startDate,
        endDate: endDate,
        currency: currency,
      });
      if (SDExist.length == 0) {
        await RoRModel.find({
          date: {
            $gte: startDate,
            $lte: endDate,
          },
          currency: currency,
        })
          .then((result) => {
            let value = result.map((a) => a.rateOfReturn);
            new SDModel({
              startDate: startDate,
              endDate: endDate,
              value: statistic.standardDeviation(value),
              currency: currency,
            }).save();
            res.send("Added correctly");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.send("This standard deviation has existed already");
      }
    } catch (error) {
      error.message;
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSD = async (req, res, next) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const currency = req.query.currency;
    await SDModel.find({
      startDate: startDate,
      endDate: endDate,
      currency: currency,
    })
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
