export const translate = (text: string) => {
  const translate = LanguageApp.translate(text, "", "en");

  const isEng = text.toLowerCase() === translate.toLowerCase();
  const res = isEng ? LanguageApp.translate(text, "en", "ja") : translate;
  return { res, isEng };
};
