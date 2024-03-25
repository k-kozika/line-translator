import { WORDNIK_API_KEY, WORDNIK_ENDPOINT_BASE } from "../const";

const htmlLikeToString = (html: string) => {
  return Cheerio.load(html).root().text();
};

export const getDefinitions = (word: string) => {
  const res = JSON.parse(
    UrlFetchApp.fetch(
      `${WORDNIK_ENDPOINT_BASE}/word.json/${encodeURI(
        word
      )}/definitions?limit=5&includeRelated=true&useCanonical=true&api_key=${WORDNIK_API_KEY}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    ).getContentText()
  );

  return res
    .filter((value) => !!value.text)
    .map((value) => ({
      from: value.attributionText ?? "提供源は不明です",
      type: LanguageApp.translate(
        value.partOfSpeech ?? "part of speech is unknown",
        "en",
        "ja"
      ),
      mean: LanguageApp.translate(htmlLikeToString(value.text), "en", "ja"),
      examples: value.exampleUses.map((example) =>
        htmlLikeToString(example.text ?? "")
      ),
      word: value.word
    }));
};

export const getAudio = (text: string) => {
  const res = JSON.parse(
    UrlFetchApp.fetch(
      `${WORDNIK_ENDPOINT_BASE}/word.json/${encodeURI(
        text
      )}/audio?useCanonical=true&limit=1&api_key=${WORDNIK_API_KEY}`
    ).getContentText()
  )[0];

  return {
    attribution: res.attributionText as string,
    url: res.fileUrl as string,
    dur: res.duration * 1000,
  };
};

export const getRelatedWords = (word: string) => {
  const res = JSON.parse(
    UrlFetchApp.fetch(
      `${WORDNIK_ENDPOINT_BASE}/word.json/${encodeURI(
        word
      )}/relatedWords?useCanonical=true&limitPerRelationshipType=6&api_key=${WORDNIK_API_KEY}`
    ).getContentText()
  );

  return res;
};
