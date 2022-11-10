import React, { useState } from "react";
import VaRPage from "./VaRPage";
import AllChart from "../charts/AllChart";
import RelativeReturnVaRPage from "./RelativeReturnVaRPage";
import StandardDevioationPage from "./StandardDeviationPage";

const HomePage = () => {
  const [value, setValue] = useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return <AllChart />;
};

export default HomePage;
