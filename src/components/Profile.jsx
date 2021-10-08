import React, { useEffect, useState } from "react";
import moment from "moment";
import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./Login.module.css";

import customInterceptors from "../api/index";

import {
  UploadOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import {
  Button,
  Descriptions,
  Skeleton,
  Typography,
  Layout,
  message,
  Card,
  Modal,
  Space,
  Avatar,
  Row,
  Upload,
  Col,
  Form,
  Input,
} from "antd";
const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const Profile = () => {
  const location = useLocation();
  const [form] = Form.useForm();

  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reload, setReload] = useState(false);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      await customInterceptors.post("/users/me/avatar", formData);
      message.success("File uploaded successfully");
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  const props = {
    name: "file",
    onChange(info) {
      handleUpload(info.file.originFileObj);
    },
  };

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
  }, [reload]);

  const onFinishUpdate = async (values) => {
    setLoading(true);
    try {
      await customInterceptors.patch("/users/me", values);
      setIsModalVisible(false);
      setReload(!reload);
      setLoading(false);
      message.success("User updated successfully");
    } catch (error) {
      message.error("Unable to update the user");
    } finally {
      setLoading(false);
    }
  };

  const showModal = async (id) => {
    setIsModalVisible(true);
    try {
      const { data } = await customInterceptors.get(`/users/${id}`);
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        skills: data.skills,
        phone: data.phone,
        experiance: data.experiance,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => showModal(userData?._id)}>
                      Edit
                    </Button>
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />} type="primary">
                        Upload photo
                      </Button>
                    </Upload>
                  </Space>
                }>
                <Row>
                  <Col md={6}>
                    {" "}
                    <Avatar
                      size={128}
                      src={`${
                        userData?.avatar
                          ? `data:image/png;base64,${userData?.avatar}`
                          : `https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`
                      }`}
                    />
                  </Col>
                  <Col md={18}>
                    <Descriptions layout="vertical">
                      <Descriptions.Item label="Name">
                        <Title level={5}>{userData?.name}</Title>
                      </Descriptions.Item>
                      <Descriptions.Item label="Email">
                        <Title level={5}> {userData?.email}</Title>
                      </Descriptions.Item>
                      <Descriptions.Item label="Contact number">
                        <Title level={5}> {userData?.phone}</Title>
                      </Descriptions.Item>
                      <Descriptions.Item label="Experience">
                        <Title level={5}>
                          {" "}
                          {`${userData?.experiance} years`}
                        </Title>
                      </Descriptions.Item>
                      <Descriptions.Item label="Skills">
                        <Title level={5}> {userData?.skills}</Title>
                      </Descriptions.Item>
                      <Descriptions.Item label="Joining Date">
                        <Title level={5}>
                          <Text type="success">
                            {moment(new Date(userData?.createdAt)).format(
                              "LLLL"
                            )}
                          </Text>
                        </Title>
                      </Descriptions.Item>
                      <Descriptions.Item label="Updated on">
                        <Text type="warning">
                          {moment(new Date(userData?.updatedAt)).format("LLLL")}
                        </Text>
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
            </Skeleton>
          </div>
        </div>
        <Modal
          title="Edit User Details"
          visible={isModalVisible}
          footer={false}>
          <Form name="normal_login" onFinish={onFinishUpdate} form={form}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}>
              <Input
                prefix={<UserOutlined className={styles.siteFormItemIcon} />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="skills"
              rules={[
                {
                  required: true,
                  message: "Please input your skills!",
                },
              ]}>
              <TextArea
                prefix={<MailOutlined className={styles.siteFormItemIcon} />}
                type="text"
                placeholder="Technical skills"
              />
            </Form.Item>
            <Form.Item
              name="experiance"
              rules={[
                {
                  min: 0,
                  max: 99,
                  required: true,
                  message: "Input value greater than 0",
                },
              ]}>
              <Input
                prefix={<NumberOutlined className={styles.siteFormItemIcon} />}
                type="number"
                placeholder="Years of experiance"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Input valid mobile number ",
                },
              ]}>
              <Input
                prefix={<NumberOutlined className={styles.siteFormItemIcon} />}
                type="number"
                placeholder="09 1234567890"
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 16,
                span: 6,
              }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
      <FooterLayout />
    </Layout>
  );
};

export default Profile;
