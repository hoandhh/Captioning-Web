import { useEffect, useState } from "react";
import { Avatar, Dropdown, Typography, Button, Drawer } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import ChangePassword from "../../../../views/auth/changePassword";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = ({ headerInfo }) => {
  const [changePassword, setChangePassword] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const signOut = useSignOut();
  const authUser = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChangePassword = () => {
    setChangePassword((prev) => !prev);
  };

  const handleClickUserAction = (key) => {
    if (key === "logout") {
      signOut();
      navigate("/login");
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

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  return (
    <header
      className="md:px-6 h-full flex justify-between items-center sticky top-0 z-50"
      data-aos="fade-down"
    >
      {/* Left: Logo + Title + Links */}
      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          {headerInfo?.icon}
          <h1 className="text-base md:text-xl font-semibold text-[#5a3e36]">
            {headerInfo?.title}
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-[#4a3d35] font-medium">
          <Link
            to="/"
            className="hover:text-[#7e5c49] transition-colors duration-300"
          >
            Trang chủ
          </Link>
          <Link
            to="/about"
            className="hover:text-[#7e5c49] transition-colors duration-300"
          >
            Về chúng tôi
          </Link>
          <Link
            to="/caption-image"
            className="hover:text-[#7e5c49] transition-colors duration-300"
          >
            Caption ảnh
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-[#4a3d35]"
          onClick={toggleDrawer}
        >
          <MenuOutlined />
        </button>
      </div>

      {/* Right: Avatar or Login/Register */}
      <div className="flex items-center">
        {!authUser ? (
          <div className="flex gap-2 md:gap-3">
            <Button type="primary" onClick={() => navigate("/login")}>
              Đăng nhập
            </Button>
            <Button onClick={() => navigate("/register")}>Đăng ký</Button>
          </div>
        ) : (
          <Dropdown
            menu={{
              items: menuItems,
              onClick: ({ key }) => handleClickUserAction(key),
            }}
            trigger={["click"]}
          >
            <div className="cursor-pointer text-white flex items-center gap-2">
              <Typography.Text strong>{authUser.username}</Typography.Text>
              <Avatar size="large" icon={<UserOutlined />} />
            </div>
          </Dropdown>
        )}
        <ChangePassword open={changePassword} onClose={handleChangePassword} />
      </div>

      {/* Drawer menu for mobile */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={toggleDrawer}
        open={openDrawer}
      >
        <div className="flex flex-col gap-4 text-[#4a3d35] font-medium">
          <Link to="/" onClick={toggleDrawer}>
            Trang chủ
          </Link>
          <Link to="/about" onClick={toggleDrawer}>
            Về chúng tôi
          </Link>
          <Link to="/caption-image" onClick={toggleDrawer}>
            Caption ảnh
          </Link>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
