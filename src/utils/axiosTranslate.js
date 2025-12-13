import axios from "axios";
import i18n from "../i18n";

// Create axios instance
const api = axios.create();

// FREE Translation API
const translatorUrl = "https://libretranslate.de/translate";

// Function to translate a single text block
async function translateText(text, lang) {
  if (!text || typeof text !== "string") return text;
  if (lang === "en") return text;

  try {
    const res = await axios.post(translatorUrl, {
      q: text,
      source: "en",
      target: lang,
      format: "html"
    });
    return res.data.translatedText;
  } catch (err) {
    console.warn("Translation failed, using English.");
    return text;
  }
}

// Function to translate all fields in an object
async function translateObject(data, lang) {
  if (!data) return data;

  const newObj = Array.isArray(data) ? [] : {};

  for (const key in data) {
    const value = data[key];

    if (typeof value === "string") {
      newObj[key] = await translateText(value, lang);
    } else if (typeof value === "object" && value !== null) {
      newObj[key] = await translateObject(value, lang);
    } else {
      newObj[key] = value;
    }
  }

  return newObj;
}

// Axios response interceptor (translates automatically)
api.interceptors.response.use(async (response) => {
  const lang = i18n.language;

  if (response.data) {
    response.data = await translateObject(response.data, lang);
  }

  return response;
});

export default api;
