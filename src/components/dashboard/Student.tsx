import { Card, Col, Row, Collapse, Tooltip, Typography, Tag } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useGetAllStudentsQuery } from "../../redux/features/student/studentApi";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const coursesData = [
  {
    id: 1,
    courseName: "Advanced Algorithms",
    grade: "A",
    professor: "Dr. Alice Johnson",
    contact: "alice.johnson@example.com",
    description: "Study of advanced algorithms including graph theory, dynamic programming, and NP-complete problems.",
  },
  {
    id: 2,
    courseName: "Database Systems",
    grade: "B+",
    professor: "Prof. John Doe",
    contact: "john.doe@example.com",
    description: "Exploration of relational databases, SQL queries, and database management systems.",
  },
  {
    id: 3,
    courseName: "Software Engineering",
    grade: "A-",
    professor: "Dr. Emily Carter",
    contact: "emily.carter@example.com",
    description: "A comprehensive introduction to software development lifecycle, Agile methodology, and project management.",
  },
];

const upcomingEvents = [
  {
    eventName: "Midterm Exams",
    date: "October 15, 2024",
  },
  {
    eventName: "Project Presentation",
    date: "November 10, 2024",
  },
  {
    eventName: "Graduation Ceremony",
    date: "December 20, 2024",
  },
];

export default function Student() {
  const {data: students} = useGetAllStudentsQuery(undefined)
  console.log(students)
  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>My Courses</Title>
      <Row gutter={[16, 16]}>
        {coursesData.map((course) => (
          <Col xs={24} md={8} key={course.id}>
            <Card
              title={course.courseName}
              extra={
                <Tooltip title="More details">
                  <InfoCircleOutlined />
                </Tooltip>
              }
              style={{ borderRadius: "8px" }}
              actions={[<Tag color="blue">Grade: {course.grade}</Tag>]}
            >
              <Collapse ghost>
                <Panel header="Course Details" key="1">
                  <p>{course.description}</p>
                  <Text strong>Professor: </Text> {course.professor}
                  <br />
                  <Text strong>Contact: </Text>
                  {course.contact}
                </Panel>
              </Collapse>
            </Card>
          </Col>
        ))}
      </Row>
      <Title level={2} style={{ marginTop: "40px" }}>
        Upcoming Events
      </Title>
      <Row gutter={[16, 16]}>
        {upcomingEvents.map((event, index) => (
          <Col xs={24} md={8} key={index}>
            <Card
              title={event.eventName}
              style={{
                borderRadius: "8px",
                textAlign: "center",
                backgroundColor: "#f0f2f5",
              }}
            >
              <Text strong>{event.date}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
