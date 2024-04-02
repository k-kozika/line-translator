import type { webhook } from "@line/bot-sdk";
import type { Middleware } from "../lib/middlewaresystem";
import { translator } from "./translator";
import { urlTranslator } from "./urlTranslator";
import { pronounceAudio } from "./pronounceAudio";
import { friendNotifier } from "./friendNotify";
import { definitionHandler } from "./definition";
import { messageNotifier } from "./messageNotify";

export type Handler = Middleware<webhook.Event>;
export const handlers: Handler[] = [
  messageNotifier,
  pronounceAudio,
  friendNotifier,
  definitionHandler,
  urlTranslator,
  translator,
];
