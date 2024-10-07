/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Alert,
  Row,
  Col,
  notification,
} from "antd";
import {  CheckCircleOutlined } from "@ant-design/icons";
import { useGetAllCourseQuery } from "../../redux/features/course/courseApi";
import { useGetAllStudentsQuery } from "../../redux/features/student/studentApi";
import { useCreateEnrollCourseMutation } from "../../redux/features/enrollCourse/enrollCourseApi";

const { Title } = Typography;
const { Option } = Select;


const Course = () => {
  const [form] = Form.useForm();
  const {data:allCourses} = useGetAllCourseQuery(undefined);
  const {data: allStudents} = useGetAllStudentsQuery(undefined)
  const [createEnrollCourse, {isSuccess}] = useCreateEnrollCourseMutation()
  const courses = allCourses?.data
  // console.log(courses)

  const onFinish = (values: any) => {
    const selectedCourse = courses?.find((c: any) => c._id === values.course);
    const facultyId = selectedCourse?.faculty?._id
    const student = allStudents?.data?.find((student:any) =>student.email === values.email)
    if(!student){
      notification.error({
      message: "Student not found",
      description: `You Entered Wrong Email: ${values.email}`,
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      duration: 2,
      })
    }
    createEnrollCourse({
      course:values?.course,
      student: student?._id,
      faculty: facultyId,
      isEnrolled: true
    })
    
    form.resetFields();
  if(isSuccess){  notification.success({
      message: "Enrollment Successful!",
      description: `You have been successfully enrolled in ${values.course}`,
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      duration: 2,
    });}
  };

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <Title level={2}>Enroll in Courses</Title>
      <Row justify="center">
        <Col xs={24} md={18}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            {/* Student Name */}
            <Form.Item
              name="studentName"
              label="Student Name"
              rules={[
                { required: true, message: "Please input your name!" },
                { min: 3, message: "Name must be at least 3 characters long" },
              ]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            {/* Student Email */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            {/* Course Selection */}
            <Form.Item
              name="course"
              label="Select Course"
              rules={[{ required: true, message: "Please select a course!" }]}
            >
              <Select placeholder="Choose a course">
                {courses?.map((course:any) => (
                  <Option key={course._id} value={course._id}>
                    {course.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Enroll Now
              </Button>
            </Form.Item>
          </Form>

          {/* Hidden Success Message */}
          {isSuccess && (
            <Alert
              message="Enrollment Confirmed!"
              description="You have successfully enrolled in the selected course. You will receive further details via email."
              type="success"
              showIcon
              closable
              style={{ marginTop: "16px" }}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Course;
