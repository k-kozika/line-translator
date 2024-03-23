import type { Handler } from ".";
import { getTextFromEvent, reply } from "../lib/line";
import { translate } from "../lib/translator";
import { getDefinitions } from "../lib/wordnik";

export const definitionHandler: Handler = async (event, next) => {
  if (event.type !== "message") return next();
  if (event.message.type !== "text") return next();

  const text = getTextFromEvent(event);

  const translated = translate(text);
  if (!translated.isEng) return next();

  try {
    const definitions = getDefinitions(text);
    const bubbles = definitions.map((definition) => ({
      type: "bubble",
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: text,
            size: "lg",
            weight: "bold",
            style: "normal",
            wrap: true,
          },
          {
            type: "text",
            text: definition.type,
            style: "italic",
            size: "sm",
          },
        ],
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: definition.mean,
            wrap: true,
          },
          {
            type: "separator",
          },
          {
            type: "text",
            text: "例文:",
            size: "md",
            weight: "bold",
          },
          {
            type: "text",
            text:
              definition.examples
                .map((example) => `- ${example}`)
                .join("\n") === ""
                ? "例文は見つかりませんでした"
                : definition.examples
                    .map((example) => `- ${example}`)
                    .join("\n"),
            wrap: true,
            style: "italic",
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: definition.from,
            style: "italic",
            wrap: true,
          },
        ],
      },
    }));
    bubbles.unshift({
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            contents: [
              {
                type: "span",
                text: `${text} - `,
                style: "italic",
              },
              {
                type: "span",
                text: translated.res,
              },
            ],
            weight: "bold",
            size: "lg",
          },
          {
            type: "text",
            text: "意味と発音はWordnikから提供されています",
            wrap: true,
          },
          {
            type: "button",
            action: {
              type: "postback",
              label: "発音を聞く",
              data: JSON.stringify({ func: "audio", text: text }),
              displayText: "発音をリクエストしました",
            },
            style: "secondary",
          },
          {
            type: "button",
            action: {
              type: "uri",
              label: "Wordnikでもっと見る",
              uri: `https://www.wordnik.com/words/${text}`,
            },
            style: "link",
          },
        ],
        justifyContent: "center",
        alignItems: "center",
      },
    });

    const carousel = {
      type: "carousel",
      contents: bubbles,
    };
    return reply(event.replyToken, [
      {
        type: "flex",
        altText: `意味 - ${text}`,
        contents: carousel,
      },
    ]);
  } catch {
    return next();
  }
};
