import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VaRPage from "./pages/VaRPage";
import RelativeReturnVaRPage from "./pages/RelativeReturnVaRPage";
import StandardDeviationPage from "./pages/StandardDeviationPage";
function App() {
  return (
    <BrowserRouter>
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
          path="/standard-deviation"
          element={<StandardDeviationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
