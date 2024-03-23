import type { Handler } from ".";
import { reply } from "../lib/line";
import { getAudio } from "../lib/wordnik";

export const pronounceAudio: Handler = async (event, next) => {
  if (event.type !== "postback") return next();

  const dataParsed = JSON.parse(event.postback.data);
  if (dataParsed.func !== "audio") return next();

  try {
    const audio = getAudio(dataParsed.text);
    return reply(event.replyToken, [
      {
        type: "flex",
        altText: `発音 - ${dataParsed.text}`,
        contents: {
          type: "bubble",
          header: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                size: "md",
                weight: "bold",
                contents: [
                  {
                    type: "span",
                    text: "発音 - ",
                  },
                  {
                    type: "span",
                    style: "italic",
                    text: dataParsed.text,
                  },
                ],
              },
            ],
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "発音はかなり短い期間後、再生できなくなります。その場合はリクエストし直してください。ボタンは何度でも使用できます",
                wrap: true,
              },
              {
                type: "text",
                text: audio.attribution ?? "出典が不明です",
                margin: "sm",
                style: "italic",
                wrap: true,
              },
            ],
          },
          footer: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "発音はWordnikから提供されています",
                wrap: true,
              },
            ],
          },
        },
      },
      {
        type: "audio",
        originalContentUrl: audio.url,
        duration: audio.dur,
      },
    ]);
  } catch {
    return reply(event.replyToken, [
      {
        type: "flex",
        altText: `発音 - ${dataParsed.text}`,
        contents: {
          type: "bubble",
          header: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                size: "md",
                weight: "bold",
                contents: [
                  {
                    type: "span",
                    text: "発音 - ",
                  },
                  {
                    type: "span",
                    style: "italic",
                    text: dataParsed.text,
                  },
                ],
              },
            ],
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "発音が見つかりませんでした",
                wrap: true,
              },
            ],
          },
        },
      },
    ]);
  }
};
