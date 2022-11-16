import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavbarStyle.css";
import { Menu } from "antd";
const Navigation = () => {
  return (
    <div className="navigation">
      <Menu>
        <Menu.Item>
          <Link to="/">Strona główna</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/standard-deviation">Odchylenie standardowe</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/var">Wartość zagrożona</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/relative-return-var">Względna wartość zagrożona</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navigation;
