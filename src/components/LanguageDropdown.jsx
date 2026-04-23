import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

const languageOptions = [
  { code: "en", countryCode: "GB" },
  { code: "fr", countryCode: "FR" },
  { code: "ar", countryCode: "MA" },
];

function LanguageDropdown({ className = "" }) {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const rootRef = React.useRef(null);
  const currentLanguage = i18n.resolvedLanguage || i18n.language || "en";
  const activeLanguage = languageOptions.find((language) => currentLanguage.startsWith(language.code)) || languageOptions[0];

  React.useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className={["relative", className].filter(Boolean).join(" ")}>
      <motion.button
        type="button"
        className="inline-flex h-12 min-w-[102px] items-center justify-between gap-2 rounded-full border border-black/10 bg-white/92 px-3.5 text-gray-800 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/50 hover:bg-white dark:border-white/10 dark:bg-white/8 dark:text-slate-100 dark:shadow-[0_10px_28px_rgba(2,10,22,0.24)] dark:hover:border-cyan-300/35 dark:hover:bg-white/12"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t("navbar.languageLabel")}
        onClick={() => setIsOpen((current) => !current)}
        whileHover={{ y: -1.5 }}
        whileTap={{ scale: 0.985 }}
      >
        <span className="inline-flex items-center gap-2.5 text-sm font-extrabold uppercase tracking-[0.16em] text-gray-800 dark:text-white">
          <span className="inline-grid h-4 w-4 place-items-center overflow-hidden rounded-full" aria-hidden="true">
            <ReactCountryFlag countryCode={activeLanguage.countryCode} svg />
          </span>
          <span>{t(`navbar.language.${activeLanguage.code}`)}</span>
        </span>
        <motion.span className="text-[10px] text-slate-500 dark:text-slate-300" animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.35 }}>
          v
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen ? (
          <motion.ul
            className="absolute left-0 top-[calc(100%+0.55rem)] z-40 m-0 w-full list-none rounded-2xl border border-black/10 bg-white/96 p-2 shadow-[0_22px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0d1526]/96"
            role="listbox"
            aria-label={t("navbar.languageLabel")}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {languageOptions.map((language) => {
              const isActive = activeLanguage.code === language.code;
              return (
                <li key={language.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={`flex h-11 w-full items-center gap-2.5 rounded-xl px-2.5 text-left text-sm font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-100 via-sky-50 to-white text-cyan-900 dark:from-cyan-400/18 dark:via-sky-400/10 dark:to-transparent dark:text-cyan-100"
                        : "text-gray-700 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-white/8"
                    }`}
                    onClick={() => {
                      i18n.changeLanguage(language.code);
                      setIsOpen(false);
                    }}
                  >
                    <span className="inline-grid h-4 w-4 place-items-center overflow-hidden rounded-full" aria-hidden="true">
                      <ReactCountryFlag countryCode={language.countryCode} svg />
                    </span>
                    <span>{t(`navbar.language.${language.code}`)}</span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default LanguageDropdown;
