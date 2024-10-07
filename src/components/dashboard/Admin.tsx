/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from "react";
import { Form, Input, Button, Select, Typography, Row, Col, notification, DatePicker } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useCreateStudentMutation } from "../../redux/features/student/studentApi";
import { useCreateCourseMutation, useGetAllCourseQuery } from "../../redux/features/course/courseApi";
import { useCreateFacultyMutation, useGetAllFacultyQuery } from "../../redux/features/faculty/facultyApi";
import moment from "moment";


const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const AdminDashboard = () => {
  const [form] = Form.useForm();
  const [selectedForm, setSelectedForm] = useState<string>("student");

  const [createStudent, {isSuccess}] = useCreateStudentMutation();
  const [createCourse, {isSuccess: isCourseCreateSuccess, isError}] = useCreateCourseMutation();
  const [createFaculty,  {isSuccess: isFacultyCreateSuccess,}] = useCreateFacultyMutation();
  const {data} = useGetAllFacultyQuery(undefined);
  const {data:allCourses} = useGetAllCourseQuery(undefined);
// console.log(data.data)
console.log(isCourseCreateSuccess)

  const handleFormSubmit = async (values: any) => {
    switch (selectedForm) {
      case "student":
        try {
          await createStudent({
            password: values.password,
            student:{
                name: values.name,
                email: values.email,
                description: values.description
            }
          });
         if(isSuccess){ notification.success({
            message: "Student Created!",
            description: "New student has been successfully added.",
            icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
          });}
        } catch (error) {
            console.log(error)
          notification.error({ message: "Failed to Create Student" });
        }
        break;

      case "course":
        try {
           
          await createCourse(values);
          if(isCourseCreateSuccess || !isError){notification.success({
            message: "Course Created!",
            description: "New course has been successfully added.",
            icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
          });}
        } catch (error) {
            console.log(error)
          notification.error({ message: "Failed to Create Course" });
        }
        break;

      case "faculty":
        try {
            const formattedOfficeHours = `${moment(values.officeHours[0]).format(
                "ddd, MMM D YYYY, h:mm A"
              )} - ${moment(values.officeHours[1]).format("ddd, MMM D YYYY, h:mm A")}`;        
          await createFaculty({
            password: values.password,
            faculty:{
                name: values.name,
                email: values.email,
                designation: values.designation,
                officeHours: formattedOfficeHours,
                contact: values.contact,
                subjects: values.subjects
            }
          });
       if(isFacultyCreateSuccess){ notification.success({
            message: "Faculty Created!",
            description: "New faculty member has been successfully added.",
            icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
          });}
        } catch (error) {
            console.log(error)
          notification.error({ message: "Failed to Create Faculty" });
        }
        break;

      default:
        break;
    }

    form.resetFields();
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={2}>Admin Dashboard</Title>
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Button block type="primary" onClick={() => setSelectedForm("student")}>
            Create Student
          </Button>
        </Col>
        <Col xs={24} md={8}>
          <Button block type="primary" onClick={() => setSelectedForm("course")}>
            Create Course
          </Button>
        </Col>
        <Col xs={24} md={8}>
          <Button block type="primary" onClick={() => setSelectedForm("faculty")}>
            Create Faculty
          </Button>
        </Col>
      </Row>

      <div style={{ marginTop: "24px" }}>
        <Row justify="center">
          <Col xs={24} md={12}>
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
              {selectedForm === "student" && (
                <>
                  <Title level={4}>Create Student</Title>
                  <Form.Item name="name" label="Student Name" rules={[{ required: true, message: "Please input student name!" }]}>
                    <Input placeholder="Enter student name" />
                  </Form.Item>
                  <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input email!", type: "email" }]}>
                    <Input placeholder="Enter student email" />
                  </Form.Item>
                  <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input the password!" },{ min: 8, message: "Password must be at least 8 characters long" },]}>
                    <Input.Password placeholder="Enter password" />
                  </Form.Item>
                  <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please input a description!" },]}>
                    <Input.TextArea rows={4} placeholder="Enter student description" />
                  </Form.Item>
                </>
              )}

              {selectedForm === "course" && (
                <>
                  <Title level={4}>Create Course</Title>
                  <Form.Item name="name" label="Course Name" rules={[{ required: true, message: "Please input course name!" }]}>
                    <Input placeholder="Enter course name" />
                  </Form.Item>
                  <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please input a description!" },]}>
                    <Input.TextArea rows={4} placeholder="Enter student description" />
                  </Form.Item>
                  <Form.Item name="faculty" label="Faculty" rules={[{ required: true, message: "Please select faculty!" }]}>
                    <Select placeholder="Select a faculty">
                     {data?.data?.map((faculty: any) =><Option key={faculty?._id} value={faculty?._id}>{faculty?.name}</Option>)}
                    </Select>
                  </Form.Item>
                </>
              )}

              {selectedForm === "faculty" && (
                <>
                  <Title level={4}>Create Faculty</Title>
                  <Form.Item name="name" label="Faculty Name" rules={[{ required: true, message: "Please input faculty name!" }]}>
                    <Input placeholder="Enter faculty name" />
                  </Form.Item>
                  <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input email!", type: "email" }]}>
                    <Input placeholder="Enter student email" />
                  </Form.Item>
                  <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input the password!" },{ min: 8, message: "Password must be at least 8 characters long" },]}>
                    <Input.Password placeholder="Enter password" />
                  </Form.Item>
                  <Form.Item name="designation" label="Designation" rules={[{ required: true, message: "Please input a description!" },]}>
                    <Input placeholder="Enter faculty Designation" />
                  </Form.Item>
                  <Form.Item name="contact" label="Contact Number" rules={[{ required: true, message: "Please input the contact number!" },{ len: 11, message: "Contact number must be 11 digits long" },]}>
                    <Input placeholder="Enter contact number" />
                 </Form.Item>
                 <Form.Item
              name="officeHours"
              label="Office Hours"
              rules={[
                { required: true, message: "Please select the office hours!" },
              ]}
            >
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                placeholder={["Start Time", "End Time"]}
                style={{ width: "100%" }}
              />
            </Form.Item>
                 <Form.Item name="subjects" label="Subjects Taught" rules={[{ required: true, message: "Please select at least one subject!" },]}>
                    <Select mode="multiple" placeholder="Select subjects" allowClear>
                        {
                            allCourses?.data?.map((course: any) => <Option key={course._id} value={course?.name}>{course?.name}</Option>)
                        }
                    </Select>
                 </Form.Item>
                </>
              )}

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Create {selectedForm}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminDashboard;
