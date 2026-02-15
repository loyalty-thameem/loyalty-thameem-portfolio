import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-xl border border-white/20 bg-white/10 px-3 py-1 text-xs text-slate-700 transition hover:bg-white/20 dark:text-slate-100"
    >
      {theme === "dark" ? t("theme.light") : t("theme.dark")}
    </button>
  );
};

export default ThemeToggle;
