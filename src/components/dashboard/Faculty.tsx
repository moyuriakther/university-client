/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Table, Input, Collapse, Typography, Tag, TableProps } from "antd";
import { DownOutlined , SearchOutlined } from "@ant-design/icons";
import { useGetAllFacultyQuery } from "../../redux/features/faculty/facultyApi";

const { Title } = Typography;
const { Panel } = Collapse;

export default function Faculty() {
  const {data: facultyData} = useGetAllFacultyQuery(undefined)
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = facultyData?.data?.filter((faculty:any) =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: TableProps<any>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      responsive: ["md"],
      filters: [
        { text: "Professor", value: "Professor" },
        { text: "Assistant Professor", value: "Assistant Professor" },
        { text: "Lecturer", value: "Lecturer" },
      ],
      onFilter: (value: any, record: any) =>
        record.designation === value,
      
    },
    {
      title: "Subjects", 
      dataIndex: "subjects",
      key: "subjects",
      responsive: ["md"],
      render: (subjects: string[]) => (
        <>
          {subjects.map((subject) => (
            <Tag color="blue" key={subject}>
              {subject}
            </Tag>
          ))}
        </>
      ),
    },
  ];
  const expandedRowRender = (record: any) => (
    <Collapse
      expandIcon={({ isActive }) => (
        <DownOutlined rotate={isActive ? 180 : 0} />
      )}
    >
      <Panel header="More Info" key={record.key}>
        <p>
          <strong>Office Hours:</strong> {record.officeHours}
        </p>
        <p>
          <strong>Contact:</strong> {record.contact}
        </p>
      </Panel>
    </Collapse>
  );

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Faculty Overview</Title>
      <Input
        placeholder="Search by faculty name"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "16px", width: "300px" }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        rowKey="key"
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
    </div>
  )
}
