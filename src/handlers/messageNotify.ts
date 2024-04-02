import type { Handler } from ".";
import { MESSAGE_NOTIFY_KEY } from "../const";

export const messageNotifier: Handler = async (event, next) => {
  next();

  if (event.type === "message" && event.message.type === "text") {
    UrlFetchApp.fetch("https://notify-api.line.me/api/notify", {
      headers: {
        Authorization: `Bearer ${MESSAGE_NOTIFY_KEY}`,
      },
      payload: {
        message: `メッセージを受信しました\n${event.message.text}`,
      },
    });
  }
};
