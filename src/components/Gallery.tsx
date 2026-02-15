import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMode } from "../context/ModeContext";
import { galleryImages, type GalleryCategory } from "../data/galleryData";

const Gallery = () => {
  const { t } = useTranslation();
  const { mode, isSectionVisible } = useMode();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("personal");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullView, setFullView] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const categories = useMemo<GalleryCategory[]>(() => {
    if (mode === "hr" || mode === "ceo") {
      return ["professional"];
    }
    return ["professional", "personal", "fun"];
  }, [mode]);

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
    }
  }, [activeCategory, categories]);

  const categoryImages = galleryImages[activeCategory] ?? [];

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    if (categoryImages.length <= 1 || isPaused) {
      return;
    }
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categoryImages.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [categoryImages.length, isPaused]);

  if (!isSectionVisible("gallery")) {
    return null;
  }

  const activeImage = categoryImages[currentIndex];
  const showControls = categoryImages.length > 1;

  return (
    <section id="gallery" className="glass-card">
      <h2 className="section-title">{t("gallery.title")}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-xl border px-3 py-1 text-xs uppercase tracking-wider transition ${
              activeCategory === category
                ? "border-cyan-400 bg-cyan-500/20 text-cyan-800 dark:text-cyan-200"
                : "border-white/20 text-slate-700 hover:bg-white/40 dark:text-slate-300 dark:hover:bg-white/10"
            }`}
          >
            {t(`gallery.${category}`)}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-white/15 bg-white/35 p-3 dark:bg-slate-900/35">
        {activeImage ? (
          <>
            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <button type="button" onClick={() => setFullView(activeImage.src)} className="group relative block h-72 w-full overflow-hidden rounded-xl md:h-96">
              <div className="absolute inset-0">
                <img
                  src={activeImage.src}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full scale-110 object-cover blur-2xl brightness-90"
                />
                <div className="absolute inset-0 bg-black/15" />
              </div>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage.src}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  initial={{ opacity: 0.9, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="relative z-10 h-full w-full object-contain brightness-100 contrast-105 saturate-110"
                />
              </AnimatePresence>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/45 via-black/10 to-transparent p-4">
                  <p className="text-sm font-medium text-white">{activeImage.alt}</p>
                  <p className="text-xs text-white/85">Click to open full view</p>
                </div>
              </button>

              {showControls && (
                <>
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + categoryImages.length) % categoryImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-black/35 px-3 py-2 text-sm text-white backdrop-blur transition hover:bg-black/55"
                    aria-label="Previous image"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % categoryImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-black/35 px-3 py-2 text-sm text-white backdrop-blur transition hover:bg-black/55"
                    aria-label="Next image"
                  >
                    Next
                  </button>
                </>
              )}
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {categoryImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`shrink-0 overflow-hidden rounded-lg border transition ${index === currentIndex ? "border-cyan-400 ring-2 ring-cyan-300/50" : "border-white/20 hover:border-cyan-300/60"}`}
                >
                  <img src={image.src} alt={image.alt} className="h-16 w-24 object-cover" />
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-white/25 text-sm text-slate-600 dark:text-slate-300">
            {t("gallery.title")}: No images added yet
          </div>
        )}
      </div>
      <AnimatePresence>
        {fullView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setFullView(null)}
          >
            <button type="button" onClick={() => setFullView(null)} className="absolute end-4 top-4 rounded-full border border-white/30 bg-black/60 px-3 py-1 text-white">Close</button>
            <motion.img
              src={fullView}
              alt="Full view"
              initial={{ scale: 0.95, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
