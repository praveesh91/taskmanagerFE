import React, { useState } from "react";
import styles from "./Login.module.css";
import { Form, Input, Button, InputNumber, message } from "antd";
import { useHistory, Link } from "react-router-dom";
import customInterceptors from "../api/index";

import axios from "axios";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  NumberOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const Register = () => {
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const { data } = await customInterceptors.post("/users", values);
      message.success(data);
      history.push("/");
    } catch (error) {
      console.log(error);
      // message.success(error);
    }
  };
  return (
    <div className={styles.formContainer}>
      <Form
        name="normal_login"
        className={styles.loginForm}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}>
        <h3 style={{ textAlign: "center", paddingBottom: "10px" }}>Register</h3>
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
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}>
          <Input.Password
            prefix={<LockOutlined className={styles.siteFormItemIcon} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}>
          <Input
            prefix={<MailOutlined className={styles.siteFormItemIcon} />}
            type="email"
            placeholder="Email"
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
        <div className={styles.forgotSection}>
          <Link to={"/"} style={{ marginLeft: "auto" }}>
            Back to login
          </Link>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.loginFormButton}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
