import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, message } from "antd";
import { useHistory } from "react-router-dom";
import customInterceptors from "../api/index";
import AuthContext from "./AuthContext";

import Login from "./Login";

const { Header, Content, Footer } = Layout;

const HeaderLayout = ({ children }) => {
  const history = useHistory();
  const context = useContext(AuthContext);
  console.log({ context });

  const handleSignout = async () => {
    try {
      const res = await customInterceptors.post("/users/logout");
      console.log(res);
      message.success("Logged out successfully");
      localStorage.clear();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}>
      <div>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" onClick={() => history.push("/profile")}>
            Home
          </Menu.Item>
          <Menu.Item key="2" onClick={() => history.push("/tasks")}>
            Tasks
          </Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </div>
      <div className="signout">
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="4" onClick={handleSignout}>
            Signout
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default HeaderLayout;
