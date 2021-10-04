import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, message } from "antd";
import { useHistory } from "react-router-dom";
import customInterceptors from "../api/index";
import AuthContext from "./AuthContext";

import Login from "./Login";

const { Header, Content, Footer } = Layout;

const SiteLayout = ({ children }) => {
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
    <Layout>
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
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default SiteLayout;
