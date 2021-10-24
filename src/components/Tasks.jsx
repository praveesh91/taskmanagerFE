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
  Popconfirm,
  Card,
  DatePicker,
  Select,
  Empty,
  Table,
} from "antd";

const { Option } = Select;
const { TextArea } = Input;
const { Content } = Layout;

function Tasks() {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [form] = Form.useForm();
  const checkboxRef = useRef();
  const dateFormat = "YYYY/MM/DD";

  const [tasks, setTasks] = useState([]);
  const [taskById, setTaskById] = useState();
  const [edit, setEdit] = useState(false);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getTasks();
    return () => {};
  }, [reload]);

  const columns = [
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Jira Id",
      dataIndex: "jiraId",
      key: "jiraId",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render(text) {
        return {
          children: (
            <span>{`${moment(new Date(text)).format("DD/MM/YYYY")}`}</span>
          ),
        };
      },
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render(text) {
        return {
          children: <span>{`${text} hours`}</span>,
        };
      },
    },

    {
      title: "Action",
      key: "delete",
      render(text, record) {
        return {
          children: (
            <Button type="dashed" onClick={() => showModal(record.id, "edit")}>
              Edit
            </Button>
          ),
        };
      },
    },
  ];

  const data = tasks.map((e) => ({
    project: e.project,
    jiraId: e.jiraId,
    description: e.description,
    createdAt: e.createdAt,
    time: e.time,
    date: e.date,
    id: e._id,
  }));

  const showModal = (id, action) => {
    action === "edit" && getTaskById(id);
    action === "create" &&
      form.setFieldsValue({
        name: "",
        time: "",
        description: "",
      });
    // action == "create" && checkboxRef?.current?.state?.checked === false;

    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // setEdit(false);
  };

  const getTasks = async () => {
    setLoading(true);
    try {
      const res = await customInterceptors.get("/tasks");
      setTasks(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getTaskById = async (id) => {
    try {
      const { data } = await customInterceptors.get(`/task/${id}`);
      setTaskById(data);
      form.setFieldsValue({
        time: data?.time,
        description: data?.description,
        jiraId: data?.jiraId,
        // date: "12/09/2011",
        availability: data?.availability,
        category: data?.category,
        comments: data?.comments,
        plannedHours: data?.plannedHours,
        project: data?.project,
        status: data?.status,
        storyPoints: data?.storyPoints,
        timerUsed: data?.timerUsed,
      });
      checkboxRef.current.state.checked = data?.timerUsed;
      setEdit(true);
    } catch (error) {
      message.error("Unable to fetch the selected task details");
    }
  };
  console.log(moment(new Date(taskById?.date)).format("DD/MM/YYYY").toString());

  const onFinish = async (values) => {
    console.log({ values });
    setLoading(true);

    try {
      values.timerUsed = completed;
      const res = await customInterceptors.post("/tasks", values);
      setIsModalVisible(false);
      setLoading(false);
      setReload(!reload);
      message.success(res.data);
    } catch (error) {
      console.log(error);
      message.error("Unable to create the task");
    } finally {
      setLoading(false);
    }
  };

  const onFinishEdit = async (values) => {
    setLoading(true);

    try {
      values.timerUsed = completed;
      const res = await customInterceptors.patch(
        `/task/${taskById._id}`,
        values
      );
      setIsModalVisible(false);
      setReload(!reload);
      setLoading(false);
      message.success("Task updated successfully");
    } catch (error) {
      message.error("Unable to update the task");
    }
  };
  console.log({ tasks });
  const handleDeleteTask = async (id) => {
    setLoading(true);

    try {
      const res = await customInterceptors.delete(`/task/${id}`);
      setReload(!reload);
      setLoading(false);
      message.success("Task deleted successfully");
    } catch (error) {
      message.error("Unable to delete the task");
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
              loading={loading}
              title="Last week tasks"
              extra={
                <Button type="primary" onClick={() => showModal("", "create")}>
                  Create task
                </Button>
              }>
              {" "}
              {tasks ? (
                <Timeline>
                  {tasks.map((e) => (
                    <div key={e._id}>
                      <Timeline.Item
                        dot={
                          e.status === "completed" ? (
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
                            {`${e.jiraId} was created at ${moment(
                              new Date(e.createdAt)
                            ).format("LLLL")} and it is  ${e.status}`}
                          </p>
                          <Space>
                            <Button
                              type="dashed"
                              onClick={() => showModal(e._id, "edit")}>
                              Edit
                            </Button>
                            <Popconfirm
                              placement="left"
                              title="Are you sure to delete this task?"
                              onConfirm={() => handleDeleteTask(e._id)}
                              okText="Yes"
                              cancelText="No">
                              <Button danger>Delete</Button>
                            </Popconfirm>
                          </Space>
                        </div>
                      </Timeline.Item>
                    </div>
                  ))}
                </Timeline>
              ) : (
                <Empty />
              )}
            </Card>
            <Card title="Last month tasks">
              <Table columns={columns} dataSource={data} />
            </Card>

            <Modal title="Add task" visible={isModalVisible} footer={false}>
              <Form
                form={form}
                name="basic"
                labelCol={{
                  span: 7,
                }}
                wrapperCol={{
                  span: 17,
                }}
                onFinish={edit ? onFinishEdit : onFinish}>
                <Form.Item
                  label="Project name"
                  name="project"
                  rules={[
                    {
                      required: true,
                      message: "Please input project name!",
                    },
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Date"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "Please input date!",
                    },
                  ]}>
                  <DatePicker
                    // defaultValue={`${moment(new Date(taskById?.date)).format(
                    //   "DD/MM/YYYY"
                    // )}`}
                    // defaultValue={moment(
                    //   moment(new Date(data.date))
                    //     .format("DD/MM/YYYY")
                    //     .toString(),
                    //   dateFormat
                    // )}
                    format={dateFormat}
                    picker="date"
                  />
                </Form.Item>
                <Form.Item
                  label="Availability"
                  name="availability"
                  rules={[
                    {
                      required: true,
                      message: "Please input availability!",
                    },
                  ]}>
                  <Select>
                    <Option value="half">Half day</Option>
                    <Option value="leave">Leave</Option>
                    <Option value="holiday">Holiday</Option>
                    <Option value="festival">Festival holiday</Option>
                    <Option value="sick">Sick leave</Option>
                    <Option value="full">Full day</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Please input task category!",
                    },
                  ]}>
                  <Select>
                    <Option value="development">Development</Option>
                    <Option value="bug fixing">Bug fixing</Option>
                    <Option value="meeting">Meeting</Option>
                    <Option value="awaiting task">
                      Awaiting for next task
                    </Option>
                    <Option value="testing">Testing</Option>
                    <Option value="working with onsite">
                      Working with onsite team
                    </Option>
                    <Option value="dependency">Dependency</Option>
                    <Option value="kt">KT and system study</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="JIRA Id"
                  name="jiraId"
                  rules={[
                    {
                      required: true,
                      message: "Please input JIRA id!",
                    },
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Story points"
                  name="storyPoints"
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      max: 24,
                      required: true,
                      message: "Please input story points!",
                    },
                  ]}>
                  <InputNumber />
                </Form.Item>

                <Form.Item
                  label="Planned hours"
                  name="plannedHours"
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      max: 24,
                    },
                  ]}>
                  <InputNumber />
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
                  label="Status"
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: "Please input task status!",
                    },
                  ]}>
                  <Select>
                    <Option value="open">Open</Option>
                    <Option value="in-progress">In progress</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="hold">On hold</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Actual time"
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
                  <InputNumber />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 7,
                    span: 17,
                  }}>
                  <Checkbox
                    // checked={edit && taskById.completed}
                    ref={checkboxRef}
                    onChange={(e) => setCompleted(e.target.checked)}>
                    Timer used
                  </Checkbox>
                </Form.Item>
                <Form.Item label="Why timer not used?" name="noTimerReason">
                  <TextArea />
                </Form.Item>
                <Form.Item label="Other comments" name="comments">
                  <TextArea />
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
