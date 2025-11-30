export function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/\?+$/, "")
    .replace(/\s+/g, " ")
    .trim();
}