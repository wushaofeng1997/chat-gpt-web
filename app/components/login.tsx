"use client";

import { useState } from "react";
import styles from "./login.module.scss";
import { LoginComponent } from "../common/login-component/login-component";
import { getLogin } from "../service/login";
import SunSvg from "../icons/sun.svg";
import MoonSvg from "../icons/moon.svg";

export function UserLogin() {
  const [loginInfo, setLoginInfo] = useState({
    user: 15651961133,
    password: "qwer1234",
  });

  getLogin(loginInfo).then((res) => {
    console.log("res", res);
  });

  const isDark = false;
  return (
    <div className={styles["page"]}>
      <div className={styles["weatherContainer"]}>
        <LoginComponent></LoginComponent>
        <div>
          {isDark ? (
            <MoonSvg className={styles["weather"]}></MoonSvg>
          ) : (
            <SunSvg className={styles["weather"]}></SunSvg>
          )}
        </div>
      </div>
      {/* 波浪样式 */}
      <svg
        className={styles["waves"]}
        viewBox="0 24 150 24"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <use
          className={styles["waves"]}
          xlinkHref="#wave"
          fill="#4579e2"
          x="50"
          y="0"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            from="-90 0"
            to="85 0"
            dur="15s"
            repeatCount="indefinite"
          />
        </use>
      </svg>
    </div>
  );
}
