import type { Handler } from ".";
import { reply } from "../lib/line";

let messageSent = false;

export const groupNotice: Handler = async (event, next) => {
  next();
  if (event.type !== "memberJoined") return;
  if (messageSent) return;

  reply(event.replyToken, [
    {
      type: "flex",
      contents: {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              size: "lg",
              weight: "bold",
              text: "参加された方へのご案内",
            },
            {
              type: "text",
              text: "このグループでは自動翻訳が行われています",
              wrap: true,
            },
            {
              type: "text",
              text: "Google翻訳に送信したメッセージが共有されます",
              wrap: true,
            },
          ],
          spacing: "md",
        },
      },
      altText: "はじめにご確認ください",
    },
  ]);
  messageSent = true;
};
