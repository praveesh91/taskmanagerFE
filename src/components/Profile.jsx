import React, { useEffect, useState } from "react";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";

import customInterceptors from "../api/index";

import { Button, Descriptions, Skeleton, Menu, Layout, message } from "antd";
const { Header, Content, Footer } = Layout;

const Profile = () => {
  const history = useHistory();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    try {
      const res = await customInterceptors.get("/users/me");
      setUserData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return () => {};
  }, []);

  const handleSignout = async () => {
    try {
      const res = await customInterceptors.post("/users/logout");
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
          <Menu theme="dark" mode="horizontal" selectedKeys={[path]}>
            <Menu.Item key="profile" onClick={() => history.push("/profile")}>
              Home
            </Menu.Item>
            <Menu.Item key="tasks" onClick={() => history.push("/tasks")}>
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
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}>
            <Skeleton loading={loading}>
              <Descriptions title="User Info">
                <Descriptions.Item label="UserName">
                  {userData?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {userData?.email}
                </Descriptions.Item>
                <Descriptions.Item label="Age">
                  {userData?.age}
                </Descriptions.Item>
                <Descriptions.Item label="Created on">
                  {userData?.createdAt}
                </Descriptions.Item>
                <Descriptions.Item label="Updated on">
                  {userData?.updatedAt}
                </Descriptions.Item>
              </Descriptions>
            </Skeleton>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Profile;
