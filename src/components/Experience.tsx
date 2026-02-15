import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMode } from "../context/ModeContext";
import { resumeData } from "../data/resumeData";

const Experience = () => {
  const { t } = useTranslation();
  const { isSectionVisible } = useMode();

  if (!isSectionVisible("experience")) {
    return null;
  }

  return (
    <section id="experience" className="glass-card">
      <h2 className="section-title">{t("experience.title")}</h2>
      <div className="relative mt-6 border-s border-cyan-300/30 ps-6">
        {resumeData.experiences.map((item, index) => (
          <motion.article
            key={`${item.company}-${item.duration}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative mb-4 rounded-xl border border-white/10 bg-white/25 p-4 last:mb-0 dark:bg-white/5"
          >
            <span className="absolute -start-[34px] top-5 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
            <p className="text-xs uppercase tracking-wider text-cyan-300">
              {t(`experience.items.${index}.duration`, { defaultValue: item.duration })}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {t(`experience.items.${index}.role`, { defaultValue: item.role })}
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {t(`experience.items.${index}.company`, { defaultValue: item.company })}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {t(`experience.items.${index}.location`, { defaultValue: item.location })}
            </p>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
              {t(`experience.items.${index}.summary`, { defaultValue: item.summary })}
            </p>
            <ul className="mt-3 list-disc ps-5 text-sm text-slate-700 dark:text-slate-300">
              {item.highlights.map((highlight, highlightIndex) => (
                <li key={highlight}>
                  {t(`experience.items.${index}.highlights.${highlightIndex}`, { defaultValue: highlight })}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
