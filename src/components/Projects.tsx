import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMode } from "../context/ModeContext";

const projectKeys = ["venba", "fintech", "trove", "mytheron"];

const Projects = () => {
  const { t } = useTranslation();
  const { isSectionVisible } = useMode();

  if (!isSectionVisible("projects")) {
    return null;
  }

  return (
    <section id="projects" className="glass-card">
      <h2 className="section-title">{t("projects.title")}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {projectKeys.map((project) => (
          <motion.article
            key={project}
            whileHover={{ rotateX: 8, rotateY: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
            className="transform-3d rounded-2xl border border-white/15 bg-slate-200/60 p-4 shadow-[0_0_24px_rgba(14,165,233,0.15)] dark:bg-slate-900/55"
          >
            <h3 className="text-base font-semibold text-cyan-700 dark:text-cyan-200">{t(`projects.items.${project}.title`)}</h3>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{t(`projects.items.${project}.description`)}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
