import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LuBadgeCheck, LuLeaf, LuShieldCheck, LuSlidersHorizontal, LuSparkles, LuTimer } from "react-icons/lu";
import { FadeIn } from "./animations/FadeIn.tsx";
import { ScaleOnHover } from "./animations/ScaleOnHover.tsx";
import { StaggerContainer } from "./animations/StaggerContainer.tsx";
import { springHover, staggerChild, staggerContainer } from "./motion.js";
import { PROJECT_IMAGES } from "../constants/images.ts";

const featureIcons = [LuLeaf, LuTimer, LuBadgeCheck, LuSlidersHorizontal, LuSparkles, LuShieldCheck];

function WhyChooseUs() {
  const { t, i18n } = useTranslation();
  const fallbackT = i18n.getFixedT("en");
  const featuresValue = t("whyChoose.features", { returnObjects: true });
  const proofItemsValue = t("whyChoose.proofItems", { returnObjects: true, defaultValue: fallbackT("whyChoose.proofItems", { returnObjects: true }) });
  const features = Array.isArray(featuresValue) ? featuresValue : fallbackT("whyChoose.features", { returnObjects: true });
  const proofItems = Array.isArray(proofItemsValue) ? proofItemsValue : fallbackT("whyChoose.proofItems", { returnObjects: true });

  return (
    <section id="why-choose" className="section section-tinted relative overflow-hidden bg-white py-24 lg:py-32 dark:bg-[#0a0f1e]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.12),transparent_62%)] dark:bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.18),transparent_62%)]" />

      <div className="container relative z-10 max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="section-heading section-heading-centered mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-300">{t("whyChoose.eyebrow")}</p>
            <h2 className="font-['Sora'] text-3xl font-bold leading-tight text-gray-900 dark:text-white lg:text-5xl">{t("whyChoose.title")}</h2>
            <p className="text-gray-600 dark:text-gray-300">{t("whyChoose.description")}</p>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <FadeIn direction="right">
            <motion.div
              className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-4 shadow-[0_24px_80px_rgba(2,10,22,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-[#0d1526]"
              whileHover={{ y: -4 }}
            >
              <div className="relative overflow-hidden rounded-[1.6rem]">
                <img
                  src={PROJECT_IMAGES.commercial}
                  alt={t("whyChoose.visualAlt")}
                  className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[520px]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-950/18 to-transparent" aria-hidden="true" />
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-cyan-300/35 bg-white/85 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-cyan-800 shadow-sm backdrop-blur dark:bg-slate-950/55 dark:text-cyan-100">
                  {t("whyChoose.visualBadge")}
                </span>
                <div className="absolute inset-x-4 bottom-4 rounded-[1.4rem] border border-white/15 bg-slate-950/62 p-5 text-white shadow-[0_12px_32px_rgba(2,10,22,0.3)] backdrop-blur-xl">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">{t("whyChoose.highlightTitle")}</p>
                  <p className="mt-2 text-base font-semibold leading-7 text-white/96">{t("whyChoose.highlightText")}</p>
                </div>
              </div>
            </motion.div>
          </FadeIn>

          <div className="grid gap-6">
            <FadeIn direction="left" delay={0.08}>
              <div className="rounded-[1.8rem] border border-gray-200 bg-white p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#0d1526]">
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">{t("whyChoose.introLabel")}</p>
                <h3 className="mt-3 font-['Sora'] text-2xl font-bold text-gray-900 dark:text-white md:text-[2rem]">{t("whyChoose.introTitle")}</h3>
                <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">{t("whyChoose.description")}</p>
                <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">{t("whyChoose.secondaryText")}</p>
              </div>
            </FadeIn>

            <StaggerContainer staggerDelay={0.08}>
              <motion.div className="grid gap-5 md:grid-cols-2" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                {features.map((feature, index) => {
                  const Icon = featureIcons[index];
                  return (
                    <motion.div key={feature.title} variants={staggerChild} transition={{ duration: 0.6, delay: index * 0.08 }}>
                      <ScaleOnHover>
                        <motion.article
                          className="why-card h-full rounded-[1.6rem] border border-gray-200 bg-white p-6 shadow-sm backdrop-blur-md transition-colors will-change-transform hover:border-cyan-200 hover:shadow-md dark:border-white/10 dark:bg-[#0d1526]"
                          whileHover={springHover}
                        >
                          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-50 text-cyan-700 shadow-[0_10px_24px_rgba(6,182,212,0.12)] dark:border-cyan-300/20 dark:bg-cyan-400/10 dark:text-cyan-300 dark:shadow-[0_10px_24px_rgba(6,182,212,0.18)]">
                            <Icon className="text-2xl" />
                          </div>
                          <h3 className="font-['Sora'] text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">{feature.description}</p>
                        </motion.article>
                      </ScaleOnHover>
                    </motion.div>
                  );
                })}
              </motion.div>
            </StaggerContainer>
          </div>
        </div>

        <FadeIn delay={0.12}>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {proofItems.map((item) => (
              <div key={item.label} className="rounded-[1.6rem] border border-gray-200 bg-white px-5 py-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#0d1526]">
                <p className="text-3xl font-black tracking-[-0.06em] text-gray-900 dark:text-white">{item.value}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300">{item.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default WhyChooseUs;
