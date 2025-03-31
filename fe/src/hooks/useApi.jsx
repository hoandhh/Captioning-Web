import { Api } from "../api";
import { App } from "antd";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

const useApi = () => {
  const { message } = App.useApp();
  const authHeader = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  if (authHeader) Api.defaults.headers.common.Authorization = authHeader;
  else delete Api.defaults.headers.common.Authorization;

  const Result = (res) => {
    return res.data;
  };

  const Exception = (error) => {
    if (error.response.status === 400) {
      message.error("Có lỗi xảy ra, vui lòng thử lại sau");
      return { success: false };
    }
    if (error.response.status === 401) {
      signOut();
      navigate("/login", {
        replace: true,
      });
      return { success: false };
    }
    message.error("Lỗi hệ thống");
    return { success: false };
  };

  const Get = async (url, config) => {
    try {
      const res = await Api.get(url, config);
      return Result(res);
    } catch (e) {
      return Exception(e);
    }
  };

  const Post = async (url, data, config) => {
    try {
      const res = await Api.post(url, data, config);
      return Result(res);
    } catch (e) {
      return Exception(e);
    }
  };

  const Put = async (url, data, config) => {
    try {
      const res = await Api.put(url, data, config);
      return Result(res);
    } catch (e) {
      return Exception(e);
    }
  };

  const Delete = async (url, config) => {
    try {
      const res = await Api.delete(url, config);
      return Result(res);
    } catch (e) {
      return Exception(e);
    }
  };

  return {
    Get,
    Post,
    Put,
    Delete,
  };
};

export default useApi;
