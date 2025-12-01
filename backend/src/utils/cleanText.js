export const cleanText = (text) =>
  text
    .toLowerCase()
    .replace(/\?+$/, "")
    .replace(/\s+/g, " ")
    .trim();
