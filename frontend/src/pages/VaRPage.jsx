import React, { useState } from "react";
import axios from "axios";
import { DatePicker, Select, Button, InputNumber } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

const VaRPage = () => {
  const [show, setShow] = useState(false);
  const [vars, setVaRs] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currency, setCurrency] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState("");
  const [cost, setCost] = useState();
  const selectStartDate = (value) => {
    setStartDate(value);
  };
  const selectEndDate = (value) => {
    setEndDate(value);
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
  console.log(moment(startDate).format("YYYY-MM-DD"));
  console.log(moment(endDate).format("YYYY-MM-DD"));
  console.log(currency);
  console.log(cost);

  const createVaR = async () => {
    try {
      await axios.post(`http://localhost:8080/api/var`, null, {
        params: {
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
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
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
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
  };
  const handleClickVaR = () => {
    createVaR();
    setTimeout(findVaR, 1000);
  };
  console.log(vars);
  return (
    <>
      <DatePicker onChange={selectStartDate} />
      <DatePicker onChange={selectEndDate} />
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
      />
      <InputNumber onChange={selectCost} addonAfter="PLN" min={1} />
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
      />
      <Button
        onClick={() => {
          handleClickVaR();
        }}>
        Oblicz
      </Button>
    </>
  );
};

export default VaRPage;
