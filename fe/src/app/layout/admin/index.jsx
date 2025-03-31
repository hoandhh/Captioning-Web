import "../../../styles/admin/layout/style.scss";
import { Layout } from "antd";
const { Header, Content, Sider } = Layout;
import { Outlet } from "react-router-dom";
import SiderAdmin from "./sider";
import HeaderAdmin from "./header";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
const LayoutAdmin = () => {
  const [headerInfo, setHeaderInfo] = useState({
    title: "Trang chủ",
    icon: <MdDashboard className="text-[24px]" />,
  });
  return (
    <Layout>
      <Sider className="custom-sideradmin min-h-screen">
        <SiderAdmin setHeaderInfo={setHeaderInfo} />
      </Sider>
      <Layout>
        <Header className="custom-headeradmin">
          <HeaderAdmin headerInfo={headerInfo} />
        </Header>
        <Content className="!px-[30px]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
