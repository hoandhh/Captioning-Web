import { Menu } from "antd";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
const items = [
  {
    key: "1",
    link: "/admin/dashboard",
    title: "Trang chủ",
    icon: MdDashboard,
  },
  {
    key: "2",
    link: "/admin/manage-accounts",
    title: "Quản lý tài khoản",
    icon: RiAdminFill,
  },
];

const SiderAdmin = ({ setHeaderInfo }) => {
  const handleClick = ({ key }) => {
    const selectedItem = items.find((item) => item.key === key);
    if (selectedItem) {
      setHeaderInfo({
        title: selectedItem.title,
        icon: <selectedItem.icon className="!text-[24px]" />,
      });
    }
  };
  return (
    <div className="h-screen min-h-screen bg-white">
      <div className="my-[16px]"></div>
      <div className="h-[calc(100vh_-_150px)] overflow-y-auto mt-[16px]">
        <Menu
          mode="inline"
          onClick={handleClick}
          items={items.map((item) => ({
            key: item.key,
            icon: <item.icon className="!text-[24px]" />,
            label: <Link to={item.link}>{item.title}</Link>,
          }))}
        />
      </div>
    </div>
  );
};

export default SiderAdmin;
