import { useTranslation } from "react-i18next";
import { useMode } from "../context/ModeContext";
import { resumeData } from "../data/resumeData";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const { isSectionVisible } = useMode();
  const supportedResumeLanguages = new Set(["en", "ar", "de", "fr", "ja", "ta"]);
  const localizedResume = supportedResumeLanguages.has(i18n.language) ? `/resume-${i18n.language}.pdf` : "/resume.pdf";
  const showContactActions = (() => {
    if (typeof window === "undefined") {
      return false;
    }
    const params = new URLSearchParams(window.location.search);
    const raw = (params.get("contactVisible") ?? params.get("contact") ?? "").toLowerCase();
    return raw === "1" || raw === "true" || raw === "yes" || raw === "show" || raw === "visible";
  })();

  if (!isSectionVisible("contact")) {
    return null;
  }

  return (
    <section id="contact" className="glass-card">
      <h2 className="section-title">{t("contact.title")}</h2>
      <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{t("contact.summary")}</p>
      <div className="mt-4 grid gap-2 text-sm text-slate-800 dark:text-slate-200">
        <p><strong>Email:</strong> <a href={`mailto:${resumeData.email}`} className="text-cyan-700 dark:text-cyan-300">{resumeData.email}</a></p>
        <p><strong>Phone:</strong> <a href={`tel:${resumeData.phone.replace(/\s+/g, "")}`} className="text-cyan-700 dark:text-cyan-300">{resumeData.phone}</a></p>
        <p><strong>Location:</strong> {resumeData.location}</p>
      </div>
      {showContactActions && (
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={localizedResume} download className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-300">{t("contact.download")}</a>
          {resumeData.socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="rounded-xl border border-white/20 px-3 py-2 text-sm text-slate-800 hover:bg-white/60 dark:text-slate-100 dark:hover:bg-white/10">{link.label}</a>
          ))}
        </div>
      )}
    </section>
  );
};

export default Contact;
