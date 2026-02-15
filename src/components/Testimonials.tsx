import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMode } from "../context/ModeContext";
import { testimonials } from "../data/testimonials";

const Testimonials = () => {
  const { t } = useTranslation();
  const { isSectionVisible } = useMode();

  if (!isSectionVisible("testimonials")) {
    return null;
  }

  return (
    <section id="testimonials" className="glass-card">
      <h2 className="section-title">{t("testimonials.title")}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.blockquote key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="rounded-2xl border border-white/10 bg-white/25 p-4 text-sm dark:bg-white/5">
            <p className="text-slate-800 dark:text-slate-200">
              "{t(`testimonials.items.${index}.quote`, { defaultValue: item.quote })}"
            </p>
            <footer className="mt-3 text-xs text-cyan-700 dark:text-cyan-300">
              {t(`testimonials.items.${index}.name`, { defaultValue: item.name })} - {t(`testimonials.items.${index}.title`, { defaultValue: item.title })}
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
