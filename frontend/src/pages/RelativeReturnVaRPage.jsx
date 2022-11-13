import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Select, Button, Typography, Space } from "antd";
import "antd/dist/antd.css";
import Plot from "react-plotly.js";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Text } = Typography;
const RelativeReturnVaRPage = () => {
  const [show, setShow] = useState(false);
  const [rrvar, setRrVaR] = useState([]);
  const [currency, setCurrency] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState("");
  const [dates, setDates] = useState([]);
  const [dateLimit, setDateLimit] = useState([]);
  const url = `http://localhost:8080/api/rrVaR`;
  const urlCurrency = `http://localhost:8080/api/currency`;
  let value = [];
  let currencyValue = [];
  const selectDates = (value) => {
    setDates(value);
  };

  console.log(dates);

  const selectCurrency = (value) => {
    setCurrency(value);
  };
  const selectConfidenceLevel = (value) => {
    setConfidenceLevel(value);
  };

  useEffect(() => {
    axios
      .get(`${urlCurrency}`, {
        params: {
          currency: currency,
        },
      })
      .then((response) => {
        setDateLimit(response.data);
      });
  }, [urlCurrency, currency]);
  if (dateLimit.length > 0) {
    console.log(moment(dateLimit[0].date).format("YYYY-MM-DD"));
    console.log(dateLimit[dateLimit.length - 1].date);
  }
  const disabledDates = (value) => {
    if (dateLimit.length > 0) {
      return (
        value < new Date(moment(dateLimit[0].date).add(1, "days")) ||
        value >
          new Date(moment(dateLimit[dateLimit.length - 1].date).add(1, "days"))
      );
    } else {
      return value < moment().subtract(31, "days");
    }
  };
  const createRrVaR = async () => {
    try {
      await axios.post(`${url}`, null, {
        params: {
          startDate: moment(dates[0]._d).format("YYYY-MM-DD"),
          endDate: moment(dates[1]._d).format("YYYY-MM-DD"),
          confidenceLevel: confidenceLevel,
          currency: currency,
        },
      });
    } catch (err) {
      console.log(err.message);
    } finally {
    }
  };
  const findRrVaR = async () => {
    try {
      const { data } = await axios.get(`${url}`, {
        params: {
          startDate: moment(dates[0]._d).format("YYYY-MM-DD"),
          endDate: moment(dates[1]._d).format("YYYY-MM-DD"),
          confidenceLevel: confidenceLevel,
          currency: currency,
        },
      });
      setRrVaR(data);
    } catch (err) {
      console.log(err.message);
    } finally {
    }
    setShow(true);
  };
  for (let key in rrvar) {
    value.push(rrvar[key].value);
    currencyValue.push(rrvar[key].currency);
  }

  const handleClickRrVaR = () => {
    createRrVaR();
    setTimeout(findRrVaR, 1000);
  };
  const clearState = () => {
    setShow(false);
    setCurrency("");
    setRrVaR("");
    setDates([]);
    setConfidenceLevel("");
    setDateLimit([]);
  };

  const ShowRRVaR = () => {
    const index = currencyValue.indexOf(currency);

    return (
      <>
        <Typography>
          <Text>Względna wartość zagrożona</Text>
          <Text strong> {currency}/PLN </Text>
          <Text>w okresie </Text>
          <Text strong>
            {" "}
            {moment(dates[0]._d).format("DD/MM/YYYY")} -{" "}
            {moment(dates[1]._d).format("DD/MM/YYYY")}
          </Text>
          <Text> przy poziomie istotniości </Text>
          <Text strong>{confidenceLevel} </Text>
          <Text>wynosi: </Text>
          <Text
            style={{
              color:
                Number(value[index] * 100).toFixed(4) > 0
                  ? "rgb(14, 203, 129)"
                  : "red",
            }}
            strong>
            {Number(value[index] * 100).toFixed(4)}%
          </Text>
        </Typography>
        {moment(dates[0]._d).format("YYYY-MM-DD") >
        moment("2014/11/07").format("YYYY-MM-DD") ? (
          <Plot
            data={[
              {
                x: [currencyValue[0]],
                y: [Number(value[0] * 100).toFixed(4)],
                type: "bar",
                marker: { color: "#0000FF" },
                name: `${currencyValue[0]}/PLN`,
              },
              {
                x: [currencyValue[1]],
                y: [Number(value[1] * 100).toFixed(4)],
                type: "bar",
                marker: { color: "#9900CC" },
                name: `${currencyValue[1]}/PLN`,
              },
              {
                x: [currencyValue[2]],
                y: [Number(value[2] * 100).toFixed(4)],
                type: "bar",
                marker: { color: "#008000" },
                name: `${currencyValue[2]}/PLN`,
              },
              {
                x: [currencyValue[3]],
                y: [Number(value[3] * 100).toFixed(4)],
                type: "bar",
                marker: { color: "#FF0000" },
                name: `${currencyValue[3]}/PLN`,
              },
              {
                x: [currencyValue[4]],
                y: [Number(value[4] * 100).toFixed(4)],
                type: "bar",
                marker: { color: "#33BDB9" },
                name: `${currencyValue[4]}/PLN`,
              },
            ]}
            layout={{
              width: 1500,
              height: 650,
              title: `Porównanie względnego odchylenia standardowego w okresie ${moment(
                dates[0]._d
              ).format("DD/MM/YYYY")} - ${moment(dates[1]._d).format(
                "DD/MM/YYYY"
              )} przy poziomie istotniości ${confidenceLevel} `,
            }}
            config={{ responsive: true, displaylogo: false }}
          />
        ) : null}
        <Button onClick={clearState}>Oblicz ponownie</Button>
      </>
    );
  };
  return (
    <>
      <Space direction="vertical">
        <Typography>
          <Text>
            Wybierz walutę, dla której chcesz obliczyć względną wartość
            zagrożoną
          </Text>
        </Typography>
        <Typography>
          <Select
            style={{ width: 200 }}
            onChange={selectCurrency}
            options={[
              {
                value: "EUR",
                label: "Euro",
              },
              {
                value: "GBP",
                label: "Funt szterling",
              },
              {
                value: "CHF",
                label: "Frank szwajcarski",
              },
              {
                value: "USD",
                label: "Dolar amerykaski",
              },
              {
                value: "JPY",
                label: "Jen japoński",
              },
            ]}
            disabled={show}
            value={currency !== "" ? currency : "Wybierz walutę"}
          />
        </Typography>
        <Typography>
          <Text>Wybierz datę początkową oraz końcową do obliczeń</Text>
        </Typography>
        <Typography>
          <RangePicker
            onChange={selectDates}
            format={"DD/MM/YYYY"}
            disabled={show}
            value={dates !== [] ? dates : []}
            disabledDate={disabledDates}
          />
        </Typography>
        <Typography>
          <Text>Wybierz poziom ufności</Text>
        </Typography>
        <Typography>
          <Select
            style={{ width: 200 }}
            onChange={selectConfidenceLevel}
            options={[
              {
                value: 0.01,
                label: "α = 0,01",
              },
              {
                value: 0.05,
                label: "α = 0,05",
              },
            ]}
            disabled={show}
            value={
              confidenceLevel !== ""
                ? confidenceLevel
                : "Wybierz poziom ufności"
            }
          />
        </Typography>
        <Typography>
          <Button
            onClick={() => {
              handleClickRrVaR();
            }}
            disabled={show}>
            Oblicz
          </Button>
        </Typography>

        {show ? <ShowRRVaR /> : null}
      </Space>
    </>
  );
};

export default RelativeReturnVaRPage;
