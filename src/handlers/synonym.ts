import type { Handler } from ".";
import { getTextFromEvent, reply, sendLoader } from "../lib/line";
import { translate } from "../lib/translator";
import { getRelatedWords } from "../lib/wordnik";

export const synonymHandler: Handler = async (event, next) => {
  if (event.type !== "message") return next();
  if (event.message.type !== "text") return next();
  if (event.source.type !== "user") return next();

  const text = getTextFromEvent(event);

  const translated = translate(text);
  if (translated.isEng) return next();

  sendLoader(event.source.userId);

  try {
    const relatedWords = getRelatedWords(translated.res);
    const flex = {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            size: "lg",
            weight: "bold",
            contents: [
              {
                type: "span",
                style: "italic",
                text: translated.res,
              },
              {
                type: "span",
                text: " の同義語",
              },
            ],
          },
          {
            type: "text",
            wrap: true,
            contents: [
              {
                type: "span",
                text: "単語: ",
              },
              {
                type: "span",
                text: text,
                style: "italic",
              },
              {
                type: "span",
                text: "\n翻訳: ",
              },
              {
                type: "span",
                text: translated.res,
                weight: "bold",
              },
            ],
          },
          {
            type: "button",
            action: {
              type: "message",
              label: `${translated.res}の意味を調べる`,
              text: translated.res,
            },
          },
          { type: "separator" },
          ...relatedWords.map((word) => ({
            type: "button",
            action: {
              type: "message",
              text: word,
              label: word,
            },
            scaling: true,
            style: "secondary",
          })),
        ],
        spacing: "md",
      },
    };

    return reply(event.replyToken, [
      {
        type: "flex",
        contents: flex,
        altText: `${text} の同義`,
      },
    ]);
  } catch {
    return next();
  }
};
