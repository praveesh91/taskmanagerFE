import React, { useState, useEffect } from "react";
import customInterceptors from "../api/index";
import { useHistory, useLocation } from "react-router-dom";

import { ClockCircleOutlined, CheckOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Space,
  message,
  Timeline,
  Layout,
  Menu,
} from "antd";

const { TextArea } = Input;
const { Header, Content, Footer } = Layout;

function Tasks() {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getTasks();
    return () => {};
  }, [reload]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getTasks = async () => {
    try {
      const res = await customInterceptors.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    try {
      values.completed = completed;
      const res = await customInterceptors.post("/tasks", values);
      setIsModalVisible(false);
      setReload(!reload);
      message.success(res.data);
    } catch (error) {
      message.error("Unable to create the task");
    }
  };

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
          <div>
            <Timeline>
              {tasks.map((e) => (
                <Timeline.Item
                  key={e.name}
                  dot={
                    e.completed ? (
                      <CheckOutlined style={{ color: "green" }} />
                    ) : (
                      <ClockCircleOutlined style={{ color: "red" }} />
                    )
                  }>
                  {`${e.name} was created at ${e.createdAt}`}
                </Timeline.Item>
              ))}
            </Timeline>

            <Button type="primary" onClick={showModal}>
              Create task
            </Button>
            <Modal title="Add task" visible={isModalVisible} footer={false}>
              <Form
                name="basic"
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 18,
                }}
                onFinish={onFinish}>
                <Form.Item
                  label="Task name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input task name!",
                    },
                  ]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Task time"
                  name="time"
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      max: 24,
                      required: true,
                      message: "Please input task time!",
                    },
                  ]}>
                  <InputNumber type="age" />
                </Form.Item>

                <Form.Item
                  label="Task description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input task description!",
                    },
                  ]}>
                  <TextArea />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 6,
                    span: 18,
                  }}>
                  <Checkbox onChange={(e) => setCompleted(e.target.checked)}>
                    Completed
                  </Checkbox>
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
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default Tasks;
