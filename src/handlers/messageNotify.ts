import type { Handler } from ".";
import { LINE_NOTIFY_TOKEN } from "../const";

export const messageNotifier: Handler = async (event, next) => {
  next();

  if (event.type === "message" && event.message.type === "text") {
    UrlFetchApp.fetch("https://notify-api.line.me/api/notify", {
      headers: {
        Authorization: `Bearer ${LINE_NOTIFY_TOKEN}`,
      },
      payload: {
        message: `メッセージを受信しました\n${event.message.text}`,
      },
    });
  }
};
