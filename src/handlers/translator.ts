import type { messagingApi } from "@line/bot-sdk";
import type { Handler } from ".";
import {
  createTextMessage,
  getProfile,
  getTextFromEvent,
  reply,
} from "../lib/line";

export const translator: Handler = async ([event, [translated, lang]], next) => {
  if (event.type !== "message") return next();
  if (event.message.type !== "text") return next();

  const text = getTextFromEvent(event);


  const option: Partial<messagingApi.TextMessage> = {};

  if (event.source.type === "group") {
    const profile = getProfile(event.source.userId);
    const senderName = profile.displayName;
    const lang = lang ? "EN" : "JA";
    option.sender = {
      name: `${
        senderName.length <= 15 ? senderName : `${senderName.slice(0, 12)}...`
      } (${lang})`,
      // iconUrl: profile.pictureUrl,
    };
  }
  return reply(event.replyToken, createTextMessage(translated.res, option));
};
