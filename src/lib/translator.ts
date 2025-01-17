export const translate = (text: string) => {
  const translate = LanguageApp.translate(text, "", "ja");

  const isJapanese =
    text.toLowerCase().trim() === translate.toLowerCase().trim();
  const enRes = LanguageApp.translate(text, "", "en");
  const isEnglish = text.toLowerCase().trim() === enRes.toLowerCase().trim();
  const res = isJapanese ? enRes : translate;
  return { res, isJapanese, isEnglish };
};
