import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("site_lang", lang);
  };

  return (
    <select
      className="form-select w-auto"
      onChange={(e) => changeLang(e.target.value)}
      defaultValue={localStorage.getItem("site_lang") || "en"}
    >
      <option value="en">🇺🇸 English</option>
      <option value="hi">🇮🇳 Hindi</option>
      <option value="fr">🇫🇷 French (coming soon)</option>
    </select>
  );
}
