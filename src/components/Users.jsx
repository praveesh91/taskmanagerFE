import React, { useEffect, useState } from "react";
import { Button, Card, Layout, Menu, message, Table } from "antd";

import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";
import customInterceptors from "../api/index";

const { Content } = Layout;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Contact No.",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Experiance",
    dataIndex: "experiance",
    key: "experiance",
  },
  {
    title: "Action",
    key: "delete",
    render(text, record) {
      console.log({ text });
      return {
        children: (
          <Button onClick={handleDelete} danger>
            Delete
          </Button>
        ),
      };
    },
  },
];

const handleDelete = () => {};

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
    return () => {};
  }, []);

  const getUsers = async () => {
    try {
      const res = await customInterceptors.get("/users");
      setUsers(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const data = users.map((e) => ({
    name: e.name,
    email: e.email,
    age: e.age,
    phone: e.phone,
    experiance: e.experiance,
  }));
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
            <Card title="List of users">
              <Table columns={columns} dataSource={data} />
            </Card>
          </div>
        </div>
      </Content>
      <FooterLayout />
    </Layout>
  );
};

export default Users;
