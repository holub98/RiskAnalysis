import React, { useState } from "react";
import axios from "axios";
import { DatePicker, Select, Button } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
const StandardDeviationPage = () => {
  const [show, setShow] = useState(false);
  const [sd, setSd] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currency, setCurrency] = useState("");

  const selectStartDate = (value) => {
    setStartDate(value);
  };
  const selectEndDate = (value) => {
    setEndDate(value);
  };
  const selectCurrency = (value) => {
    setCurrency(value);
  };
  console.log(moment(startDate).format("YYYY-MM-DD"));
  console.log(moment(endDate).format("YYYY-MM-DD"));
  console.log(currency);

  const createSd = async () => {
    try {
      await axios.post(`http://localhost:8080/api/standard-deviation`, null, {
        params: {
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
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
            startDate: moment(startDate).format("YYYY-MM-DD"),
            endDate: moment(endDate).format("YYYY-MM-DD"),
            currency: currency,
          },
        }
      );
      setSd(data);
      console.log("coś tam, response get");
    } catch (err) {
      console.log(err.message);
    } finally {
    }
  };
  const handleClickSd = () => {
    createSd();
    setTimeout(findSd, 1000);
  };
  console.log(sd);
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
      <Button
        onClick={() => {
          handleClickSd();
        }}>
        Oblicz
      </Button>
    </>
  );
};

export default StandardDeviationPage;
