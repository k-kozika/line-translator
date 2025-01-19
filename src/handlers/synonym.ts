import type { Handler } from ".";
import { getTextFromEvent, reply, sendLoader } from "../lib/line";
import { getRelatedWords } from "../lib/wordnik";

export const synonymHandler: Handler = async (
  [event, [translated, language]],
  next,
) => {
  if (event.type !== "message") return next();
  if (event.message.type !== "text") return next();
  if (event.source.type !== "user") return next();

  const text = getTextFromEvent(event);

  if (language !== "ja") return next();

  sendLoader(event.source.userId);

  try {
    const relatedWords = getRelatedWords(translated);
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
                text: translated,
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
                text: translated,
                weight: "bold",
              },
            ],
          },
          {
            type: "button",
            action: {
              type: "message",
              label: `${translated}の意味を調べる`,
              text: translated,
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
