import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

function AllChart() {
  const [euro, setEuro] = useState([]);
  const [chf, setChf] = useState([]);
  const [gbp, setGbp] = useState([]);
  const [usd, setUsd] = useState([]);
  const [jpy, setJpy] = useState([]);
  let closeValueEuro = [];
  let closeValueChf = [];
  let closeValueGbp = [];
  let closeValueUsd = [];
  let closeValueJpy = [];
  let dateEuroArr = [];
  let dateChfArr = [];
  let dateGbpArr = [];
  let dateUsdArr = [];
  let dateJpyArr = [];

  const urlEuro = `http://localhost:8080/api/currency/?currency=EUR`;
  const urlChf = `http://localhost:8080/api/currency/?currency=CHF`;
  const urlGbp = `http://localhost:8080/api/currency/?currency=GBP`;
  const urlUsd = `http://localhost:8080/api/currency/?currency=USD`;
  const urlJpy = `http://localhost:8080/api/currency/?currency=JPY`;

  useEffect(() => {
    try {
      axios.get(urlEuro).then((response) => {
        setEuro(response.data).catch((err) => {
          if (err.response) {
            console.log(err.response);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  }, [euro, urlEuro]);
  useEffect(() => {
    axios.get(urlChf).then((response) => {
      setChf(response.data).catch((err) => console.log(err.response.data));
    });
  }, [chf, urlChf]);
  useEffect(() => {
    axios.get(urlGbp).then((response) => {
      setGbp(response.data).catch((err) => console.log(err.response.data));
    });
  }, [gbp, urlGbp]);
  useEffect(() => {
    axios.get(urlUsd).then((response) => {
      setUsd(response.data).catch((err) => console.log(err.response.data));
    });
  }, [usd, urlUsd]);
  useEffect(() => {
    axios.get(urlJpy).then((response) => {
      setJpy(response.data).catch((err) => console.log(err.response.data));
    });
  }, [jpy, urlJpy]);
  for (let key in euro) {
    closeValueEuro.push(euro[key].close);
    dateEuroArr.push(euro[key].date.substring(0, 10));
  }
  for (let key in chf) {
    closeValueChf.push(chf[key].close);
    dateChfArr.push(chf[key].date.substring(0, 10));
  }
  for (let key in gbp) {
    closeValueGbp.push(gbp[key].close);
    dateGbpArr.push(gbp[key].date.substring(0, 10));
  }
  for (let key in usd) {
    closeValueUsd.push(usd[key].close);
    dateUsdArr.push(usd[key].date.substring(0, 10));
  }
  for (let key in jpy) {
    closeValueJpy.push(jpy[key].close);
    dateJpyArr.push(jpy[key].date.substring(0, 10));
  }
  console.log(jpy);
  console.log(usd);
  console.log(gbp);
  console.log(chf);
  console.log(euro);
  return (
    <Plot
      data={[
        {
          x: dateEuroArr,
          y: closeValueEuro,
          type: "scatter",
          mode: "lines",
          marker: { color: "#0000FF" },
          name: "EUR/PLN",
        },
        {
          x: dateChfArr,
          y: closeValueChf,
          type: "scatter",
          mode: "lines",
          marker: { color: "#FF0000" },
          name: "CHF/PLN",
        },
        {
          x: dateGbpArr,
          y: closeValueGbp,
          type: "scatter",
          mode: "lines",
          marker: { color: "#9900CC" },
          name: "GBP/PLN",
        },
        {
          x: dateUsdArr,
          y: closeValueUsd,
          type: "scatter",
          mode: "lines",
          marker: { color: "#008000" },
          name: "USD/PLN",
        },
        {
          x: dateJpyArr,
          y: closeValueJpy,
          type: "scatter",
          mode: "lines",
          marker: { color: "#33BDB9" },
          name: "JPY/PLN",
        },
      ]}
      layout={{
        width: 1500,
        height: 650,
        title: "Wykres historycznych danych walut",
      }}
      config={{ responsive: true, displaylogo: false }}
    />
  );
}

export default AllChart;
