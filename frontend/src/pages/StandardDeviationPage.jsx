import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Select, Button, Typography, Layout, Card } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import "../styles/PageStyle.css";
const { RangePicker } = DatePicker;
const { Text } = Typography;
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
            <Typography.Title level={5}>
              Odchylenie standardowe {currency}/PLN w okresie{" "}
              {moment(dates[0]._d).format("DD/MM/YYYY")} -{" "}
              {moment(dates[1]._d).format("DD/MM/YYYY")} jest równe
            </Typography.Title>
            <Typography.Title
              level={4}
              style={{
                color: "rgb(14, 203, 129)",
              }}
              strong>
              σ = {Number(sd[0].value).toFixed(6)} zł
            </Typography.Title>
          </div>
          <div className="display">
            <Text>
              Odchylenie standardowe jest tym lepsze, im wynik jest bliższy
              zeru, ponieważ dane są blisko średniej.{" "}
            </Text>
          </div>
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
          <Typography.Title level={2}>Odchylenie standardowe</Typography.Title>
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
            <Button
              onClick={() => {
                handleClickSd();
              }}
              disabled={show || currency.length !== 3 || dates.length !== 2}>
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
