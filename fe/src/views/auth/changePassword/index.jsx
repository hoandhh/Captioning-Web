import { useState } from "react";
import useApi from "../../../hooks/useApi";
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
    setLoading(true);
    const res = await Api.Get(123123, values);
    setLoading(false);
    if (res) {
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
          name="oldPassword"
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
          name="password"
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
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu mới!",
            },
            {
              validator: (_, value) => {
                if (!value || form.getFieldValue("password") === value) {
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
