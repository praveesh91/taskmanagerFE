import React, { useContext } from "react";
import { Layout, Menu, message } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import customInterceptors from "../api/index";
import AuthContext from "./AuthContext";

const { Header } = Layout;

const HeaderLayout = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const context = useContext(AuthContext);

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
        <Menu theme="dark" mode="horizontal" selectedKeys={[path]}>
          <Menu.Item key="profile" onClick={() => history.push("/profile")}>
            Home
          </Menu.Item>
          <Menu.Item key="tasks" onClick={() => history.push("/tasks")}>
            Tasks
          </Menu.Item>
          <Menu.Item key="users" onClick={() => history.push("/users")}>
            Users
          </Menu.Item>
          <Menu.Item key="reports" onClick={() => history.push("/reports")}>
            Report
          </Menu.Item>
          <Menu.Item
            key="attendance"
            onClick={() => history.push("/attendance")}>
            Attendance
          </Menu.Item>
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
