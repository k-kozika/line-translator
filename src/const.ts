const scriptProps = PropertiesService.getScriptProperties();
export const LINE_ENDPOINT_BASE = "https://api.line.me/v2/bot";
export const WORDNIK_ENDPOINT_BASE = "https://api.wordnik.com/v4";
export const ACCESS_TOKEN = scriptProps.getProperty("ACCESS_TOKEN");
export const CHANNEL_SECRET = scriptProps.getProperty("CHANNEL_SECRET");
export const WORDNIK_API_KEY = scriptProps.getProperty("WORDNIK_KEY");
export const LINE_NOTIFY_TOKEN = scriptProps.getProperty("LINE_NOTIFY_KEY");
export const MESSAGE_NOTIFY_KEY = scriptProps.getProperty("MESSAGE_NOTIFY_KEY");
