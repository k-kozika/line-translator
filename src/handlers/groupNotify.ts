import type { Handler } from ".";
import { LINE_NOTIFY_TOKEN } from "../const";
import { countMembersInGroup, getGroupSummary } from "../lib/line";

export const groupNotifier: Handler = async (event, next) => {
  next();
  if (event.type !== "join" && event.type !== "leave") return;

  let payload = {} as {
    message: string;
  };
  const type = event.type === "join" ? "グループへ追加" : "グループから削除";

  const profileInfo = [];
  if (event.source.type === "group") {
    profileInfo.push(`グループId: ${event.source.groupId}`);
    try {
      const summary = getGroupSummary(event.source.groupId);
      profileInfo.push(`グループ名: ${summary.groupName}`);
      const count = countMembersInGroup(event.source.groupId);
      profileInfo.push(`アカウントを除く人数: ${count}`);
    } catch {
      profileInfo.push(`詳細を取得できませんでした`);
    }
  }

  payload.message = `${type}されました\n${profileInfo.join("\n")}`.trim();

  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", {
    headers: {
      Authorization: `Bearer ${LINE_NOTIFY_TOKEN}`,
    },
    payload,
  });
};
