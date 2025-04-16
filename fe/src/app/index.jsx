import Router from "./router";
import AuthProvider from "react-auth-kit/AuthProvider";
import store from "../lib/store";
import { App, ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import React from "react";
const RootApp = () => {
  return (
    <>
      <ConfigProvider locale={viVN}>
        <App>
          <AuthProvider store={store}>
            <Router />
          </AuthProvider>
        </App>
      </ConfigProvider>
    </>
  );
};

export default RootApp;
