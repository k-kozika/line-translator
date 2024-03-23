import type { messagingApi, webhook } from "@line/bot-sdk";
import { ACCESS_TOKEN, LINE_ENDPOINT_BASE } from "../const";

export const getTextFromEvent = (event: webhook.Event): string => {
  if (event.type !== "message") return;
  if (event.message.type !== "text") return;

  return event.message.text;
};

export const createTextMessage = (text: string): messagingApi.TextMessage[] => {
  return [
    {
      type: "text",
      text: text,
    },
  ];
};

export const reply = (replyToken: string, messages: messagingApi.Message[]) => {
  const data = {
    replyToken,
    messages,
  };
  return UrlFetchApp.fetch(`${LINE_ENDPOINT_BASE}/message/reply`, {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    payload: JSON.stringify(data),
  });
};

export const getProfile = (userId: string) => {
  return JSON.parse(
    UrlFetchApp.fetch(`${LINE_ENDPOINT_BASE}/profile/${userId}`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    }).getContentText()
  );
};
