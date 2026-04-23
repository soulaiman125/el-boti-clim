import React from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from "../assets/el-boti-clim-logo.svg";
import LanguageDropdown from "./LanguageDropdown.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import MobileMenu from "./MobileMenu.jsx";

function Navbar({ theme, onToggleTheme }) {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeHref, setActiveHref] = React.useState("#home");
  const links = [
    { label: t("navbar.about"), href: "#about" },
    { label: t("navbar.services"), href: "#services" },
    { label: t("navbar.projects"), href: "#projects" },
    { label: t("navbar.testimonials"), href: "#testimonials" },
    { label: t("navbar.contact"), href: "#contact" },
  ];

  React.useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 820) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const targets = ["#home", ...links.map((link) => link.href)];
    const onScroll = () => {
      const offset = 140;
      const current = targets.find((target) => {
        const element = document.querySelector(target);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= offset && rect.bottom > offset;
      });
      if (current) setActiveHref(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [links]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "pt-2" : "pt-4"}`}
    >
      <nav
        className={`mx-auto flex w-full max-w-7xl items-center justify-between gap-5 rounded-[2rem] px-5 py-4 backdrop-blur-xl transition-all duration-300 lg:px-6 ${
          isScrolled
            ? "border border-black/10 bg-white/92 text-gray-800 shadow-[0_16px_44px_rgba(2,10,22,0.12)] dark:border-white/10 dark:bg-[#0a0f1e]/84 dark:text-white dark:shadow-[0_16px_44px_rgba(2,10,22,0.35)]"
            : "border border-black/10 bg-white/92 text-gray-800 shadow-[0_10px_32px_rgba(2,10,22,0.08)] dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-[0_10px_32px_rgba(2,10,22,0.16)]"
        }`}
        aria-label="Primary navigation"
      >
        <motion.a
          className="inline-flex min-w-0 items-center gap-3.5"
          href="#home"
          onClick={() => setIsMenuOpen(false)}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex h-14 flex-none items-center justify-center rounded-2xl bg-white px-3 shadow-[0_12px_26px_rgba(15,23,42,0.08)] dark:bg-white" aria-hidden="true">
            <img className="h-10 w-auto object-contain" src={logo} alt="" loading="lazy" />
          </span>
          <span className="hidden min-w-0 flex-col gap-1 md:flex">
            <strong className="font-['Sora'] text-[0.92rem] font-extrabold uppercase tracking-[0.12em] text-gray-900 dark:text-white">EL BOTI CLIM SARL AU</strong>
            <span className="max-w-[16rem] text-[0.8rem] leading-6 text-slate-500 dark:text-slate-300">{t("navbar.brandTagline")}</span>
          </span>
        </motion.a>

        <LayoutGroup>
          <motion.div
            className="hidden items-center gap-6 lg:flex"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative text-[0.95rem] font-bold tracking-[-0.01em] transition-colors ${
                    isActive
                      ? "text-cyan-600 dark:text-cyan-300"
                      : "text-gray-700 hover:text-cyan-600 dark:text-slate-200 dark:hover:text-cyan-300"
                  }`}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 h-[2px] w-full bg-cyan-500 dark:bg-cyan-300"
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full scale-x-0 bg-cyan-500 transition-transform duration-300 group-hover:scale-x-100 dark:bg-cyan-300" aria-hidden="true" />
                  )}
                </a>
              );
            })}
          </motion.div>
        </LayoutGroup>

        <motion.div
          className="hidden items-center gap-3 lg:flex"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <LanguageDropdown />
          <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

          <motion.a
            className="nav-cta-glow inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-300/50 bg-[linear-gradient(135deg,rgba(186,230,253,0.6),rgba(255,255,255,0.98))] px-6 text-sm font-extrabold text-cyan-800 shadow-[0_12px_28px_rgba(34,211,238,0.16)] transition-all hover:scale-[1.02] dark:border-cyan-300/20 dark:bg-[linear-gradient(135deg,rgba(8,145,178,0.22),rgba(13,21,38,0.96))] dark:text-cyan-100"
            href="#contact"
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("navbar.requestService")}
          </motion.a>
        </motion.div>

        <motion.button
          type="button"
          className={`menu-toggle relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-300 bg-white text-gray-800 shadow-sm backdrop-blur-lg dark:border-white/15 dark:bg-white/10 dark:text-white dark:shadow-soft lg:hidden ${
            isMenuOpen ? "is-open" : ""
          }`}
          onClick={() => setIsMenuOpen((currentState) => !currentState)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={
            isMenuOpen
              ? t("navbar.closeMenu")
              : t("navbar.openMenu")
          }
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.96 }}
        >
          <span />
          <span />
          <span />
        </motion.button>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <MobileMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            links={links}
            theme={theme}
            onToggleTheme={onToggleTheme}
            t={t}
          />
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
