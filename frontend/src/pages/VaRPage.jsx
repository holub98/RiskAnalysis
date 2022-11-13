import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DatePicker,
  Select,
  Button,
  InputNumber,
  Space,
  Typography,
} from "antd";
import "antd/dist/antd.css";
import moment from "moment";
const { Text } = Typography;
const { RangePicker } = DatePicker;
const VaRPage = () => {
  const [show, setShow] = useState(false);
  const [vars, setVaRs] = useState([]);
  const [currency, setCurrency] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState("");
  const [cost, setCost] = useState();
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
      await axios.post(`http://localhost:8080/api/var`, null, {
        params: {
          startDate: moment(dates[0]._d).format("YYYY-MM-DD"),
          endDate: moment(dates[1]._d).format("YYYY-MM-DD"),
          currency: currency,
          confidenceLevel: confidenceLevel,
          cost: cost,
        },
      });

      console.log("coś tam, response post");
    } catch (err) {
      console.log(err.message);
    } finally {
    }
  };
  const findVaR = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/var`, {
        params: {
          startDate: moment(dates[0]._d).format("YYYY-MM-DD"),
          endDate: moment(dates[1]._d).format("YYYY-MM-DD"),
          currency: currency,
          confidenceLevel: confidenceLevel,
          cost: cost,
        },
      });
      setVaRs(data);
      console.log("coś tam, response get");
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
    setCost();
  };
  const ResultVaR = () => {
    return (
      <>
        <Typography>
          <Text>Wartość zagrożona</Text>
          <Text strong> {currency}/PLN </Text>
          <Text>o wartości inwestycji </Text>
          <Text strong> {cost} </Text>
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
              color: "red",
            }}
            strong>
            {Number(vars[0].value).toFixed(4)}
          </Text>
        </Typography>

        <Button onClick={clearState}>Oblicz ponownie</Button>
      </>
    );
  };
  const InputForm = () => {
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
              value={
                dates !== []
                  ? dates
                  : ["wybierz datę początkową", "wybierz datę końcową"]
              }
              disabledDate={disabledDates}
            />
          </Typography>
          <Typography>
            <Text>Wybierz wartość inwestycji</Text>
          </Typography>
          <Typography>
            <InputNumber
              onChange={selectCost}
              addonAfter="PLN"
              min={1}
              precision={2}
              step={0.01}
              disabled={show}
              value={cost !== "" ? cost : "Wybierz wartość inwestycji"}
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
                handleClickVaR();
              }}
              disabled={show}>
              Oblicz
            </Button>
          </Typography>
        </Space>
      </>
    );
  };
  return !show ? <InputForm /> : <ResultVaR />;
};

export default VaRPage;
