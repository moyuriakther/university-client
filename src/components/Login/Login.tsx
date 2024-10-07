import { Form, Button, Alert, Typography, Row, Col, Input } from "antd";
import loginImage from "../../assets/login-image.png";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TUser, userLoggedIn } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const { Title } = Typography;

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [login, { isSuccess, isError }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    email: "moyuriakther@gmail.com",
    password: "12345678"
  };

  const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const result = await login(data).unwrap();
      const token = result?.data?.accessToken;
      const user = verifyToken(token) as TUser;
      dispatch(userLoggedIn({ user, token }));
      toast.success("Logged in", { id: toastId, duration: 1000 });
      navigate(`/dashboard`);
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong", { id: toastId, duration: 1000 });
    }
  };
  if (isSuccess) {
    <p>Logged in successfully</p>;
  }


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 login-page">
    <Row
      gutter={[16, 16]}
      className="w-full max-w-7xl login-row"
      justify="center"
      align="middle"
    >
      <Col
        xs={24}
        md={12} 
        className="flex justify-center md:justify-end px-4 image-col"
      >
        <img
          src={loginImage}
          alt="Login"
          className="login-image"
        />
      </Col>
      <Col
        xs={24} 
        md={12} 
        className="p-12 form-col"
      >
        <div className="form-container fade-in">
          <Title level={2} className="text-center mb-6">
            Login to Your Account
          </Title>
          {isError && (
            <Alert
              message="Login failed. Please check your credentials."
              type="error"
              showIcon
              className="mb-4"
            />
          )}
          <Form
            name="login"
            layout="vertical"
            initialValues={defaultValues}
            onFinish={onSubmit}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  </div>
  );
};

export default Login;
