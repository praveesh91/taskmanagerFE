import React from "react";
import { Calendar, Card, Badge, Layout } from "antd";
import HeaderLayout from "./HeaderLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from "./Login.module.css";

const { Content } = Layout;

const Attendance = () => {
  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [{ type: "success", content: "Present" }];
        break;
      case 10:
        listData = [{ type: "error", content: "Absent" }];
        break;
      case 15:
        listData = [{ type: "warning", content: "Weekend" }];
        break;
      default:
    }
    return listData || [];
  }

  function dateCellRender(value) {
    console.log(value.date());
    const listData = getListData(value);
    return (
      <ul className={styles.events}>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  function getMonthData(value) {
    console.log({ value });
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className={styles.notesMonth}>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  return (
    <Layout>
      <HeaderLayout />
      <Content
        className="site-layout"
        style={{ padding: "20px 50px", marginTop: 64 }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}>
          <Card title="Attendance report">
            <div className={styles.calendar}>
              <Calendar
                onPanelChange={onPanelChange}
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
              />
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default Attendance;
