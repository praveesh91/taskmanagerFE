import React, { useState } from "react";
import styles from "./Login.module.css";
import { Form, Input, Button, InputNumber, message } from "antd";
import { useHistory, Link } from "react-router-dom";

import axios from "axios";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  NumberOutlined,
} from "@ant-design/icons";

const Register = () => {
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post("http://localhost:3002/users", values);
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
        {/* <Form.Item
          name="age"
          rules={[
            {
              type: "number",
              min: 0,
              max: 99,
              required: true,
              message: "Input age between 0 and 99",
            },
          ]}>
          <InputNumber
            prefix={<NumberOutlined className={styles.siteFormItemIcon} />}
            type="age"
            placeholder="Age"
          />
        </Form.Item> */}
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
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
