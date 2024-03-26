import type { Handler } from ".";
import { LINE_NOTIFY_TOKEN } from "../const";
import { getProfile } from "../lib/line";

export const friendNotifier: Handler = async (event, next) => {
  if (event.type !== "follow" && event.type !== "unfollow") return next();

  let payload = {} as {
    message: string;
    imageFullsize?: string
  };
  const type =
    event.type === "follow"
      ? event.follow.isUnblocked
        ? "ブロック解除"
        : "友だち追加"
      : "ブロック";

  const profileInfo = [`種別: ${event.source.type}`];
  if (event.source.type === "user") {
    profileInfo.push(`ユーザーId: ${event.source.userId}`);
    try {
      const profile = getProfile(event.source.userId);
      profileInfo.push(
        `ユーザー名: ${profile.displayName}; 言語: ${
          profile.language ?? "不明"
        }`
      );
    } catch {
      profileInfo.push(`ユーザーの情報取得に失敗しました`);
    }
  }

  payload.message = `${type}されました\n${profileInfo.join("\n")}`;

  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", {
    headers: {
      Authorization: `Bearer ${LINE_NOTIFY_TOKEN}`,
    },
    payload,
  });
};
