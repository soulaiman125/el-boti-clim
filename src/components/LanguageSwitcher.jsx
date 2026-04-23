import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const languages = ["en", "fr", "ar"];

function LanguageSwitcher({ className = "", compact = false }) {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage || i18n.language || "en";
  const switcherClassName = ["language-switcher", compact ? "language-switcher-compact" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={switcherClassName} role="group" aria-label={t("navbar.languageLabel")}>
      {languages.map((language) => {
        const isActive = currentLanguage.startsWith(language);

        return (
          <motion.button
            key={language}
            type="button"
            className={`language-switcher-button${isActive ? " is-active" : ""}`}
            onClick={() => i18n.changeLanguage(language)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {t(`navbar.language.${language}`)}
          </motion.button>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
