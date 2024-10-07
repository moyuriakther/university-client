import { Row, Col, Card } from "antd";
import { Bar, Pie } from "@ant-design/charts";
import { useGetAllStudentsQuery } from "../../redux/features/student/studentApi";
import { useGetAllFacultyQuery } from "../../redux/features/faculty/facultyApi";
import { useGetAllCourseQuery } from "../../redux/features/course/courseApi";
import "./dashboard.css";

export default function Dashboard() {
  const {data: totalStudents} = useGetAllStudentsQuery(undefined);
  const {data: totalFaculty} = useGetAllFacultyQuery(undefined);
  const {data: totalCourses} = useGetAllCourseQuery(undefined)

  // Chart configuration for the Bar and Pie charts
  const barConfig = {
    data: [
      { category: "Students", value: totalStudents?.data.length },
      { category: "Faculty", value: totalFaculty?.data.length },
      { category: "Courses", value: totalCourses?.data.length },
    ],
    xField: "category",
    yField: "value",
    color: ["#1979C9", "#D62A0D", "#FAA219"],
    autoFit: true,
  };

  const pieConfig = {
    data: [
      { type: "Students", value: totalStudents?.data.length },
      { type: "Faculty", value: totalFaculty?.data.length  },
      { type: "Courses", value: totalCourses?.data.length  },
    ],
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    autoFit: true,
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      {/* Responsive layout with Ant Design Grid */}
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Total Students"
            bordered={false}
            className="dashboard-card"
          >
            <p>{totalStudents?.data.length}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Total Faculty"
            bordered={false}
            className="dashboard-card"
          >
            <p>{totalFaculty?.data.length}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Total Courses"
            bordered={false}
            className="dashboard-card"
          >
            <p>{totalCourses?.data.length}</p>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col xs={24} md={12}>
          <Card
            title="Data Breakdown (Bar Chart)"
            bordered={false}
            className="chart-card"
          >
            <Bar {...barConfig} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="Data Breakdown (Pie Chart)"
            bordered={false}
            className="chart-card"
          >
            <Pie {...pieConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
