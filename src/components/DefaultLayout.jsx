import React from "react";
import { Button, Dropdown, Space } from "antd";
import "../resources/DefaultLayout.css";
import { useNavigate } from "react-router-dom";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("SheyMoney-users"));
  const navigate = useNavigate();
  const items = [
    {
      label: (
        <li
          onClick={() => {
            localStorage.removeItem("SheyMoney-users");
            navigate("/login");
          }}
        >
          Logout
        </li>
      ),
    },
  ];
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">SHEY MONEY</h1>
        </div>
        <div>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomLeft"
          >
            <button className="primary">{user.name}</button>
          </Dropdown>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
