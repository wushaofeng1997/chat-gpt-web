"use client";

import request from "./index";

// 登录接口
export function getLogin(data: any) {
  return request.post({
    url: "/api/auth/login",
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// 注册接口

export function getRegister(data: any) {
  return request.post({
    url: "/api/auth/register",
    data,
  });
}

// 用户信息

export function getUserInfo(params: any) {
  return request.get({
    url: "/api/auth/info",
    params,
  });
}

// 上传头像接口

export function updateAvatar(data: any) {
  return request.post({
    url: "/upload",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// 删除头像接口

export function deleteAvatar(data: any) {
  return request.delete({
    url: "/upload",
    data,
  });
}
