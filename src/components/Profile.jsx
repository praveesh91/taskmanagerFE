import React, { useEffect, useState } from "react";
import moment from "moment";
import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";
import { useHistory, useLocation } from "react-router-dom";

import customInterceptors from "../api/index";

import {
  Button,
  Descriptions,
  Skeleton,
  Menu,
  Layout,
  message,
  Card,
  Modal,
} from "antd";
const { Header, Content, Footer } = Layout;

const Profile = () => {
  const history = useHistory();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      const res = await customInterceptors.patch("/users/me");
      setUserData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <HeaderLayout />
      <Content
        className="site-layout"
        style={{ padding: "20px 50px", marginTop: 64 }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}>
            <Skeleton loading={loading}>
              <Card
                title="User Details"
                extra={
                  <Button type="primary" onClick={showModal}>
                    Edit
                  </Button>
                }>
                <Descriptions>
                  <Descriptions.Item label="Name">
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
              </Card>
            </Skeleton>
          </div>
        </div>
        <Modal
          title="Edit User Details"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Content>
      <FooterLayout />
    </Layout>
  );
};

export default Profile;
