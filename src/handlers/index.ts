import type { webhook } from "@line/bot-sdk";
import type { Middleware } from "../lib/middlewareSystem";
import { translator } from "./translator";
import { urlTranslator } from "./urlTranslator";
import { pronounceAudio } from "./pronounceAudio";
import { friendNotifier } from "./friendNotify";
import { definitionHandler } from "./definition";
import { groupNotifier } from "./groupNotify";
import { groupGreet } from "./groupGreet";
import { groupLeave } from "./groupLeave";
import { groupNotice } from "./groupNotice";
import { synonymHandler } from "./synonym";

export type Handler = Middleware<webhook.Event>;
export const handlers: Handler[] = [
  // messageNotifier,
  pronounceAudio,
  // friendNotifier,
  // groupNotifier,
  groupGreet,
  groupNotice,
  groupLeave,
  definitionHandler,
  synonymHandler,
  urlTranslator,
  translator,
];
