import type { Handler } from ".";
import { getTextFromEvent } from "../lib/line";
import { translate } from "../lib/translator";

export const translationHandler: Handler = async ([event, cache], next) => {
  if (event.type !== "message") return next();
  if (event.message.type !== "text") return next();

  const text = getTextFromEvent(event);

  const translated = translate(text);

  cache.push(translated.res, translated.isJapanese ? "ja" : translated.isEnglish ? "en" : "");
  next();
};
