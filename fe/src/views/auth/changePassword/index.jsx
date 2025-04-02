import { useState } from "react";
import useApi from "../../../hooks/useApi";
import { CHANGE_PASSWORD } from "../../../api/constants";
import { App, Form, Input, Modal } from "antd";

const ChangePassword = ({ open, onClose }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const Api = useApi();

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose();
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    const res = await Api.Post(CHANGE_PASSWORD, values);
    setLoading(false);
    if (res.status === 400) {
      message.error(res.data.error);
      handleClose();
    }
    if (res.message) {
      message.success("Đổi mật khẩu thành công!");
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      keyboard={false}
      maskClosable={false}
      okText="Đổi mật khẩu"
      onCancel={handleClose}
      onOk={() => form.submit()}
      okButtonProps={{ loading }}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Mật khẩu cũ"
          name="current_password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu cũ!",
            },
          ]}
        >
          <Input.Password size="large" placeholder="Mật khẩu cũ" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu mới"
          name="new_password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới!",
            },
          ]}
        >
          <Input.Password size="large" placeholder="Mật khẩu mới" />
        </Form.Item>
        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirm"
          dependencies={["new_password"]}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu mới!",
            },
            {
              validator: (_, value) => {
                if (!value || form.getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            },
          ]}
        >
          <Input.Password size="large" placeholder="Xác nhận mật khẩu mới" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePassword;
