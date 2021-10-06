import React, { useState, useEffect, useRef } from "react";
import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";
import customInterceptors from "../api/index";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
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
  Card,
} from "antd";

const { TextArea } = Input;
const { Content } = Layout;

function Tasks() {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [form] = Form.useForm();
  const checkboxRef = useRef();

  const [tasks, setTasks] = useState([]);
  const [taskById, setTaskById] = useState();
  const [edit, setEdit] = useState(false);
  const [reload, setReload] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getTasks();
    return () => {};
  }, [reload]);

  const showModal = (id, action) => {
    console.log(id);
    action === "edit" && getTaskById(id);
    action === "create" &&
      form.setFieldsValue({
        name: "",
        time: "",
        description: "",
      });
    action === "create" && (checkboxRef.current.state.checked = false);

    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEdit(false);
  };

  const getTasks = async () => {
    try {
      const res = await customInterceptors.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTaskById = async (id) => {
    try {
      const { data } = await customInterceptors.get(`/task/${id}`);
      console.log(data);
      setTaskById(data);
      form.setFieldsValue({
        name: data?.name,
        time: data?.time,
        description: data?.description,
      });
      checkboxRef.current.state.checked = data?.completed;
      setEdit(true);
    } catch (error) {
      message.error("Unable to fetch the selected task details");
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

  const onFinishEdit = async (values) => {
    try {
      values.completed = completed;
      const res = await customInterceptors.patch(
        `/task/${taskById._id}`,
        values
      );
      setIsModalVisible(false);
      setReload(!reload);
      message.success("Task updated successfully");
    } catch (error) {
      message.error("Unable to update the task");
    }
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
          <div>
            <Card
              title="List of tasks"
              extra={
                <Button type="primary" onClick={() => showModal("", "create")}>
                  Create task
                </Button>
              }>
              {" "}
              <Timeline>
                {tasks.map((e) => (
                  <div key={e._id}>
                    <Timeline.Item
                      dot={
                        e.completed ? (
                          <CheckOutlined style={{ color: "green" }} />
                        ) : (
                          <ClockCircleOutlined style={{ color: "red" }} />
                        )
                      }>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}>
                        <p>
                          {`${e.name} was created at ${moment(
                            new Date(e.createdAt)
                          ).format("LLLL")} and updated on ${moment(
                            new Date(e.updatedAt)
                          ).format("LLLL")}`}{" "}
                        </p>
                        <Button
                          type="dashed"
                          onClick={() => showModal(e._id, "edit")}>
                          Edit
                        </Button>
                      </div>
                    </Timeline.Item>
                  </div>
                ))}
              </Timeline>
            </Card>

            <Modal title="Add task" visible={isModalVisible} footer={false}>
              <Form
                form={form}
                name="basic"
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 18,
                }}
                onFinish={edit ? onFinishEdit : onFinish}>
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
                  <Checkbox
                    // checked={edit && taskById.completed}
                    ref={checkboxRef}
                    onChange={(e) => setCompleted(e.target.checked)}>
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
      <FooterLayout />
    </Layout>
  );
}

export default Tasks;
