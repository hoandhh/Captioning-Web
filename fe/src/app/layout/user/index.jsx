import "../../../styles/user/layout/style.scss";
import { MdDashboard } from "react-icons/md";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;
import HeaderClient from "../user/header/index";
import SiderClient from "../user/sider/index";
import FooterClient from "../user/footer/index";
import { useState } from "react";
const LayoutClient = () => {
  const [headerInfo, setHeaderInfo] = useState({
    title: "Trang chủ",
    icon: <MdDashboard className="text-[24px]" />,
  });
  return (
    <Layout>
      <Sider className="custom-siderclient h-screen min-h-screen">
        <SiderClient setHeaderInfo={setHeaderInfo} />
      </Sider>
      <Layout>
        <Header className="custom-headerclient !px-[30px]">
          <HeaderClient headerInfo={headerInfo} />
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer className="!bg-white">
          <FooterClient />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutClient;
