import React from "react";
import { motion } from "framer-motion";
import LanguageDropdown from "./LanguageDropdown.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import logo from "../assets/el-boti-clim-logo.svg";

const cardTransition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1],
};

const overlayTransition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1],
};

function MobileMenu({ isOpen, onClose, links, theme, onToggleTheme, t }) {
  return (
    <motion.div
      className="mobile-menu-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={overlayTransition}
      aria-hidden={!isOpen}
      onClick={onClose}
    >
      <motion.button
        type="button"
        className="mobile-menu-backdrop"
        aria-label={t("navbar.closeMenu")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={overlayTransition}
      />

      <motion.aside
        id="mobile-menu"
        className="mobile-menu-card"
        role="dialog"
        aria-modal="true"
        aria-label={t("navbar.menuAria")}
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -12 }}
        transition={cardTransition}
        onClick={(event) => event.stopPropagation()}
      >
        <span className="mobile-menu-card-highlight" aria-hidden="true" />

        <div className="mobile-menu-header">
          <a className="mobile-menu-brand" href="#home" onClick={onClose}>
            <span className="mobile-menu-brand-logo" aria-hidden="true">
              <img className="h-10 w-auto object-contain" src={logo} alt="" loading="lazy" />
            </span>
            <span className="mobile-menu-brand-copy">
              <strong>EL BOTI CLIM SARL AU</strong>
              <span>{t("navbar.brandTagline")}</span>
            </span>
          </a>

          <motion.button
            type="button"
            className="mobile-menu-close"
            onClick={onClose}
            aria-label={t("navbar.closeMenu")}
            whileHover={{ rotate: 90, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span />
            <span />
          </motion.button>
        </div>

        <div className="mobile-menu-controls">
          <LanguageDropdown className="mobile-language-dropdown" />
          <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} className="mobile-theme-toggle" />
        </div>

        <div className="mobile-menu-links" role="menu" aria-label={t("navbar.menuAria")}>
          {links.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="mobile-menu-link"
              role="menuitem"
              onClick={onClose}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.24, delay: 0.05 + index * 0.04, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <motion.a
          className="button button-primary mobile-menu-cta"
          href="#contact"
          onClick={onClose}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.24, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {t("navbar.requestService")}
        </motion.a>
      </motion.aside>
    </motion.div>
  );
}

export default MobileMenu;
