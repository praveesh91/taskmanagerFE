import React, { useState } from "react";
import { Layout, Space, DatePicker, Card, Button, message } from "antd";
import fileSaver from "file-saver";
import xlsx from "xlsx";
import customInterceptors from "../api/index";

import FooterLayout from "./FooterLayout";
import HeaderLayout from "./HeaderLayout";
import { ExportToExcel } from "./ExportToExcel";

const Reports = () => {
  const { Content } = Layout;
  const { RangePicker } = DatePicker;

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [tasklist, setTasklist] = useState([]);

  const fileName = "demo";

  const handleDate = (date, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  const handleSubmit = async (date, dateString) => {
    try {
      const { data } = await customInterceptors.get("/tasks/reports", {
        params: {
          startDate: dateString[0],
          endDate: dateString[1],
        },
      });
      console.log("object", data);
      setTasklist(data.data);
    } catch (error) {
      message.error("Download error");
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
          <Card title={"Generate report"}>
            <Space>
              <RangePicker onChange={handleSubmit} />
              <ExportToExcel apiData={tasklist} fileName={fileName} />
            </Space>
          </Card>
        </div>
      </Content>
      <FooterLayout />
    </Layout>
  );
};

export default Reports;
