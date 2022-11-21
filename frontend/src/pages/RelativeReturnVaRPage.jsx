import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Select, Button, Typography, Layout, Card } from "antd";
import "antd/dist/antd.css";
import Plot from "react-plotly.js";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Text } = Typography;
const { Option } = Select;
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
            <Typography.Title level={5} data-test-id="opis-wyniku-wzgledny-var">
              Względna wartość zagrożona {currency}/PLN w okresie{" "}
              {moment(dates[0]._d).format("DD/MM/YYYY")} -{" "}
              {moment(dates[1]._d).format("DD/MM/YYYY")} przy poziomie
              istotniości {Number(confidenceLevel * 100)}% wynosi:
            </Typography.Title>
            <Typography.Title
              level={4}
              style={{
                color:
                  Number(value[index]).toFixed(4) > 0
                    ? "rgb(14, 203, 129)"
                    : "red",
              }}
              data-test-id="wynik-wzgledny-var">
              {Number(value[index]).toFixed(4)}
            </Typography.Title>
          </div>
          <div className="display">
            <Text data-test-id="interpretacja-wyniku-wzgledny-var">
              Opis co oznacza ten wynik
            </Text>
          </div>
          <div data-test-id="wykres-wzgledny-var">
            <Plot
              data={[
                {
                  x: [currencyValue[0]],
                  y: [Number(value[0] * 100).toFixed(4)],
                  type: "bar",
                  marker: { color: "#39a375" },
                  name: `${currencyValue[0]}/PLN`,
                },
                {
                  x: [currencyValue[1]],
                  y: [Number(value[1] * 100).toFixed(4)],
                  type: "bar",
                  marker: { color: "#00a4a5" },
                  name: `${currencyValue[1]}/PLN`,
                },
                {
                  x: [currencyValue[2]],
                  y: [Number(value[2] * 100).toFixed(4)],
                  type: "bar",
                  marker: { color: "#009fe1" },
                  name: `${currencyValue[2]}/PLN`,
                },
                {
                  x: [currencyValue[3]],
                  y: [Number(value[3] * 100).toFixed(4)],
                  type: "bar",
                  marker: { color: "#008eff" },
                  name: `${currencyValue[3]}/PLN`,
                },
                {
                  x: [currencyValue[4]],
                  y: [Number(value[4] * 100).toFixed(4)],
                  type: "bar",
                  marker: { color: "#8066ff" },
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
          </div>
        </div>
        <div className="input">
          <Button
            onClick={() => {
              clearState();
            }}
            data-test-id="przycisk-wzgledny-var-ponownie">
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
          <Typography.Title level={2} data-test-id="strona-wzgledny-var">
            Względna wartość zagrożona
          </Typography.Title>
        </div>
        <div className="display">
          <div className="input">
            <Text>Wybierz walutę: </Text>
            <Select
              data-test-id="wybierz-walute"
              style={{ width: 200 }}
              onChange={selectCurrency}
              disabled={show}
              value={currency !== "" ? currency : "Wybierz walutę"}>
              <Option value="EUR" data-test-id="euro-wybierz">
                Euro
              </Option>
              <Option value="GBP" data-test-id="funt-wybierz">
                Funt szterling{" "}
              </Option>
              <Option value="CHF" data-test-id="frank-wybierz">
                Frank szwajcarski
              </Option>
              <Option value="USD" data-test-id="dolar-wybierz">
                Dolar amerykaski{" "}
              </Option>
              <Option value="JPY" data-test-id="jen-wybierz">
                Jen japoński
              </Option>
            </Select>
          </div>
          <div className="input">
            <Text>Wybierz daty: </Text>
            <RangePicker
              data-test-id="wybierz-daty"
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
              data-test-id="wybierz-poziom-ufnosci"
              style={{ width: 200 }}
              onChange={selectConfidenceLevel}
              disabled={show}
              value={
                confidenceLevel !== ""
                  ? confidenceLevel
                  : "Wybierz poziom ufności"
              }>
              <Option value={0.01} data-test-id="0,01-wybierz">
                α = 0,01
              </Option>
              <Option value={0.05} data-test-id="0,05-wybierz">
                α = 0,05
              </Option>
            </Select>
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
              }
              data-test-id="przycisk-wzgledny-var">
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
