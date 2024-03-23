import type { webhook } from "@line/bot-sdk";
import type { Middleware } from "../lib/middlewaresystem";
import { translator } from "./translator";
import { urlTranslator } from "./urlTranslator";
import { pronounceAudio } from "./pronounceAudio";
import { friendNotifier } from "./friendNotify";
import { definitionHandler } from "./definition";

export type Handler = Middleware<webhook.Event>;
export const handlers: Handler[] = [pronounceAudio, friendNotifier, definitionHandler, urlTranslator, translator];
