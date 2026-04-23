import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LuClock3, LuMapPin, LuShieldCheck } from "react-icons/lu";
import { fadeUp, slideCard, staggerContainer, viewport } from "./motion.js";
import { FadeIn } from "./animations/FadeIn.tsx";
import { ABOUT_IMAGE } from "../constants/images.ts";

function About() {
  const { t, i18n } = useTranslation();
  const fallbackT = i18n.getFixedT("en");
  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const mediaRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  const highlightsValue = t("about.highlights", { returnObjects: true });
  const proofItemsValue = t("about.proofItems", { returnObjects: true, defaultValue: fallbackT("about.proofItems", { returnObjects: true }) });
  const highlights = Array.isArray(highlightsValue) ? highlightsValue : fallbackT("about.highlights", { returnObjects: true });
  const proofItems = Array.isArray(proofItemsValue) ? proofItemsValue : fallbackT("about.proofItems", { returnObjects: true });
  const proofIcons = [LuShieldCheck, LuClock3, LuMapPin];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section section-tinted about-section bg-white py-24 lg:py-32 dark:bg-[#0a0f1e]"
    >
      <div className="container split-layout max-w-7xl px-6 lg:px-8">
        <FadeIn direction="right">
        <motion.figure
          className="about-media"
          style={{ y: mediaY, rotateY: mediaRotate, transformPerspective: 1200 }}
          variants={slideCard}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <span className="about-media-label">{t("about.teamLabel")}</span>
          <div className="about-media-frame">
            <motion.img
              src={ABOUT_IMAGE}
              alt={t("about.imageAlt")}
              className="about-media-image rounded-2xl object-cover w-full h-full shadow-lg"
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-[1.4rem] border border-white/20 bg-slate-950/62 p-4 text-white shadow-[0_12px_30px_rgba(2,10,22,0.32)] backdrop-blur-xl">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-cyan-200">{t("about.mediaBadge")}</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-white/95">{t("about.mediaText")}</p>
            </div>
          </div>
        </motion.figure>
        </FadeIn>

        <FadeIn direction="left" delay={0.2}>
        <motion.div
          className="about-content"
          style={{ y: contentY }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <p className="eyebrow">{t("about.eyebrow")}</p>
          <h2 className="text-gray-900 dark:text-white">{t("about.title")}</h2>
          <p className="about-description text-gray-600 dark:text-gray-300">{t("about.description")}</p>
          <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">{t("about.secondaryText")}</p>
          <div className="about-panel-row">
            <div className="about-premium-panel glass-panel">
              <span className="text-gray-600 dark:text-gray-300">{t("about.panelLabel")}</span>
              <strong className="text-gray-900 dark:text-white">{t("about.panelText")}</strong>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {proofItems.map((item, index) => {
              const Icon = proofIcons[index];
              return (
                <div key={item.label} className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#0d1526]">
                  <Icon className="text-xl text-cyan-600 dark:text-cyan-300" />
                  <p className="mt-3 text-2xl font-black tracking-[-0.05em] text-gray-900 dark:text-white">{item.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{item.label}</p>
                </div>
              );
            })}
          </div>
          <motion.ul
            className="about-highlights"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {highlights.map((highlight) => (
              <motion.li key={highlight} className="about-highlight-item" variants={slideCard}>
                <span className="about-highlight-icon" aria-hidden="true">
                  +
                </span>
                <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

export default About;
