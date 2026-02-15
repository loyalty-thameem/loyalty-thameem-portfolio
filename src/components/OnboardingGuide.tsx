import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type OnboardingGuideProps = {
  open: boolean;
  onClose: () => void;
};

type Rect = { top: number; left: number; width: number; height: number };

const steps = [
  { key: "language", selector: "[data-tour='language']" },
  { key: "theme", selector: "[data-tour='theme']" },
  { key: "mode", selector: "[data-tour='mode']" }
] as const;

const OnboardingGuide = ({ open, onClose }: OnboardingGuideProps) => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);

  const current = useMemo(() => steps[activeStep], [activeStep]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const updateRect = () => {
      const target = document.querySelector(current.selector);
      if (!target) {
        setRect(null);
        return;
      }

      const bounds = target.getBoundingClientRect();
      setRect({
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height
      });
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [open, current.selector]);

  useEffect(() => {
    if (!open) {
      setActiveStep(0);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const padding = 8;
  const tooltipTop = rect ? Math.min(rect.top + rect.height + 12, window.innerHeight - 190) : 96;
  const tooltipLeft = rect ? Math.min(Math.max(rect.left, 16), window.innerWidth - 360) : 16;
  const isLastStep = activeStep === steps.length - 1;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50">
        <div className="pointer-events-none absolute inset-0 bg-slate-950/65" />

        {rect ? (
          <div
            className="pointer-events-none fixed rounded-xl border-2 border-cyan-400 shadow-[0_0_0_9999px_rgba(2,6,23,0.65)]"
            style={{
              top: rect.top - padding,
              left: rect.left - padding,
              width: rect.width + padding * 2,
              height: rect.height + padding * 2
            }}
          />
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="fixed w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-cyan-300/25 bg-slate-100/95 p-4 text-slate-900 shadow-[0_0_40px_rgba(14,165,233,0.3)] dark:bg-slate-900/95 dark:text-slate-100"
          style={{ top: tooltipTop, left: tooltipLeft }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="guide-title"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
            {t("onboardingGuide.progress", { current: activeStep + 1, total: steps.length })}
          </p>
          <h2 id="guide-title" className="mt-1 text-base font-bold text-cyan-700 dark:text-cyan-200">
            {t(`onboardingGuide.steps.${current.key}.title`)}
          </h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{t(`onboardingGuide.steps.${current.key}.description`)}</p>

          <div className="mt-4 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
              disabled={activeStep === 0}
              className="rounded-lg border border-slate-400/55 px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-600 dark:text-slate-300"
            >
              {t("onboardingGuide.actions.back")}
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-400/55 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-300"
              >
                {t("onboardingGuide.actions.skip")}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isLastStep) {
                    onClose();
                    return;
                  }
                  setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
                }}
                className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                {isLastStep ? t("onboardingGuide.actions.finish") : t("onboardingGuide.actions.next")}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingGuide;
