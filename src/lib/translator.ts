export const translate = (text: string) => {
  const translate = LanguageApp.translate(text, "", "ja");

  const isJapanese = text.toLowerCase().trim() === translate.toLowerCase().trim();
  const isEnglish = text.toLowerCase().trim() === LanguageApp.translate(text, "", "en").toLowerCase().trim();
  const res = isJapanese ? LanguageApp.translate(text, "ja", "en") : translate;
  return { res, isJapanese, isEnglish };
};
