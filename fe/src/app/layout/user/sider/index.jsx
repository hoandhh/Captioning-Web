import { Menu } from "antd";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { TbBrandAirtable } from "react-icons/tb";
import "../../../../styles/user/sider/style.scss";
const items = [
  {
    key: "1",
    link: "/",
    title: "Trang chủ",
    icon: MdDashboard,
  },
  {
    key: "2",
    link: "/caption-image",
    title: "Image Caption Generator",
    icon: TbBrandAirtable,
  },
];
const Sider = ({ setHeaderInfo }) => {
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
    <div className="my-sider h-screen min-h-screen bg-white">
      <div className="my-sider-content h-[calc(100vh_-_150px)] overflow-y-auto mt-[16px]">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
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

export default Sider;
