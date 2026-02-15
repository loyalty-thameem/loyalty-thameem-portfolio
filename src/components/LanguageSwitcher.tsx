import { useTranslation } from "react-i18next";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic - العربية" },
  { value: "hi", label: "Hindi - हिन्दी" },
  { value: "ta", label: "Tamil - தமிழ்" },
  { value: "fr", label: "French - Français" },
  { value: "de", label: "German - Deutsch" },
  { value: "ja", label: "Japanese - 日本語" },
  { value: "es", label: "Spanish - Español" },
  { value: "zh", label: "Chinese - 中文" },
  { value: "ko", label: "Korean - 한국어" }
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  return (
    <label className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-2 py-1 text-xs text-slate-700 backdrop-blur dark:text-slate-200">
      <span className="hidden sm:inline">{t("language.label")}</span>
      <select
        className="max-w-28 rounded-md border border-white/20 bg-slate-100/85 px-2 py-1 text-xs text-slate-900 outline-none dark:bg-slate-900/60 dark:text-slate-100"
        value={i18n.language}
        onChange={(event) => {
          void i18n.changeLanguage(event.target.value);
        }}
      >
        {languageOptions.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSwitcher;
