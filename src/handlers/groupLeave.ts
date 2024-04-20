import type { Handler } from ".";
import { countMembersInGroup, leaveGroup, reply } from "../lib/line";

export const groupLeave: Handler = async (event, next) => {
  next();
  if (event.type !== "memberLeft" || event.source.type !== "group") return;

  const count = countMembersInGroup(event.source.groupId);

  if (count <= 1) {
    return leaveGroup(event.source.groupId);
  }
};
