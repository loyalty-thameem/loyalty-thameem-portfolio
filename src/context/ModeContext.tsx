import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type AudienceMode = "default" | "hr" | "ceo" | "family";
export type SectionKey =
  | "hero"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "gallery"
  | "testimonials"
  | "contact"
  | "aiChat";

type ModeContextValue = {
  mode: AudienceMode;
  setMode: (mode: AudienceMode) => void;
  isSectionVisible: (section: SectionKey) => boolean;
};

const modeVisibility: Record<AudienceMode, SectionKey[]> = {
  default: ["hero", "about", "skills", "experience", "projects", "gallery", "testimonials", "contact", "aiChat"],
  hr: ["hero", "about", "skills", "experience", "projects", "testimonials", "contact", "aiChat"],
  ceo: ["hero", "skills", "experience", "projects", "testimonials", "contact", "aiChat"],
  family: ["hero", "about", "projects", "gallery", "testimonials", "contact", "aiChat"]
};

const ModeContext = createContext<ModeContextValue | undefined>(undefined);
const storageKey = "portfolio-mode";
const modeQueryKey = "mode";
const sectionsQueryKey = "sections";
const contentQueryKey = "content";

const isAudienceMode = (value: string | null): value is AudienceMode =>
  value === "default" || value === "hr" || value === "ceo" || value === "family";

const isSectionKey = (value: string): value is SectionKey =>
  value === "hero" ||
  value === "about" ||
  value === "skills" ||
  value === "experience" ||
  value === "projects" ||
  value === "gallery" ||
  value === "testimonials" ||
  value === "contact" ||
  value === "aiChat";

const getModeFromUrl = (): AudienceMode | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const params = new URLSearchParams(window.location.search);
  const value = params.get(modeQueryKey);
  return isAudienceMode(value) ? value : null;
};

const getSectionOverrideFromUrl = (): SectionKey[] | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const params = new URLSearchParams(window.location.search);
  const raw = params.get(sectionsQueryKey) ?? params.get(contentQueryKey);
  if (!raw) {
    return null;
  }

  const parsed = raw
    .split(",")
    .map((value) => value.trim())
    .filter(isSectionKey);

  return parsed.length > 0 ? Array.from(new Set(parsed)) : null;
};

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<AudienceMode>(() => {
    if (typeof window === "undefined") {
      return "default";
    }

    const modeFromUrl = getModeFromUrl();
    if (modeFromUrl) {
      return modeFromUrl;
    }

    const stored = window.localStorage.getItem(storageKey);
    if (isAudienceMode(stored)) {
      return stored;
    }
    return "default";
  });
  const [sectionOverride, setSectionOverride] = useState<SectionKey[] | null>(() => getSectionOverrideFromUrl());

  const setMode = (nextMode: AudienceMode) => {
    setModeState(nextMode);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, nextMode);

      const params = new URLSearchParams(window.location.search);
      if (nextMode === "default") {
        params.delete(modeQueryKey);
      } else {
        params.set(modeQueryKey, nextMode);
      }
      const query = params.toString();
      const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
      window.history.replaceState(window.history.state, "", nextUrl);
    }
  };

  useEffect(() => {
    const syncFromUrl = () => {
      const urlMode = getModeFromUrl();
      if (urlMode && urlMode !== mode) {
        setModeState(urlMode);
        window.localStorage.setItem(storageKey, urlMode);
      }
      setSectionOverride(getSectionOverrideFromUrl());
    };

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      isSectionVisible: (section: SectionKey) =>
        sectionOverride ? sectionOverride.includes(section) : modeVisibility[mode].includes(section)
    }),
    [mode, sectionOverride]
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within ModeProvider");
  }
  return context;
};
