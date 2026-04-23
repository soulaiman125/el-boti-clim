import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiMoon, FiSun } from "react-icons/fi";

const THEME_STORAGE_KEY = "el-boti-clim-theme";

function ThemeToggle({ theme, onToggleTheme, className = "" }) {
  const { t } = useTranslation();
  const nextMode = theme === "light" ? t("navbar.themeLabelDark") : t("navbar.themeLabelLight");
  const isDark = theme === "dark";

  const handleToggle = () => {
    if (typeof onToggleTheme === "function") {
      onToggleTheme();
    }
  };

  React.useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem(THEME_STORAGE_KEY, "light");
    }
  }, [theme]);

  const rootClassName = [
    "relative inline-flex h-12 w-[84px] cursor-pointer items-center rounded-full border border-black/10 p-1 text-gray-800 shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-all duration-300 dark:border-white/10 dark:text-slate-100 dark:shadow-[0_10px_28px_rgba(2,10,22,0.24)]",
    isDark
      ? "bg-gradient-to-br from-slate-800 to-slate-900"
      : "bg-gradient-to-br from-cyan-100 to-sky-100",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.button
      type="button"
      className={rootClassName}
      onClick={handleToggle}
      aria-label={t("navbar.themeAria", { mode: nextMode })}
      whileHover={{ y: -1.5 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative z-10 grid w-full grid-cols-2 items-center" aria-hidden="true">
        <span className={`inline-grid place-items-center text-[1rem] transition-all duration-300 ${isDark ? "opacity-50" : "opacity-100"}`}>
          <FiSun />
        </span>
        <span className={`inline-grid place-items-center text-[1rem] transition-all duration-300 ${isDark ? "opacity-100" : "opacity-50"}`}>
          <FiMoon />
        </span>
      </span>
      <motion.span
        className="absolute left-1 top-1 z-[1] h-10 w-10 rounded-full bg-white shadow-lg dark:bg-slate-100"
        aria-hidden="true"
        animate={{ x: isDark ? 40 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.button>
  );
}

export default ThemeToggle;
