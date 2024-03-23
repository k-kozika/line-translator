import type { Handler } from ".";
import { createTextMessage, getTextFromEvent, reply } from "../lib/line";

export const urlTranslator: Handler = (event, next) => {
  if (event.type !== "message") return next();
  if (event.message.type !== "text") return next();

  const text = getTextFromEvent(event);
  let isUrl = false;
  try {
    UrlFetchApp.fetch(text, { muteHttpExceptions: true });
    isUrl = true;
  } catch {}

  if (!isUrl) return next();

  return reply(
    event.replyToken,
    createTextMessage(
      `https://translate.google.com/translate?sl=auto&tl=ja&u=${encodeURIComponent(
        text
      )}`
    )
  );
};
