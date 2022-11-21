import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DatePicker,
  Select,
  Button,
  InputNumber,
  Typography,
  Layout,
  Card,
} from "antd";
import "antd/dist/antd.css";
import moment from "moment";
const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const VaRPage = () => {
  const [show, setShow] = useState(false);
  const [vars, setVaRs] = useState([]);
  const [currency, setCurrency] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState("");
  const [cost, setCost] = useState("");
  const [dates, setDates] = useState([]);
  const [dateLimit, setDateLimit] = useState([]);
  const url = `http://localhost:8080/api/var`;
  const urlCurrency = `http://localhost:8080/api/currency`;

  const selectDates = (value) => {
    setDates(value);
  };

  const selectCurrency = (value) => {
    setCurrency(value);
  };

  const selectConfidenceLevel = (value) => {
    setConfidenceLevel(value);
  };

  const selectCost = (value) => {
    setCost(value);
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
  const createVaR = async () => {
    try {
      await axios.post(`${url}`, null, {
        params: {
          startDate: moment(dates[0]._d).format("YYYY-MM-DD"),
          endDate: moment(dates[1]._d).format("YYYY-MM-DD"),
          currency: currency,
          confidenceLevel: confidenceLevel,
          cost: cost,
        },
      });
    } catch (err) {
      console.log(err.message);
    } finally {
    }
  };
  const findVaR = async () => {
    try {
      const { data } = await axios.get(`${url}`, {
        params: {
          startDate: moment(dates[0]._d).format("YYYY-MM-DD"),
          endDate: moment(dates[1]._d).format("YYYY-MM-DD"),
          currency: currency,
          confidenceLevel: confidenceLevel,
          cost: cost,
        },
      });
      setVaRs(data);
    } catch (err) {
      console.log(err.message);
    } finally {
    }
    setShow(true);
  };
  const handleClickVaR = () => {
    createVaR();
    setTimeout(findVaR, 1000);
  };
  const clearState = () => {
    setShow(false);
    setCurrency("");
    setVaRs("");
    setDates([]);
    setConfidenceLevel("");
    setDateLimit([]);
    setCost("");
  };
  const ResultVaR = () => {
    return (
      <>
        <div className="display">
          <div>
            <Typography.Title level={5} data-test-id="opis-wyniku-var">
              Wartość zagrożona {currency}/PLN o wartości inwestycji{" "}
              {cost.toLocaleString("pl-PL", {
                style: "currency",
                currency: "PLN",
              })}{" "}
              w okresie {moment(dates[0]._d).format("DD/MM/YYYY")} -{" "}
              {moment(dates[1]._d).format("DD/MM/YYYY")} przy poziomie
              istotniości {confidenceLevel} wynosi:
            </Typography.Title>
            <Typography.Title
              level={4}
              style={{
                color: "red",
              }}
              data-test-id="wynik-var">
              {Number(vars[0].value).toFixed(4)}
            </Typography.Title>
          </div>
          <div className="display">
            <Text data-test-id="interpretacja-wyniku-var">
              Wartość zagrożona {Number(vars[0].value).toFixed(4)} oznacza, że
              inwestor poniesie taką stratę w{" "}
              {Number(1 - confidenceLevel) * 100}%{" "}
            </Text>
          </div>
        </div>
        <div className="input">
          <Button
            onClick={() => {
              clearState();
            }}
            data-test-id="przycisk-var-ponownie">
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
          <Typography.Title level={2} data-test-id="strona-var">
            Wartość zagrożona
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
            <Text>Wybierz kwotę inwestycji: </Text>
            <InputNumber
              data-test-id="wybierz-kwote"
              onChange={selectCost}
              addonAfter="PLN"
              min={1}
              disabled={show}
              value={cost !== "" ? cost : ""}
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
                handleClickVaR();
              }}
              disabled={
                show ||
                currency.length !== 3 ||
                (confidenceLevel !== 0.05 && confidenceLevel !== 0.01) ||
                cost < 1 ||
                dates.length !== 2
              }
              data-test-id="przycisk-var">
              Oblicz
            </Button>
          </div>
        </div>
        {show ? <ResultVaR /> : null}
      </Card>
    </Layout>
  );
};

export default VaRPage;
