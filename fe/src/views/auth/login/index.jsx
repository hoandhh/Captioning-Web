import { Button, Card, Flex, Form, Input, Typography } from "antd";
import { LOGIN_API, PROFILE_API } from "../../../api/constants";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { Navigate, useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useApi from "../../../hooks/useApi";
import React, { useState } from "react";
const Login = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const Api = useApi();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const handleSubmit = async (values) => {
    setLoadingSubmit(true);
    const resLogin = await Api.Post(LOGIN_API, values);
    setLoadingSubmit(false);
    if (!resLogin) return;
    console.log("resLogin", resLogin);
    const resProfile = await Api.Get(PROFILE_API, {
      headers: {
        Authorization: `Bearer ${resLogin.access_token}`,
      },
    });
    console.log("resProfile", resProfile);
    if (!resProfile) return;
    const isLogged = signIn({
      auth: {
        token: resLogin.access_token,
        type: "Bearer",
      },
      userState: resProfile,
    });
    if (isLogged) navigate("/admin/dashboard");
  };
  if (isAuthenticated) return <Navigate to="/admin/dashboard" />;
  return (
    <Flex justify="center" className="!py-20">
      <Card className="shadow">
        <Flex vertical align="center" gap={32}>
          <Flex align="center" gap={16}>
            <Typography.Text className="text-[24px] text-primary">
              Đăng nhập
            </Typography.Text>
          </Flex>
          <Form
            onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
            className="w-[300px]"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên tài khoản!",
                },
              ]}
            >
              <Input size="large" placeholder="Tên tài khoản" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Mật khẩu" />
            </Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={loadingSubmit}
              className="w-full"
            >
              Đăng nhập
            </Button>
          </Form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Login;
