import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Select, Button, Typography, Layout, Card } from "antd";
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
  useEffect(() => {}, []);
  const selectDates = (value) => {
    setDates(value);
  };
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
  const disabledDates = (value) => {
    if (dateLimit.length > 0) {
      return (
        value < new Date(moment(dateLimit[0].date).add(1, "days")) ||
        value >
          new Date(moment(dateLimit[dateLimit.length - 1].date).add(1, "days"))
      );
    } else {
      return value > moment().subtract(1, "days");
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

  const ResultRRVaR = () => {
    const index = currencyValue.indexOf(currency);

    return (
      <>
        <div className="display">
          <div>
            <Typography.Title level={5}>
              Względna wartość zagrożona {currency}/PLN w okresie{" "}
              {moment(dates[0]._d).format("DD/MM/YYYY")} -{" "}
              {moment(dates[1]._d).format("DD/MM/YYYY")} przy poziomie
              istotniości {Number(confidenceLevel * 100)}% wynosi:
            </Typography.Title>
            <Typography.Title
              level={4}
              style={{
                color:
                  Number(value[index] * 100).toFixed(4) > 0
                    ? "rgb(14, 203, 129)"
                    : "red",
              }}>
              {Number(value[index] * 100).toFixed(4)}%
            </Typography.Title>
          </div>
          <div className="display">
            {(value[index] * 100).toFixed(4) > 0 ? (
              <Text>Opis co oznacza ten wynik</Text>
            ) : (
              <Text>Opis co jak wynik jest mniejszy od 0</Text>
            )}
          </div>
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
                width: 600,
                height: 300,
                title: `Porównanie względnej wartości zagrożonej dla podanych danych `,
                xaxis: {
                  title: "Porównywane waluty",
                  showgrid: false,
                  zeroline: false,
                },
                yaxis: {
                  title: "Wartość w procentach",
                  showline: false,
                },
              }}
              config={{ responsive: true, displaylogo: false }}
            />
          ) : null}
        </div>
        <div className="input">
          <Button
            onClick={() => {
              clearState();
            }}>
            Oblicz ponownie
          </Button>
        </div>
      </>
    );
  };

  return (
    <Layout className="layout">
      <Card className="card">
        <div className="display">
          <Typography.Title level={2}>
            Względna wartość zagrożona
          </Typography.Title>
        </div>
        <div className="display">
          <div className="input">
            <Text>Wybierz walutę: </Text>
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
          </div>
          <div className="input">
            <Text>Wybierz daty: </Text>
            <RangePicker
              onChange={selectDates}
              format={"DD/MM/YYYY"}
              disabled={show}
              value={dates !== [] ? dates : []}
              disabledDate={disabledDates}
            />
          </div>
          <div className="input">
            <Text>Wybierz poziom ufności: </Text>
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
          </div>
          <div className="input">
            <Button
              onClick={() => {
                handleClickRrVaR();
              }}
              disabled={
                show ||
                currency.length !== 3 ||
                (confidenceLevel !== 0.05 && confidenceLevel !== 0.01) ||
                dates.length !== 2
              }>
              Oblicz
            </Button>
          </div>
        </div>
        {show ? <ResultRRVaR /> : null}
      </Card>
    </Layout>
  );
};

export default RelativeReturnVaRPage;
