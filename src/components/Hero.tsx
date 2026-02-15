import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMode } from "../context/ModeContext";
import { resumeData } from "../data/resumeData";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const { mode, isSectionVisible } = useMode();
  const [typedText, setTypedText] = useState("");
  const words = useMemo(() => {
    const value = t("hero.typingWords", { returnObjects: true });
    return Array.isArray(value) && value.length > 0 ? value : ["Senior Frontend Engineer"];
  }, [i18n.language]);

  useEffect(() => {
    let currentWord = 0;
    let currentChar = 0;
    let deleting = false;

    const timer = window.setInterval(() => {
      const word = words[currentWord] ?? "";

      if (!deleting) {
        currentChar += 1;
        setTypedText(word.slice(0, currentChar));
        if (currentChar >= word.length) {
          deleting = true;
        }
      } else {
        currentChar -= 1;
        setTypedText(word.slice(0, Math.max(0, currentChar)));
        if (currentChar <= 0) {
          deleting = false;
          currentWord = (currentWord + 1) % words.length;
        }
      }
    }, 120);

    return () => window.clearInterval(timer);
  }, [words]);

  if (!isSectionVisible("hero")) {
    return null;
  }

  return (
    <section id="hero" className="rounded-3xl border border-cyan-300/30 bg-white/10 p-6 shadow-[0_0_45px_rgba(56,189,248,0.22)] backdrop-blur-xl dark:bg-white/5 md:p-10">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="grid items-center gap-6 md:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-300">{t("hero.greeting")}</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white md:text-5xl">{resumeData.name}</h1>
          <p className="mt-3 text-lg text-slate-700 dark:text-slate-200 md:text-2xl">{typedText}<span className="typing-caret">|</span></p>
          <p className="mt-2 inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-wider text-cyan-700 dark:text-cyan-200">{t(`mode.${mode}`)} mode</p>
          <p className="mt-4 max-w-3xl text-sm text-slate-700 dark:text-slate-300 md:text-base">{t("hero.summary")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300">{t("hero.ctaPrimary")}</a>
            <a href="#contact" className="rounded-xl border border-cyan-500/60 px-4 py-2 text-sm text-cyan-700 transition hover:bg-cyan-300/20 dark:text-cyan-200 dark:hover:bg-cyan-300/10">{t("hero.ctaSecondary")}</a>
          </div>
        </div>
        <div className="mx-auto w-full max-w-xs">
          <div className="overflow-hidden rounded-2xl border border-cyan-300/40 bg-white/30 p-2 shadow-[0_0_28px_rgba(14,165,233,0.25)] dark:bg-black/20">
            <img
              src={`${import.meta.env.BASE_URL}images/personal/profile.jpg`}
              alt="Thameem Ansari profile"
              className="h-[22rem] w-full rounded-xl object-cover object-top"
              loading="eager"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
