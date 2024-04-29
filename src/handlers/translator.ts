import type { messagingApi } from "@line/bot-sdk";
import type { Handler } from ".";
import {
  createTextMessage,
  getProfile,
  getTextFromEvent,
  reply,
} from "../lib/line";
import { translate } from "../lib/translator";

export const translator: Handler = async (event, next) => {
  if (event.type !== "message") return next();
  if (event.message.type !== "text") return next();

  const text = getTextFromEvent(event);

  const translated = translate(text);

  const option: Partial<messagingApi.TextMessage> = {};

  if (event.source.type === "group") {
    const profile = getProfile(event.source.userId);
    const senderName = profile.displayName;
    const lang = translated.isEng ? "JA" : "EN";
    option.sender = {
      name: `${
        senderName.length <= 15 ? senderName : `${senderName.slice(0, 12)}...`
      } (${lang})`,
      iconUrl: profile.pictureUrl,
    };
  }
  return reply(event.replyToken, createTextMessage(translated.res, option));
};
