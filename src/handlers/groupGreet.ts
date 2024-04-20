import type { Handler } from ".";
import { countMembersInGroup, leaveGroup, reply } from "../lib/line";

export const groupGreet: Handler = async (event, next) => {
  if (event.type !== "join" || event.source.type !== "group") return next();

  const count = countMembersInGroup(event.source.groupId);

  if (count <= 1) {
    reply(event.replyToken, [
      {
        type: "flex",
        contents: {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "グループへの追加ありがとうございます",
                wrap: true,
              },
              {
                type: "text",
                text: "しかし、メンバーが少なすぎるためグループを作成する必要はないようです",
                wrap: true,
              },
              {
                type: "text",
                text: "チャットをご利用ください",
                wrap: true,
              },
              {
                type: "button",
                action: {
                  type: "uri",
                  label: "開く",
                  uri: "https://line.me/R/oaMessage/%40982qzrdh",
                },
                style: "primary",
              },
            ],
          },
        },
        altText: "グループは必要ありません",
      },
    ]);
    return leaveGroup(event.source.groupId);
  }

  return reply(event.replyToken, [
    {
      type: "text",
      text: "グループへの追加ありがとうございます\n今後このグループでの翻訳を行います",
    },
  ]);
};
