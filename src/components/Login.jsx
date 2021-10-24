import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
import localForage from "localforage";
import customInterceptors from "../api/index";

import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const { data } = await customInterceptors.post("/users/login", values);
      localStorage.setItem("tokenId", data.token);
      message.success(data.message);
      history.push("/profile");
    } catch (error) {
      console.log(error);
      message.error("Failed to authenticate");
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
        <h3 style={{ textAlign: "center", paddingBottom: "10px" }}>Login</h3>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}>
          <Input
            prefix={<MailOutlined className={styles.siteFormItemIcon} />}
            placeholder="Email"
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
        <div className={styles.forgotSection}>
          <a className="loginFormForgot" href="">
            Forgot Password
          </a>
          <Link to={"/register"} className="nav-link">
            Register
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

export default Login;
