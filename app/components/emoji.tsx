import EmojiPicker, {
  Emoji,
  EmojiStyle,
  Theme as EmojiTheme,
} from "emoji-picker-react";

import { Avatar as CustomAvatarCpn } from "antd";

import { ModelType } from "../store";

import { UserOutlined } from "@ant-design/icons";
import BotIcon from "../icons/bot.svg";
import BlackBotIcon from "../icons/black-bot.svg";

export function getEmojiUrl(unified: string, style: EmojiStyle) {
  return `https://cdn.staticfile.org/emoji-datasource-apple/14.0.0/img/${style}/64/${unified}.png`;
}

export function AvatarPicker(props: {
  onEmojiClick: (emojiId: string) => void;
}) {
  return (
    <EmojiPicker
      lazyLoadEmojis
      theme={EmojiTheme.AUTO}
      getEmojiUrl={getEmojiUrl}
      onEmojiClick={(e) => {
        props.onEmojiClick(e.unified);
      }}
    />
  );
}

export function Avatar(props: {
  isCustomAvatar: boolean;
  avatarUrl?: string;
  model?: ModelType;
  avatar?: string;
}) {
  if (props.model) {
    return (
      <div className="no-dark">
        {props.model?.startsWith("gpt-4") ? (
          <BlackBotIcon className="user-avatar" />
        ) : (
          <BotIcon className="user-avatar" />
        )}
      </div>
    );
  }

  return (
    <div className="user-avatar">
      {/* {props.avatar && <CustomAvatar avatar={props.avatar} />} */}
      {props.isCustomAvatar
        ? props.avatar && (
            <CustomAvatar avatarUrl={props.avatarUrl} avatar={props.avatar} />
          )
        : props.avatar && <EmojiAvatar avatar={props.avatar} />}
    </div>
  );
}

export function CustomAvatar(props: {
  avatar: string;
  avatarUrl: any;
  iconSize?: number;
}) {
  return (
    <div>
      {props.avatarUrl === "" ? (
        <CustomAvatarCpn shape="square" icon={<UserOutlined />} />
      ) : (
        <CustomAvatarCpn shape="square" src={props.avatarUrl} />
      )}
    </div>
  );
}

export function EmojiAvatar(props: { avatar: string; size?: number }) {
  return (
    <Emoji
      unified={props.avatar}
      size={props.size ?? 18}
      getEmojiUrl={getEmojiUrl}
    />
  );
}
