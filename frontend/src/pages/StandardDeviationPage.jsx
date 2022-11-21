import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Select, Button, Typography, Layout, Card } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import "../styles/PageStyle.css";
const { RangePicker } = DatePicker;
const { Text } = Typography;
const { Option } = Select;
const StandardDeviationPage = () => {
  const [show, setShow] = useState(false);
  const [sd, setSd] = useState([]);
  const [dates, setDates] = useState([]);
  const [dateLimit, setDateLimit] = useState([]);
  const [currency, setCurrency] = useState("");
  const url = `http://localhost:8080/api/standard-deviation`;
  const urlCurrency = `http://localhost:8080/api/currency`;

  const selectDates = (value) => {
    setDates(value);
  };
  const selectCurrency = (value) => {
    setCurrency(value);
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

  const createSd = async () => {
    try {
      await axios.post(`${url}`, null, {
        params: {
          startDate: moment(dates[0]._d).format("YYYY-MM-DD"),
          endDate: moment(dates[1]._d).format("YYYY-MM-DD"),
          currency: currency,
        },
      });
    } catch (err) {
      console.log(err.message);
    } finally {
    }
  };
  const findSd = async () => {
    try {
      const { data } = await axios.get(`${url}`, {
        params: {
          startDate: moment(dates[0]._d).format("YYYY-MM-DD"),
          endDate: moment(dates[1]._d).format("YYYY-MM-DD"),
          currency: currency,
        },
      });
      setSd(data);
    } catch (err) {
      console.log(err.message);
    } finally {
    }
    setShow(true);
  };
  const handleClickSd = () => {
    createSd();
    setTimeout(findSd, 1000);
  };
  const clearState = () => {
    setShow(false);
    setCurrency("");
    setSd("");
    setDates([]);
    setDateLimit([]);
  };

  const ResultSd = () => {
    return (
      <>
        <div className="display">
          <div>
            <Typography.Title
              level={5}
              data-test-id="opis-wyniku-odchylenie-standardowe">
              Odchylenie standardowe {currency}/PLN w okresie{" "}
              {moment(dates[0]._d).format("DD/MM/YYYY")} -{" "}
              {moment(dates[1]._d).format("DD/MM/YYYY")} jest równe
            </Typography.Title>
            <Typography.Title
              level={4}
              style={{
                color: "rgb(14, 203, 129)",
              }}
              strong
              data-test-id="wynik-odchylenie-standardowe">
              σ = {Number(sd[0].value).toFixed(6)}
            </Typography.Title>
          </div>
          <div className="display">
            <Text data-test-id="interpretacja-wyniku-odchylenie-standardowe">
              Ryzyko obliczane za pomocą odchylenia standardowego jest mniejsze,
              jeżeli wynik jest bliżej 0.
            </Text>
          </div>
        </div>
        <div className="input">
          <Button
            onClick={() => {
              clearState();
            }}
            data-test-id="przycisk-odchylenie-standardowe-ponownie">
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
          <Typography.Title
            level={2}
            data-test-id="strona-odchylenie-standardowe">
            Odchylenie standardowe
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
            <Button
              onClick={() => {
                handleClickSd();
              }}
              disabled={show || currency.length !== 3 || dates.length !== 2}
              data-test-id="przycisk-odchylenie-standardowe">
              Oblicz
            </Button>
          </div>
        </div>
        {show ? <ResultSd /> : null}
      </Card>
    </Layout>
  );
};

export default StandardDeviationPage;
