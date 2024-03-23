import type { Handler } from ".";
import { createTextMessage, getTextFromEvent, reply } from "../lib/line";
import { translate } from "../lib/translator";

export const translator: Handler = async (event, next) => {
  if (event.type !== "message") return next();
  if (event.message.type !== "text") return next();

  const text = getTextFromEvent(event);

  const translated = translate(text);
  return reply(event.replyToken, createTextMessage(translated.res));
};
