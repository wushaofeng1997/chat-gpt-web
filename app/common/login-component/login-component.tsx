"use client";

import styles from "./login-component.module.scss";
import { Input, message } from "antd";
import { useRouter } from "next/navigation";
import WavesSvg from "../../icons/waves.svg";
import localCache from "../../utils/cache";
import { getLogin, getRegister } from "../../service/login";
import {
  useCheckRulesForLogin,
  useCheckRulesForRegister,
} from "@/app/hooks/useCheckRules";
import { useAppConfig } from "../../store";
import React, { useCallback, useRef, useState } from "react";

const pageClass: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  overflow: "hidden",
  backgroundColor: "rgba(48, 79, 107)",
  height: "90vh",
};

const wavesStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
};

export function LoginComponent() {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const [isClickRightBtn, setIsClickRightBtn] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const config = useAppConfig();
  const updateConfig = config.update;
  const router = useRouter();

  const success = (content: string) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

  const error = (content: string) => {
    messageApi.open({
      type: "error",
      content,
    });
  };

  // 登录参数
  const [loginInfo, setLoginInfo] = useState({
    user: "",
    password: "",
    avatarUrl: "",
  });

  // 注册参数
  const [registerInfo, setRegister] = useState({
    Name: "",
    Telephone: "",
    Password: "",
  });

  const handleChange = useCallback((event: any) => {
    const { name, value } = event.target;
    setLoginInfo((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const handleRegisterChange = useCallback((event: any) => {
    const { name, value } = event.target;
    setRegister((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const HandleLoginClick = () => {
    const [isSuccess, content] = useCheckRulesForLogin(loginInfo);
    if (isSuccess) {
      // 调用接口
      getLogin(loginInfo).then(
        (res: any) => {
          if (res.data.token) {
            success(res.msg);
            localCache.setCache("token", res.data.token);
            if (res.msg === "登陆成功!") {
              // 登录保存userId
              updateConfig((config) => (config.userId = res.data.userId));
              router.push("/chat");
            }
          }
        },
        (reason: any) => {
          console.log("reason", reason);
        },
      );
      return;
    }
    error(content);
  };

  const HandleRegisterClick = () => {
    const [isSuccess, content] = useCheckRulesForRegister(registerInfo);
    if (isSuccess) {
      // 调用接口
      getRegister(registerInfo).then((res: any) => {
        success(res.msg);
      });
      return;
    }
    error(content);
  };

  const handleJumpRegisterClick = () => {
    if (loginRef.current) {
      setIsClickRightBtn(true);
    }
  };

  const handleJumpLoginClick = () => {
    if (loginRef.current) {
      setIsClickRightBtn(false);
    }
  };

  // ${styles["right-panel-active"]}
  const registerContainer = () => {
    return (
      <div
        ref={loginRef}
        className={`${styles["in-up"]} ${styles["right-panel-active"]}`}
      >
        {/* 第一 */}
        {signUpContainer()}
        {/* 第二 */}
        {signInContainer()}
        {/* 第三 */}
        {overlayContainer()}
      </div>
    );
  };
  const loginContainer = () => {
    return (
      <div ref={loginRef} className={`${styles["in-up"]}`}>
        {/* 第一 */}
        {signUpContainer()}
        {/* 第二 */}
        {signInContainer()}
        {/* 第三 */}
        {overlayContainer()}
      </div>
    );
  };

  const signUpContainer = () => {
    return (
      <div
        className={`${styles["form-container"]} ${styles["sign-up-container"]}`}
      >
        <div className={`${styles["myCenter"]}`}>
          <h1>注册</h1>
          <Input
            style={{ maxWidth: "80%" }}
            name="Telephone"
            type="text"
            value={registerInfo.Telephone}
            maxLength={30}
            placeholder="手机号"
            onChange={handleRegisterChange}
          />
          <Input
            style={{ maxWidth: "80%" }}
            name="Name"
            type="text"
            value={registerInfo.Name}
            maxLength={30}
            placeholder="用户名"
            onChange={handleRegisterChange}
          />
          <Input
            style={{ maxWidth: "80%" }}
            value={registerInfo.Password}
            name="Password"
            type="password"
            maxLength={30}
            placeholder="密码"
            onChange={handleRegisterChange}
          />
          {/* <input type="text" placeholder="验证码" disabled />

          <a style={{ margin: 0 }} href="#">
            获取验证码
          </a> */}
          <button onClick={HandleRegisterClick}>注册</button>
        </div>
      </div>
    );
  };

  const signInContainer = () => {
    return (
      <div
        className={`${styles["form-container"]} ${styles["sign-in-container"]}`}
      >
        <div className={`${styles["myCenter"]}`}>
          <h1>登录</h1>
          <Input
            style={{ maxWidth: "80%" }}
            type="text"
            maxLength={30}
            name="user"
            placeholder="用户名/手机号"
            value={loginInfo.user}
            onChange={handleChange}
          />
          <Input
            style={{ maxWidth: "80%" }}
            type="password"
            maxLength={30}
            placeholder="密码"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
          />
          <a href="#"></a>
          <button onClick={HandleLoginClick}>登录</button>
        </div>
      </div>
    );
  };

  const overlayContainer = () => {
    return (
      <div className={`${styles["overlay-container"]}`}>
        <div className={`${styles["overlay"]}`}>
          <div
            className={`${styles["overlay-panel"]} ${styles["myCenter"]} ${styles["overlay-left"]}`}
          >
            <h1>已有帐号？</h1>
            <p>请登录🚀</p>
            <button
              className={`${styles["ghost"]}`}
              onClick={handleJumpLoginClick}
            >
              登录
            </button>
          </div>
          <div
            className={`${styles["overlay-panel"]} ${styles["myCenter"]} ${styles["overlay-right"]}`}
          >
            <h1>没有帐号？</h1>
            <p>立即注册吧😃</p>
            <button
              className={`${styles["ghost"]}`}
              onClick={handleJumpRegisterClick}
            >
              注册
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={pageClass}>
      {contextHolder}
      <div
        className={`${styles["myCenter"]} ${styles["in-up-container"]} ${styles["my-animation-hideToShow"]}`}
      >
        <div className={styles["login-container"]}>
          {/* 登陆和注册 */}
          {isClickRightBtn ? registerContainer() : loginContainer()}
        </div>
      </div>
      <div style={wavesStyle}>
        <WavesSvg></WavesSvg>
      </div>
    </div>
  );
}
