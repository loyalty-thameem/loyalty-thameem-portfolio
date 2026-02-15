import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMode } from "../context/ModeContext";
import { resumeData } from "../data/resumeData";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const AIChat = () => {
  const { t } = useTranslation();
  const { isSectionVisible } = useMode();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef<number | null>(null);

  const quickQuestions = useMemo(() => resumeData.qa.map((entry) => entry.question), []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", text: t("chat.hint") }]);
    }
  }, [messages.length, open, t]);

  const answerQuestion = (input: string) => {
    const trimmed = input.trim();
    const normalized = trimmed.toLowerCase();
    if (!normalized) {
      return;
    }

    setQuery("");
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);

    const exactMatch = resumeData.qa.find((item) => item.question.toLowerCase() === normalized);
    const softMatch = resumeData.qa.find((item) => normalized.includes(item.question.toLowerCase().split(" ")[0]));
    const response = exactMatch?.answer ?? softMatch?.answer ?? "I can answer based on resume highlights. Try one of the suggested questions.";

    if (typingTimerRef.current) {
      window.clearInterval(typingTimerRef.current);
    }
    setIsTyping(true);
    let index = 0;
    let createdAssistantMessage = false;
    typingTimerRef.current = window.setInterval(() => {
      index += 1;
      const partial = response.slice(0, index);
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && createdAssistantMessage) {
          return [...prev.slice(0, -1), { role: "assistant", text: partial }];
        }
        createdAssistantMessage = true;
        return [...prev, { role: "assistant", text: partial }];
      });
      if (index >= response.length) {
        if (typingTimerRef.current) {
          window.clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
        }
        setIsTyping(false);
      }
    }, 16);
  };

  useEffect(() => () => {
    if (typingTimerRef.current) {
      window.clearInterval(typingTimerRef.current);
    }
  }, []);

  const latestAssistantMessage = [...messages].reverse().find((item) => item.role === "assistant")?.text ?? "";

  const playSpeech = () => {
    if (!latestAssistantMessage || !("speechSynthesis" in window)) {
      return;
    }
    const utterance = new SpeechSynthesisUtterance(latestAssistantMessage);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  if (!isSectionVisible("aiChat")) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 md:bottom-6 md:left-6">
      <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-cyan-300/40 bg-cyan-400/20 px-4 py-2 text-sm text-cyan-900 shadow-[0_0_20px_rgba(56,189,248,0.35)] backdrop-blur dark:text-cyan-100">
        {t("chat.title")}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }} className="mt-3 w-[20rem] rounded-2xl border border-white/20 bg-slate-100/90 p-4 text-sm text-slate-900 shadow-xl backdrop-blur-xl dark:bg-slate-900/85 dark:text-slate-100">
            <p className="mb-2 text-xs uppercase tracking-wide text-cyan-700 dark:text-cyan-300">{t("chat.quickQuestions")}</p>
            <div className="mb-3 flex flex-wrap gap-2">
              {quickQuestions.map((question) => (
                <button key={question} type="button" onClick={() => answerQuestion(question)} className="rounded-lg border border-white/15 bg-white/40 px-2 py-1 text-xs hover:bg-white/60 dark:bg-white/5 dark:hover:bg-white/10">{question}</button>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("chat.placeholder")} className="w-full rounded-lg border border-white/15 bg-white/40 px-3 py-2 text-xs outline-none dark:bg-black/25" />
              <button type="button" onClick={() => answerQuestion(query)} className="rounded-lg bg-cyan-400 px-3 py-2 text-xs font-semibold text-slate-900">{t("chat.send")}</button>
            </div>
            <div className="mt-3 max-h-52 min-h-14 space-y-2 overflow-y-auto rounded-lg border border-white/15 bg-white/30 p-2 text-xs leading-relaxed dark:bg-white/5">
              {messages.map((message, index) => (
                <motion.div key={`${message.role}-${index}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[92%] rounded-lg px-2 py-1 ${message.role === "user" ? "ms-auto bg-cyan-500/25 text-slate-900 dark:text-slate-100" : "me-auto bg-white/45 text-slate-900 dark:bg-white/10 dark:text-slate-100"}`}>
                  {message.text}
                </motion.div>
              ))}
              {isTyping && <p className="text-slate-500 dark:text-slate-400">...</p>}
            </div>
            <button type="button" onClick={playSpeech} className="mt-2 rounded-lg border border-cyan-300/40 px-2 py-1 text-xs text-cyan-700 dark:text-cyan-200">{t("chat.play")}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChat;
