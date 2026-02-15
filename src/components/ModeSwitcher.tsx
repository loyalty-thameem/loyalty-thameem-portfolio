import { useTranslation } from "react-i18next";
import { useMode, type AudienceMode } from "../context/ModeContext";

const modes: AudienceMode[] = ["default", "hr", "ceo", "family", "matrimony"];

const ModeSwitcher = () => {
  const { mode, setMode } = useMode();
  const { t } = useTranslation();

  return (
    <label className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-2 py-1 text-xs text-slate-700 backdrop-blur dark:text-slate-200">
      <span className="hidden sm:inline">{t("mode.label")}</span>
      <select
        className="rounded-md border border-white/20 bg-slate-100/85 px-2 py-1 text-xs text-slate-900 outline-none dark:bg-slate-900/60 dark:text-slate-100"
        value={mode}
        onChange={(event) => setMode(event.target.value as AudienceMode)}
      >
        {modes.map((item) => (
          <option key={item} value={item}>
            {t(`mode.${item}`)}
          </option>
        ))}
      </select>
    </label>
  );
};

export default ModeSwitcher;
