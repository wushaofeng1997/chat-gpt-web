import { Avatar } from "antd";

export function InterAvatar() {
  const url = "http://mms1.baidu.com/it/u=2958294026,2148608998&fm=253&app=138&f=JPEG";
  return <Avatar src={<img src={url} alt="avatar" />} />;
}
