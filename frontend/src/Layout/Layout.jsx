import React from "react";
import { Container, Link } from "@mui/material";

const Layout = () => {
  return (
    <Container sx={{ backgroundColor: "grey", weight: "100vh" }}>
      <Link>Strona główna</Link>
      <Link>Odchylenie standardowe</Link>
      <Link>Wartość zagrożona</Link>
      <Link>Względna wartość zagrożona</Link>
    </Container>
  );
};

export default Layout;
