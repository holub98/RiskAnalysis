import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { DatePicker, Select, Button } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
const StandardDeviationPage = () => {
  const [show, setShow] = useState(false);
  const [sd, setSd] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [currency, setCurrency] = useState();

  const url = "http://localhost:8080/api/standard-deviation";

  // axios.post(url, null, {
  //   params: {
  //     startDate: moment(startDate).format("YYYY-MM-DD"),
  //     endDate: moment(endDate).format("YYYY-MM-DD"),
  //     currency: currency,
  //   },
  // });

  // console.log(`post data ${currency}`);
  const StandardDeviations = useCallback(() => {
    axios
      .get(
        `http://localhost:8080/api/standard-deviation?startDate=${moment(
          startDate
        ).format("YYYY-MM-DD")}&endDate=${moment(endDate).format(
          "YYYY-MM-DD"
        )}&currency=${currency}`
      )
      .then((response) => {
        setSd((result) => [...result, response.data]);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error", err.message);
        }
      });

    console.log(`get data ${currency} ${startDate} ${endDate}`);
    console.log(sd);
  }, [currency, endDate, sd, startDate]);
  const selectStartDate = (value) => {
    setStartDate(value);
  };
  const selectEndDate = (value) => {
    setEndDate(value);
  };
  const selectCurrency = (value) => {
    setCurrency(value);
  };
  return (
    <>
      <DatePicker onChange={selectStartDate} />
      <DatePicker onChange={selectEndDate} />
      <Select
        style={{ width: 120 }}
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
          StandardDeviations();
        }}>
        Oblicz
      </Button>
    </>
  );
};

export default StandardDeviationPage;
