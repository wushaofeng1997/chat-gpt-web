import { useState } from "react";

import zhCN from "antd/locale/zh_CN";

import styles from "./upload-avatar.module.scss";
import { updateAvatar, deleteAvatar } from "../service/login";
import { message, Upload, ConfigProvider } from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import { useAppConfig, ChatConfig } from "../store";
import {API_BASE_URL} from "../constant/index"

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传JPG/PNG文件!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("图片必须小于2MB!");
  }
  return isJpgOrPng && isLt2M;
};

// 自定义上传
const customRequest = (e: any, userId: string, updateConfig: any) => {
  const form = new FormData();
  form.append("file", e.file);
  form.append("id", userId);
  updateAvatar(form).then((res) => {
    if (res.data) {
      message.success(res.msg);
      e.onSuccess();
      updateConfig((config: ChatConfig) => (config.avatarUrl = res.data.url));
    }
  });
};

export function UploadAvatar(props: { avatarUrl: string }) {
  const config = useAppConfig();
  const updateConfig = config.update;
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: `${API_BASE_URL}${props.avatarUrl}`,
    },
  ]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onRemove = async (
    file: UploadFile,
    userId: string,
    updateConfig: any,
  ) => {
    const res = await deleteAvatar({ id: `${userId}` });
    console.log("res", res);
  };

  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles["upload-container"]}>
        <ImgCrop
          rotationSlider
          resetText={"重置"}
          modalOk={"确定"}
          modalCancel={"取消"}
        >
          <Upload
            action={props.avatarUrl}
            listType="picture-card"
            fileList={fileList}
            customRequest={(e) => customRequest(e, config.userId, updateConfig)}
            beforeUpload={beforeUpload}
            onChange={onChange}
            onPreview={onPreview}
            onRemove={(file) => onRemove(file, config.userId, updateConfig)}
          >
            {fileList.length < 1 && "+ 上传头像"}
          </Upload>
        </ImgCrop>
      </div>
    </ConfigProvider>
  );
}
