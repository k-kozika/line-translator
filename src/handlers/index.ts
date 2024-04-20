import type { webhook } from "@line/bot-sdk";
import type { Middleware } from "../lib/middlewaresystem";
import { translator } from "./translator";
import { urlTranslator } from "./urlTranslator";
import { pronounceAudio } from "./pronounceAudio";
import { friendNotifier } from "./friendNotify";
import { definitionHandler } from "./definition";
import { messageNotifier } from "./messageNotify";
import { groupNotifier } from "./groupNotify";
import { groupGreet } from "./groupGreet";
import { groupLeave } from "./groupLeave";
import { groupNotice } from "./groupNotice";

export type Handler = Middleware<webhook.Event>;
export const handlers: Handler[] = [
  messageNotifier,
  pronounceAudio,
  groupGreet,
  groupNotice,
  friendNotifier,
  groupNotifier,
  groupLeave,
  definitionHandler,
  urlTranslator,
  translator,
];
