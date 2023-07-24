"use client";

import React from "react";
import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";
import { UserHeader } from "./components/user-header";
import WavesSvg from "./icons/waves.svg";

import { getServerSideConfig } from "./config/server";
import { LoginComponent } from "./common/login-component/login-component";
import { LoginHeader } from "./common/login-header/login-header";
import { Layout } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const serverConfig = getServerSideConfig();

const pageContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

export default async function App() {
  return (
    <>
      <Layout style={pageContainerStyle}>
        <Header
          style={{
            padding: 0,
            height: "10%",
            background: "rgb(48, 79, 107)",
          }}
        >
          <LoginHeader></LoginHeader>
        </Header>
        <Content style={{ height: "100vh" }}>
          <div
            style={{
              minHeight: 360,
            }}
          >
            <div>
              <LoginComponent></LoginComponent>
              {serverConfig?.isVercel && <Analytics />}
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}
