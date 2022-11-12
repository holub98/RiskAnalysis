import React, { useState } from "react";
import axios from "axios";
import { DatePicker, Select, Button, Typography } from "antd";
import "antd/dist/antd.css";
import Plot from "react-plotly.js";
import moment from "moment";

const RelativeReturnVaRPage = () => {
  const [show, setShow] = useState(false);
  const [rrvar, setRrVaR] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currency, setCurrency] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState("");
  let value = [];
  let currencyValue = [];
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

  console.log(moment(startDate).format("YYYY-MM-DD"));
  console.log(moment(endDate).format("YYYY-MM-DD"));
  console.log(currency);

  const createRrVaR = async () => {
    try {
      await axios.post(`http://localhost:8080/api/rrVaR`, null, {
        params: {
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
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
      const { data } = await axios.get(`http://localhost:8080/api/rrVaR`, {
        params: {
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
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
    setStartDate("");
    setEndDate("");
    setConfidenceLevel("");
  };
  const ShowRRVaR = () => {
    const index = currencyValue.indexOf(currency);

    return (
      <>
        <Typography>
          Względna wartość zagrożona {currency} w okresie od{" "}
          {moment(startDate).format("DD/MM/YYYY")} do{" "}
          {moment(endDate).format("DD/MM/YYYY")} przy poziomie istotniości{" "}
          {confidenceLevel} wynosi: {value[index]}
        </Typography>
        <Plot
          data={[
            {
              x: [currencyValue[0]],
              y: [value[0]],
              type: "bar",
              marker: { color: "#0000FF" },
              name: `${currencyValue[0]}/PLN`,
            },
            {
              x: [currencyValue[1]],
              y: [value[1]],
              type: "bar",
              marker: { color: "#9900CC" },
              name: `${currencyValue[1]}/PLN`,
            },
            {
              x: [currencyValue[2]],
              y: [value[2]],
              type: "bar",
              marker: { color: "#008000" },
              name: `${currencyValue[2]}/PLN`,
            },
            {
              x: [currencyValue[3]],
              y: [value[3]],
              type: "bar",
              marker: { color: "#FF0000" },
              name: `${currencyValue[3]}/PLN`,
            },
            {
              x: [currencyValue[4]],
              y: [value[4]],
              type: "bar",
              marker: { color: "#33BDB9" },
              name: `${currencyValue[4]}/PLN`,
            },
          ]}
          layout={{
            width: 1500,
            height: 650,
            title: `Porównanie względnego odchylenia standardowego w okresie ${moment(
              startDate
            ).format("DD/MM/YYYY")} - ${moment(endDate).format(
              "DD/MM/YYYY"
            )} przy poziomie istotniości ${confidenceLevel} `,
          }}
          config={{ responsive: true, displaylogo: false }}
        />
        <Button onClick={clearState}>Oblicz ponownie</Button>
      </>
    );
  };
  return (
    <>
      <DatePicker
        onChange={selectStartDate}
        format={"DD/MM/YYYY"}
        disabled={show}
        value={startDate !== "" ? startDate : ""}
        name={"Wybierz datę początkową"}
      />
      <DatePicker
        onChange={selectEndDate}
        format={"DD/MM/YYYY"}
        disabled={show}
        value={endDate !== "" ? endDate : ""}
      />
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
          confidenceLevel !== "" ? confidenceLevel : "Wybierz poziom ufności"
        }
      />
      <Button
        onClick={() => {
          handleClickRrVaR();
        }}
        disabled={show}>
        Oblicz
      </Button>
      {show ? <ShowRRVaR /> : null}
    </>
  );
};

export default RelativeReturnVaRPage;
