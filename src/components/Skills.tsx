import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMode } from "../context/ModeContext";

const skillSet = [
  { key: "frontend", value: 95 },
  { key: "architecture", value: 90 },
  { key: "performance", value: 88 },
  { key: "leadership", value: 85 },
  { key: "communication", value: 87 }
];

const Skills = () => {
  const { t } = useTranslation();
  const { isSectionVisible } = useMode();
  const [hoveredSkillKey, setHoveredSkillKey] = useState<string | null>(null);
  const center = 120;
  const radius = 88;
  const levels = [0.2, 0.4, 0.6, 0.8, 1];
  const angleStep = (Math.PI * 2) / skillSet.length;

  const toPoint = (index: number, scale: number) => {
    const angle = -Math.PI / 2 + index * angleStep;
    const x = center + Math.cos(angle) * radius * scale;
    const y = center + Math.sin(angle) * radius * scale;
    return `${x},${y}`;
  };

  const levelPolygons = levels.map((level) => skillSet.map((_, index) => toPoint(index, level)).join(" "));
  const valuePolygon = skillSet.map((skill, index) => toPoint(index, skill.value / 100)).join(" ");
  const axisPoints = skillSet.map((_, index) => toPoint(index, 1));
  const hoveredSkill = skillSet.find((skill) => skill.key === hoveredSkillKey) ?? null;

  if (!isSectionVisible("skills")) {
    return null;
  }

  return (
    <section id="skills" className="glass-card">
      <h2 className="section-title">{t("skills.title")}</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-200/60 p-4 dark:bg-slate-900/50">
          <div className="mx-auto flex w-full max-w-[240px] justify-center">
            <svg viewBox="0 0 240 240" className="h-56 w-56 drop-shadow-[0_0_18px_rgba(56,189,248,0.25)]">
              {levelPolygons.map((points, index) => (
                <polygon
                  key={`level-${levels[index]}`}
                  points={points}
                  fill={index % 2 === 0 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"}
                  stroke="rgba(56,189,248,0.35)"
                  strokeWidth="1"
                />
              ))}
              {axisPoints.map((point, index) => {
                const [x, y] = point.split(",");
                return (
                  <line
                    key={`axis-${skillSet[index].key}`}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="rgba(56,189,248,0.4)"
                    strokeWidth="1"
                  />
                );
              })}
              <motion.polygon
                points={valuePolygon}
                fill="rgba(34,211,238,0.30)"
                stroke="rgba(16,185,129,0.95)"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0.85, transformOrigin: "120px 120px" }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              {skillSet.map((skill, index) => {
                const point = toPoint(index, skill.value / 100);
                const [x, y] = point.split(",");
                return (
                  <g key={`dot-${skill.key}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r="10"
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredSkillKey(skill.key)}
                      onMouseLeave={() => setHoveredSkillKey(null)}
                      onFocus={() => setHoveredSkillKey(skill.key)}
                      onBlur={() => setHoveredSkillKey(null)}
                      tabIndex={0}
                    />
                    <circle cx={x} cy={y} r="3.5" fill="rgba(14,165,233,0.95)" />
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="mt-3 min-h-12 rounded-xl border border-white/40 bg-white/50 px-3 py-2 text-center dark:border-white/10 dark:bg-white/5">
            {hoveredSkill ? (
              <p className="text-sm text-slate-700 dark:text-slate-200">
                <span className="font-semibold text-cyan-700 dark:text-cyan-200">{t(`skills.items.${hoveredSkill.key}`)}</span>
                {" - "}
                <span>{hoveredSkill.value}%</span>
              </p>
            ) : (
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Hover skill points to view details</p>
            )}
          </div>
        </div>
        <div className="space-y-3">
          {skillSet.map((skill) => (
            <div key={skill.key}>
              <div className="mb-1 flex justify-between text-sm text-slate-700 dark:text-slate-200">
                <span>{t(`skills.items.${skill.key}`)}</span>
                <span>{skill.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-400/60 dark:bg-slate-700/70">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.value}%` }} viewport={{ once: true }} className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
