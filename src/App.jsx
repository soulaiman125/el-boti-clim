import React, { Suspense, lazy, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import BackToTopButton from "./components/BackToTopButton.jsx";
import LoadingScreen from "./components/LoadingScreen.tsx";

const About = lazy(() => import("./components/About.jsx"));
const Services = lazy(() => import("./components/Services.jsx"));
const WhyChooseUs = lazy(() => import("./components/WhyChooseUs.jsx"));
const ProjectsSlider = lazy(() => import("./components/ProjectsSlider.jsx"));
const Testimonials = lazy(() => import("./components/Testimonials.jsx"));
const FAQ = lazy(() => import("./components/FAQ.jsx"));
const Contact = lazy(() => import("./components/Contact.jsx"));

const THEME_STORAGE_KEY = "el-boti-clim-theme";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [isLoading, setIsLoading] = useState(true);
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage || i18n.language || "en";
  const { scrollY, scrollYProgress } = useScroll();
  const orbOneY = useTransform(scrollY, [0, 1600], [0, 220]);
  const orbTwoY = useTransform(scrollY, [0, 1600], [0, -180]);
  const gridY = useTransform(scrollY, [0, 1800], [0, -120]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${theme}-theme`);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const loaderTimeout = window.setTimeout(() => setIsLoading(false), 1600);

    return () => window.clearTimeout(loaderTimeout);
  }, []);

  useEffect(() => {
    const language = currentLanguage.startsWith("fr")
      ? "fr"
      : currentLanguage.startsWith("ar")
        ? "ar"
        : "en";
    const direction = language === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [currentLanguage]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="site-shell">
      <AnimatePresence mode="wait">
        {isLoading ? <LoadingScreen key="loading-screen" /> : null}
      </AnimatePresence>
      <div className="scroll-progress" aria-hidden="true">
        <motion.div className="scroll-progress-bar" style={{ scaleX: scrollYProgress }} />
      </div>
      <motion.div className="ambient-orb ambient-orb-one" style={{ y: orbOneY }} aria-hidden="true" />
      <motion.div className="ambient-orb ambient-orb-two" style={{ y: orbTwoY }} aria-hidden="true" />
      <motion.div className="ambient-grid" style={{ y: gridY }} aria-hidden="true" />
      <a className="skip-link" href="#main-content">
        {t("common.skipToContent")}
      </a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content" className="site-main">
        <Hero />
        <Suspense fallback={<div className="mx-auto w-full max-w-7xl px-6 py-16 text-center text-slate-600 dark:text-slate-300">{t("common.loadingContent")}</div>}>
          <About />
          <Services />
          <WhyChooseUs />
          <ProjectsSlider />
          <Testimonials />
          <FAQ />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <BackToTopButton />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
