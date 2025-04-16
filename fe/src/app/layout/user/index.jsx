import "../../../styles/user/layout/style.scss";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Footer, Content } = Layout;
import HeaderClient from "../user/header/index";
import FooterClient from "../user/footer/index";

const LayoutClient = () => {
  return (
    <Layout>
      <Header className="header-layout">
        <HeaderClient />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>
        <FooterClient />
      </Footer>
    </Layout>
  );
};

export default LayoutClient;
