import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function FloatingWhatsApp() {
  const { t } = useTranslation();

  return (
    <motion.a
      className="floating-whatsapp glass-panel"
      href="https://wa.me/212600748447"
      target="_blank"
      rel="noreferrer"
      aria-label={t("floatingWhatsApp.aria")}
      initial={{ opacity: 0, scale: 0.8, y: 24 }}
      animate={{
        opacity: 1,
        scale: [1, 1.04, 1],
        y: [0, -6, 0],
      }}
      transition={{
        opacity: { duration: 0.4, delay: 0.7 },
        scale: { duration: 2.2, delay: 0.7, repeat: Infinity, ease: "easeInOut" },
        y: {
          duration: 2.8,
          ease: "easeInOut",
          repeat: Infinity,
        },
      }}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="floating-whatsapp-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" role="presentation">
          <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2a9.9 9.9 0 0 0-8.6 14.8L2 22l5.34-1.4a9.9 9.9 0 0 0 4.69 1.2h.01c5.47 0 9.92-4.45 9.92-9.9a9.8 9.8 0 0 0-2.9-6.99Zm-7.02 15.21h-.01a8.24 8.24 0 0 1-4.19-1.14l-.3-.18-3.17.83.85-3.09-.2-.31a8.23 8.23 0 0 1-1.28-4.38c0-4.55 3.72-8.26 8.3-8.26 2.21 0 4.29.86 5.85 2.42a8.2 8.2 0 0 1 2.42 5.85c0 4.56-3.72 8.26-8.27 8.26Zm4.53-6.18c-.25-.13-1.47-.72-1.7-.8-.22-.08-.38-.13-.55.12-.17.25-.63.8-.77.97-.14.17-.29.2-.54.07-.25-.13-1.05-.39-2.01-1.25a7.5 7.5 0 0 1-1.4-1.73c-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.55-1.32-.76-1.82-.2-.47-.4-.4-.55-.4h-.47c-.17 0-.45.06-.68.32-.23.25-.88.86-.88 2.09 0 1.22.9 2.4 1.02 2.56.13.17 1.77 2.7 4.29 3.8.6.25 1.07.4 1.44.51.61.19 1.17.16 1.61.1.5-.08 1.47-.6 1.68-1.17.21-.57.21-1.07.15-1.17-.06-.1-.22-.16-.47-.28Z" />
        </svg>
      </span>
      <span className="floating-whatsapp-copy">
        <strong>{t("floatingWhatsApp.title")}</strong>
        <span>{t("floatingWhatsApp.subtitle")}</span>
      </span>
    </motion.a>
  );
}

export default FloatingWhatsApp;
