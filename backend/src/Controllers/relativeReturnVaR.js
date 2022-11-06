const rrVaRModel = require("../Models/relativeReturnVar");
const RoRModel = require("../Models/dLRoR");
const statistic = require("simple-statistics");

exports.createRRVaR = async (req, res, next) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const confidenceLevel = req.query.confidenceLevel;
    const criticalValue95 = 1.65;
    const criticalValue99 = 2.33;
    try {
      const rrVaRExist = await rrVaRModel.find({
        startDate: startDate,
        endDate: endDate,
        confidenceLevel: confidenceLevel,
      });
      if (rrVaRExist.length !== 0) {
        res.send("These relative return Value at Risk has existed already");
      } else {
        if (confidenceLevel == "0.05") {
          await RoRModel.find({
            date: {
              $gte: startDate,
              $lte: endDate,
            },
            currency: "EUR",
          })
            .then((result) => {
              let euroValue = result.map((a) => a.rateOfReturn);
              new rrVaRModel({
                startDate: startDate,
                endDate: endDate,
                confidenceLevel: 0.05,
                value: statistic.standardDeviation(euroValue) * criticalValue95,
                currency: "EUR",
              }).save();
            })
            .catch((err) => {
              console.log(err);
            });

          await RoRModel.find({
            date: {
              $gte: startDate,
              $lte: endDate,
            },
            currency: "GBP",
          })
            .then((result) => {
              let gbpValue = result.map((a) => a.rateOfReturn);
              new rrVaRModel({
                startDate: startDate,
                endDate: endDate,
                confidenceLevel: 0.05,
                value: statistic.standardDeviation(gbpValue) * criticalValue95,
                currency: "GBP",
              }).save();
            })
            .catch((err) => {
              console.log(err);
            });

          await RoRModel.find({
            date: {
              $gte: startDate,
              $lte: endDate,
            },
            currency: "USD",
          })
            .then((result) => {
              let usdValue = result.map((a) => a.rateOfReturn);
              new rrVaRModel({
                startDate: startDate,
                endDate: endDate,
                confidenceLevel: 0.05,
                value: statistic.standardDeviation(usdValue) * criticalValue95,
                currency: "USD",
              }).save();
            })
            .catch((err) => {
              console.log(err);
            });

          await RoRModel.find({
            date: {
              $gte: startDate,
              $lte: endDate,
            },
            currency: "CHF",
          })
            .then((result) => {
              let chfValue = result.map((a) => a.rateOfReturn);
              new rrVaRModel({
                startDate: startDate,
                endDate: endDate,
                confidenceLevel: 0.05,
                value: statistic.standardDeviation(chfValue) * criticalValue95,
                currency: "CHF",
              }).save();
            })
            .catch((err) => {
              console.log(err);
            });

          await RoRModel.find({
            date: {
              $gte: startDate,
              $lte: endDate,
            },
            currency: "JPY",
          })
            .then((result) => {
              let jpyValue = result.map((a) => a.rateOfReturn);
              new rrVaRModel({
                startDate: startDate,
                endDate: endDate,
                confidenceLevel: 0.05,
                value: statistic.standardDeviation(jpyValue) * criticalValue95,
                currency: "JPY",
              }).save();
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (confidenceLevel == "0.01") {
          await RoRModel.find({
            date: {
              $gte: startDate,
              $lte: endDate,
            },
            currency: "EUR",
          })
            .then((result) => {
              let euroValue = result.map((a) => a.rateOfReturn);
              new rrVaRModel({
                startDate: startDate,
                endDate: endDate,
                confidenceLevel: 0.01,
                value: statistic.standardDeviation(euroValue) * criticalValue99,
                currency: "EUR",
              }).save();
            })
            .catch((err) => {
              console.log(err);
            });

          await RoRModel.find({
            date: {
              $gte: startDate,
              $lte: endDate,
            },
            currency: "GBP",
          })
            .then((result) => {
              let gbpValue = result.map((a) => a.rateOfReturn);
              new rrVaRModel({
                startDate: startDate,
                endDate: endDate,
                confidenceLevel: 0.01,
                value: statistic.standardDeviation(gbpValue) * criticalValue99,
                currency: "GBP",
              }).save();
            })
            .catch((err) => {
              console.log(err);
            });

          await RoRModel.find({
            date: {
              $gte: startDate,
              $lte: endDate,
            },
            currency: "USD",
          })
            .then((result) => {
              let usdValue = result.map((a) => a.rateOfReturn);
              new rrVaRModel({
                startDate: startDate,
                endDate: endDate,
                confidenceLevel: 0.01,
                value: statistic.standardDeviation(usdValue) * criticalValue99,
                currency: "USD",
              }).save();
            })
            .catch((err) => {
              console.log(err);
            });

          await RoRModel.find({
            date: {
              $gte: startDate,
              $lte: endDate,
            },
            currency: "CHF",
          })
            .then((result) => {
              let chfValue = result.map((a) => a.rateOfReturn);
              new rrVaRModel({
                startDate: startDate,
                endDate: endDate,
                confidenceLevel: 0.01,
                value: statistic.standardDeviation(chfValue) * criticalValue99,
                currency: "CHF",
              }).save();
            })
            .catch((err) => {
              console.log(err);
            });

          await RoRModel.find({
            date: {
              $gte: startDate,
              $lte: endDate,
            },
            currency: "JPY",
          })
            .then((result) => {
              let jpyValue = result.map((a) => a.rateOfReturn);
              new rrVaRModel({
                startDate: startDate,
                endDate: endDate,
                confidenceLevel: 0.01,
                value: statistic.standardDeviation(jpyValue) * criticalValue99,
                currency: "JPY",
              }).save();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    } catch (error) {
      error.message;
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getRRVaR = async (req, res, next) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const confidenceLevel = req.query.confidenceLevel;
  try {
    await rrVaRModel
      .find({
        startDate: startDate,
        endDate: endDate,
        confidenceLevel: confidenceLevel,
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
