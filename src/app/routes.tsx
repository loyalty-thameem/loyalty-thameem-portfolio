import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import AIChat from "../components/AIChat";
import ThemeToggle from "../components/ThemeToggle";
import ModeSwitcher from "../components/ModeSwitcher";
import LanguageSwitcher from "../components/LanguageSwitcher";

const HomePage = () => {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.dir(i18n.language) === "rtl";

  useEffect(() => {
    const direction = i18n.dir(i18n.language);
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language;
    document.body.dataset.direction = direction;
  }, [i18n, i18n.language]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#040714] dark:text-slate-100">
      <div className="aurora-bg" aria-hidden="true" />
      <div className="particles-bg" aria-hidden="true" />
      <header className="sticky top-0 z-30 border-b border-slate-300/40 bg-slate-100/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
        <div className={`mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6 ${isRtl ? "flex-row-reverse" : ""}`}>
          <a href="#hero" className="text-lg font-bold tracking-wide text-cyan-700 dark:text-cyan-300">{t("identity.name")}</a>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ModeSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <AIChat />
    </div>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
);

export default AppRoutes;
