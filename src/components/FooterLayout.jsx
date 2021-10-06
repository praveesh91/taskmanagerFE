import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, message } from "antd";
import { useHistory } from "react-router-dom";
import customInterceptors from "../api/index";
import AuthContext from "./AuthContext";

import Login from "./Login";

const { Header, Content, Footer } = Layout;

const FooterLayout = ({ children }) => {
  return (
    <Footer style={{ textAlign: "center" }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  );
};

export default FooterLayout;
