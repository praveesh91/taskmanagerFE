import React, { useEffect, useState } from "react";
import { Card, Layout, Menu, message, Table } from "antd";

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
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
];

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
    } catch (error) {
      console.log(error);
    }
  };

  const data = users.map((e) => ({
    name: e.name,
    email: e.email,
    age: e.age,
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
