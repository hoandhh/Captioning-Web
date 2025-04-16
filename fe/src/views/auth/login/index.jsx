import React, { useEffect, useState } from "react";
import { ConfigProvider, Button, Card, Form, Input, Typography } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import { LOGIN_API, PROFILE_API } from "../../../api/constants";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { Navigate, useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useApi from "../../../hooks/useApi";
import themeConfig from "../../../config/themeConfig";

const Login = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const Api = useApi();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, // thời gian hiệu ứng chạy
      once: true, // hiệu ứng chạy 1 lần khi cuộn vào view
    });
  }, []);

  const handleSubmit = async (values) => {
    setLoadingSubmit(true);
    const resLogin = await Api.Post(LOGIN_API, values);
    setLoadingSubmit(false);
    if (!resLogin) return;
    const resProfile = await Api.Get(PROFILE_API, {
      headers: {
        Authorization: `Bearer ${resLogin.access_token}`,
      },
    });
    if (!resProfile) return;
    signIn({
      auth: {
        token: resLogin.access_token,
        type: "Bearer",
      },
      userState: resProfile,
    });
    const role = resProfile.role;
    if (role === "admin") navigate("/admin/dashboard");
    else navigate("/");
  };

  if (isAuthenticated) return <Navigate to="/admin/dashboard" />;

  return (
    <ConfigProvider theme={themeConfig}>
      <div
        style={{
          background: themeConfig.token.colorBgLayout,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {/* Áp dụng hiệu ứng fade-up khi cuộn vào view */}
        <Card
          data-aos="fade-up"
          style={{
            width: "300px",
            background: themeConfig.token.colorBgBase,
            border: `1px solid ${themeConfig.token.colorBorder}`,
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          }}
          bodyStyle={{ padding: "24px" }}
        >
          <Typography.Title
            level={2}
            style={{
              color: themeConfig.token.colorTextHeading,
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            Đăng nhập
          </Typography.Title>
          <Form
            onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
            requiredMark={false}
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
            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={loadingSubmit}
                block
                style={{
                  background: themeConfig.token.colorPrimary,
                  borderColor: themeConfig.token.colorPrimary,
                }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default Login;
