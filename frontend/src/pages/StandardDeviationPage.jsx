import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Select, Button, Typography, Space, Layout } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Text } = Typography;
const { Content } = Layout;
const StandardDeviationPage = () => {
  const [show, setShow] = useState(false);
  const [sd, setSd] = useState([]);
  const [dates, setDates] = useState([]);
  const [dateLimit, setDateLimit] = useState([]);
  const [currency, setCurrency] = useState("");
  const url = `http://localhost:8080/api/rrVaR`;
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
      await axios.post(`http://localhost:8080/api/standard-deviation`, null, {
        params: {
          startDate: moment(dates[0]._d).format("YYYY-MM-DD"),
          endDate: moment(dates[1]._d).format("YYYY-MM-DD"),
          currency: currency,
        },
      });

      console.log("coś tam, response post");
    } catch (err) {
      console.log(err.message);
    } finally {
    }
  };
  const findSd = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/standard-deviation`,
        {
          params: {
            startDate: moment(dates[0]._d).format("YYYY-MM-DD"),
            endDate: moment(dates[1]._d).format("YYYY-MM-DD"),
            currency: currency,
          },
        }
      );
      setSd(data);
      console.log(sd);
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
        <Typography>
          <Text>Odchylenie standardowe </Text>
          <Text strong> {currency}/PLN </Text>
          <Text>w okresie </Text>
          <Text strong>
            {" "}
            {moment(dates[0]._d).format("DD/MM/YYYY")} -{" "}
            {moment(dates[1]._d).format("DD/MM/YYYY")}
          </Text>
          <Text>wynosi: </Text>
          <Text
            style={{
              color:
                Number(sd[0].value * 100).toFixed(4) > 0
                  ? "rgb(14, 203, 129)"
                  : "red",
            }}
            strong>
            {Number(sd[0].value * 100).toFixed(4)}%
          </Text>
        </Typography>

        <Button onClick={clearState}>Oblicz ponownie</Button>
      </>
    );
  };
  const InputForm = () => {
    return (
      <>
        <Layout style={{ padding: " 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}>
            <Space direction="vertical">
              <Typography>
                <Text>
                  Wybierz walutę, dla której chcesz obliczyć odchylenie
                  standardowe
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
                <Typography>
                  <Text>Wybierz datę początkową oraz końcową do obliczeń</Text>
                </Typography>
                <RangePicker
                  onChange={selectDates}
                  format={"DD/MM/YYYY"}
                  disabled={show}
                  value={dates !== [] ? dates : []}
                  disabledDate={disabledDates}
                />
              </Typography>
              <Typography>
                <Button
                  onClick={() => {
                    handleClickSd();
                  }}>
                  Oblicz
                </Button>
              </Typography>
            </Space>
          </Content>
        </Layout>
      </>
    );
  };
  return <>{!show ? <InputForm /> : <ResultSd />}</>;
};

export default StandardDeviationPage;
