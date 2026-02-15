import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMode } from "../context/ModeContext";
import { resumeData } from "../data/resumeData";

const About = () => {
  const { t } = useTranslation();
  const { mode, isSectionVisible } = useMode();
  const foodPreferences = resumeData.hobbies
    .filter((item) => item.startsWith("Favorite:"))
    .map((item) => item.replace("Favorite:", "").trim());
  const lifestyleChoices = resumeData.hobbies.filter((item) => !item.startsWith("Favorite:"));

  if (!isSectionVisible("about")) {
    return null;
  }

  const aboutSectionClassName =
    mode === "family" ? "grid gap-6 md:grid-cols-2" : "grid gap-6";

  return (
    <section id="about" className={aboutSectionClassName}>
      <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card">
        <h2 className="section-title">{t("about.title")}</h2>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 md:text-base">{t("about.summary")}</p>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{t("about.responsibility")}</p>
        {(mode === "family" || mode === "matrimony") && (
          <div className="mt-4 space-y-2 text-sm text-slate-800 dark:text-slate-200">
            <p><strong>{t("identity.height")}:</strong> {resumeData.height}</p>
            <p><strong>{t("identity.weight")}:</strong> {resumeData.weight}</p>
            <p><strong>{t("identity.values")}:</strong> {resumeData.values.join(" | ")}</p>
          </div>
        )}
      </motion.article>
      {mode === "family" && (
        <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card">
          <h3 className="text-lg font-semibold text-cyan-200">{t("about.hobbiesTitle")}</h3>
          <div className="mt-4 space-y-4">
            {foodPreferences.length > 0 && (
              <div className="rounded-2xl border border-cyan-200/50 bg-gradient-to-br from-cyan-50/70 to-white/40 p-4 dark:border-cyan-300/20 dark:from-cyan-900/20 dark:to-slate-900/20">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-200">Favorite Foods</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {foodPreferences.map((food) => (
                    <span key={food} className="rounded-full border border-cyan-300/60 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 dark:border-cyan-300/30 dark:bg-slate-900/50 dark:text-slate-200">
                      {food}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {lifestyleChoices.length > 0 && (
              <div className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/70 to-white/40 p-4 dark:border-emerald-300/20 dark:from-emerald-900/20 dark:to-slate-900/20">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-200">Lifestyle Choices</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {lifestyleChoices.map((choice) => (
                    <li key={choice} className="flex items-center gap-2 rounded-lg border border-white/70 bg-white/70 px-3 py-2 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-300" />
                      <span>{choice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
              Clean lifestyle. Disciplined habits. Focused mindset.
            </p>
          </div>
        </motion.article>
      )}
    </section>
  );
};

export default About;
