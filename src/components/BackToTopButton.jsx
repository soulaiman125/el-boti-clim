import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function BackToTopButton() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t("common.backToTop")}
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.9 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 5.25 5.75 11.5l1.5 1.5 3.5-3.5V19h2.5V9.5l3.5 3.5 1.5-1.5L12 5.25Z"
              fill="currentColor"
            />
          </svg>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

export default BackToTopButton;
