import { Route, BrowserRouter, Routes } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
import VaRPage from "./pages/VaRPage";
import RelativeReturnVaRPage from "./pages/RelativeReturnVaRPage";
import StandardDeviationPage from "./pages/StandardDeviationPage";
import Layout from "antd/lib/layout/layout";
import Navigation from "./Navigation/Navigation";
import "./styles/App.css";
const App = () => {
  const url = `http://localhost:8080/api/currency`;

  axios.post(`${url}`, null, {
    params: {
      currency: "EUR",
    },
  });
  axios.post(`${url}`, null, {
    params: {
      currency: "CHF",
    },
  });
  axios.post(`${url}`, null, {
    params: {
      currency: "USD",
    },
  });
  axios.post(`${url}`, null, {
    params: {
      currency: "GBP",
    },
  });
  axios.post(`${url}`, null, {
    params: {
      currency: "JPY",
    },
  });

  return (
    <div className="app">
      <Layout>
        <BrowserRouter>
          <div className="nav">
            <Navigation />
          </div>
          <Layout>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/var" element={<VaRPage />} />
              <Route
                exact
                path="/relative-return-var"
                element={<RelativeReturnVaRPage />}
              />
              <Route
                exact
                path="/relative-return-var"
                element={<RelativeReturnVaRPage />}
              />
              <Route
                exact
                path="/standard-deviation"
                element={<StandardDeviationPage />}
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </Layout>
    </div>
  );
};

export default App;
