import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { HOME_URL } from "./constants";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";

const { Sider, Content } = Layout;

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout className="mt-16" style={{ height: "calc(100vh - 64px)" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className="fixed left-0 bottom-0 top-0"
        >
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
            <Menu.Item className="w-full" key="home">
              <Link className="w-full" to="/">
                Home
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content className="p-6 my-6 mx-4 bg-white overflow-auto">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export { HOME_URL };
