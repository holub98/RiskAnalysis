import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavbarStyle.css";
import { Menu } from "antd";
const Navigation = () => {
  return (
    <div className="navigation">
      <Menu>
        <Menu.Item>
          <Link to="/" data-test-id="strona-glowna">
            Strona główna
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/standard-deviation" data-test-id="odchylenie-standardowe">
            Odchylenie standardowe
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/var" data-test-id="var">
            Wartość zagrożona
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/relative-return-var" data-test-id="wzgledny-var">
            Względna wartość zagrożona
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navigation;
