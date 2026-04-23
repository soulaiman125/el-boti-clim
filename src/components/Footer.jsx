import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100 px-5 pb-8 pt-3 text-slate-600 dark:bg-[#0a0f1e] dark:text-slate-400 md:px-8">
      <div className="mx-auto max-w-7xl rounded-2xl border border-gray-200 bg-white p-6 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-['Sora'] text-lg font-bold text-gray-900 dark:text-white">EL BOTI CLIM SARL AU</p>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{t("footer.description")}</p>
          </div>
          <div>
            <p className="font-['Sora'] font-bold text-gray-900 dark:text-white">{t("footer.quickLinks")}</p>
            <div className="mt-3 grid gap-2 text-sm text-slate-700 dark:text-slate-400">
              <a href="#about" className="hover:text-cyan-600 dark:hover:text-cyan-300">{t("navbar.about")}</a>
              <a href="#services" className="hover:text-cyan-600 dark:hover:text-cyan-300">{t("navbar.services")}</a>
              <a href="#projects" className="hover:text-cyan-600 dark:hover:text-cyan-300">{t("navbar.projects")}</a>
              <a href="#contact" className="hover:text-cyan-600 dark:hover:text-cyan-300">{t("navbar.contact")}</a>
            </div>
          </div>
          <div>
            <p className="font-['Sora'] font-bold text-gray-900 dark:text-white">{t("footer.social")}</p>
            <div className="mt-3 flex items-center gap-2">
              <a href="https://www.facebook.com/share/14WszXsZ44a/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 hover:border-cyan-300/50 hover:text-cyan-600 dark:border-white/10 dark:bg-[#0d1526] dark:text-slate-100 dark:hover:text-cyan-300"><FaFacebookF /></a>
              <a href="https://www.instagram.com/bouticlim?igsh=MWJjMDEzYnZnNDk5ZA==" target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 hover:border-cyan-300/50 hover:text-cyan-600 dark:border-white/10 dark:bg-[#0d1526] dark:text-slate-100 dark:hover:text-cyan-300"><FaInstagram /></a>
              <a href="https://wa.me/212600748447" target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 hover:border-cyan-300/50 hover:text-cyan-600 dark:border-white/10 dark:bg-[#0d1526] dark:text-slate-100 dark:hover:text-cyan-300"><FaWhatsapp /></a>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-5 dark:border-white/10">
          <p className="text-sm text-slate-500 dark:text-slate-500">{t("footer.copyright")}</p>
          <motion.span className="inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-cyan-700 dark:text-cyan-200" whileHover={{ y: -2 }}>
            {t("footer.badge")}
          </motion.span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
