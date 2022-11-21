import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { Layout, Card } from "antd";
const HomePage = () => {
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

  const url = `http://localhost:8080/api/currency`;

  useEffect(() => {
    axios
      .get(`${url}`, {
        params: {
          currency: "EUR",
        },
      })
      .then((response) => {
        setEuro(response.data);
      });
  }, [url]);
  useEffect(() => {
    axios
      .get(`${url}`, {
        params: {
          currency: "CHF",
        },
      })
      .then((response) => {
        setChf(response.data);
      });
  }, [url]);
  useEffect(() => {
    axios
      .get(`${url}`, {
        params: {
          currency: "USD",
        },
      })
      .then((response) => {
        setUsd(response.data);
      });
  }, [url]);
  useEffect(() => {
    axios
      .get(`${url}`, {
        params: {
          currency: "GBP",
        },
      })
      .then((response) => {
        setGbp(response.data);
      });
  }, [url]);
  useEffect(() => {
    axios
      .get(`${url}`, {
        params: {
          currency: "JPY",
        },
      })
      .then((response) => {
        setJpy(response.data);
      });
  }, [url]);

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
  return (
    <Layout className="layout">
      <Card className="card">
        <Plot
          data-test-id="wykres-walut"
          data={[
            {
              x: dateEuroArr,
              y: closeValueEuro,
              type: "scatter",
              mode: "lines",
              marker: { color: "#A7226E" },
              name: "EUR/PLN",
            },
            {
              x: dateChfArr,
              y: closeValueChf,
              type: "scatter",
              mode: "lines",
              marker: { color: "#EC2049" },
              name: "CHF/PLN",
            },
            {
              x: dateGbpArr,
              y: closeValueGbp,
              type: "scatter",
              mode: "lines",
              marker: { color: "#F26B38" },
              name: "GBP/PLN",
            },
            {
              x: dateUsdArr,
              y: closeValueUsd,
              type: "scatter",
              mode: "lines",
              marker: { color: "#F7DB4F" },
              name: "USD/PLN",
            },
            {
              x: dateJpyArr,
              y: closeValueJpy,
              type: "scatter",
              mode: "lines",
              marker: { color: "#2F9599" },
              name: "JPY/PLN",
            },
          ]}
          layout={{
            width: 1000,
            height: 700,
            title: "Wykres historycznych danych walut",

            yaxis: {
              title: "Wartość walut w złotówkach",
              showline: false,
            },
          }}
          config={{ responsive: true, displaylogo: false }}
        />
      </Card>
    </Layout>
  );
};

export default HomePage;
