import { useState } from "react";
import { Avatar, Dropdown, Typography } from "antd";
import { UserOutlined, LockOutlined, LogoutOutlined } from "@ant-design/icons";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import ChangePassword from "../../../../views/auth/changePassword";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
const HeaderAdmin = ({ headerInfo }) => {
  const [changePassword, setChangePassword] = useState(false);
  const singOut = useSignOut();
  const authUser = useAuthUser();
  const handleChangePassword = () => {
    setChangePassword((prev) => !prev);
  };

  const handleClickUserAction = (key) => {
    if (key === "logout") {
      singOut();
      window.location.replace("/login");
    }
    if (key === "changePassword") {
      handleChangePassword();
    }
  };
  const menuItems = [
    {
      key: "changePassword",
      label: "Đổi mật khẩu",
      icon: <LockOutlined />,
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {headerInfo.icon}
        <h1>{headerInfo.title}</h1>
      </div>
      <div className="flex items-center">
        <Dropdown
          menu={{
            items: menuItems,
            onClick: ({ key }) => handleClickUserAction(key),
          }}
          trigger={["click"]}
        >
          <div className="cursor-pointer flex items-center gap-2">
            <Typography.Text strong>{authUser.username}</Typography.Text>
            <Avatar size="large" icon={<UserOutlined />} />
          </div>
        </Dropdown>
        <ChangePassword open={changePassword} onClose={handleChangePassword} />
      </div>
    </div>
  );
};

export default HeaderAdmin;
