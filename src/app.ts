import type { webhook } from "@line/bot-sdk";
import { handlers } from "./handlers";
import { Pipeline } from "./lib/middlewaresystem";

// function verify(body, signature) {
//   const digest = Utilities.computeHmacSha256Signature(body, CHANNEL_SECRET);
//   const encoded = Utilities.base64Encode(digest);
//   return (signature === encoded);
// }

function doPost(e: GoogleAppsScript.Events.DoPost) {
  (async () => {
    const data: webhook.CallbackRequest = JSON.parse(e.postData.contents);
    const events = data.events;

    const engine = new Pipeline(...handlers);
    await Promise.all(events.map((event) => engine.execute(event)));
  })();
}

function doGet(_e) {
  return ContentService.createTextOutput("GET request is not supported");
}
