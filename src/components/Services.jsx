import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LuBadgeCheck, LuBuilding2, LuFan, LuFlame, LuSettings2, LuShieldAlert, LuSnowflake } from "react-icons/lu";
import { FadeIn } from "./animations/FadeIn.tsx";
import { ScaleOnHover } from "./animations/ScaleOnHover.tsx";
import { StaggerContainer } from "./animations/StaggerContainer.tsx";
import { premiumEase, springHover, staggerChild, staggerContainer } from "./motion.js";

const serviceIcons = [LuSnowflake, LuSettings2, LuFlame, LuFan, LuShieldAlert, LuBuilding2];

function Services() {
  const { t, i18n } = useTranslation();
  const fallbackT = i18n.getFixedT("en");
  const servicesValue = t("services.items", { returnObjects: true });
  const featuredServiceValue = t("services.featured", { returnObjects: true, defaultValue: fallbackT("services.featured", { returnObjects: true }) });
  const proofItemsValue = t("services.proofItems", { returnObjects: true, defaultValue: fallbackT("services.proofItems", { returnObjects: true }) });
  const services = Array.isArray(servicesValue) ? servicesValue : fallbackT("services.items", { returnObjects: true });
  const featuredService = typeof featuredServiceValue === "object" && featuredServiceValue !== null
    ? featuredServiceValue
    : fallbackT("services.featured", { returnObjects: true });
  const proofItems = Array.isArray(proofItemsValue) ? proofItemsValue : fallbackT("services.proofItems", { returnObjects: true });

  return (
    <section
      id="services"
      className="relative bg-slate-50 py-24 lg:py-32 dark:bg-[#0a0f1e]"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-300">{t("services.eyebrow")}</p>
            <h2 className="font-['Sora'] text-3xl font-bold leading-tight text-gray-900 dark:text-white lg:text-5xl">{t("services.title")}</h2>
            <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">{t("services.description")}</p>
            <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">{t("services.secondaryText")}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {proofItems.map((item) => (
                <div key={item.label} className="rounded-2xl border border-gray-200 bg-white px-4 py-4 text-left shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#0d1526]">
                  <p className="text-2xl font-black tracking-[-0.05em] text-gray-900 dark:text-white">{item.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.1}>
        <motion.div className="grid auto-rows-[1fr] gap-5 md:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <motion.article
            className="service-card group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm backdrop-blur-md will-change-transform dark:border-white/10 dark:bg-[#0d1526] md:col-span-2"
            variants={staggerChild}
            whileHover={{ ...springHover, boxShadow: "0 0 0 1px rgba(0,200,255,0.35), 0 24px 60px rgba(0,200,255,0.2)" }}
          >
            <span className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden="true" />
            <LuBuilding2 className="mb-4 text-4xl text-cyan-700 drop-shadow-[0_0_10px_rgba(0,153,204,0.45)] dark:text-cyan-300 dark:drop-shadow-[0_0_12px_rgba(0,200,255,0.6)]" />
            <h3 className="font-['Sora'] text-2xl font-bold text-gray-900 dark:text-white">{featuredService.title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-300">
              {featuredService.description}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {(featuredService.points || []).map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-2xl border border-gray-200/80 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                  <LuBadgeCheck className="mt-0.5 flex-none text-cyan-600 dark:text-cyan-300" />
                  <p className="text-sm font-medium leading-6 text-gray-700 dark:text-slate-200">{point}</p>
                </div>
              ))}
            </div>
          </motion.article>

          {services.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.div key={service.title} variants={staggerChild} transition={{ duration: 0.6, delay: index * 0.03, ease: premiumEase }}>
                <ScaleOnHover>
                  <motion.article
                    className="service-card group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm backdrop-blur-md will-change-transform dark:border-white/10 dark:bg-[#0d1526]"
                    whileHover={{ ...springHover, boxShadow: "0 0 0 1px rgba(0,200,255,0.35), 0 24px 60px rgba(0,200,255,0.2)" }}
                  >
                    <Icon className="mb-4 text-3xl text-cyan-700 drop-shadow-[0_0_8px_rgba(0,153,204,0.35)] dark:text-cyan-300 dark:drop-shadow-[0_0_10px_rgba(0,200,255,0.6)]" />
                    <h3 className="font-['Sora'] text-xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300">{service.description}</p>
                  </motion.article>
                </ScaleOnHover>
              </motion.div>
            );
          })}
        </motion.div>
        </StaggerContainer>
      </div>
    </section>
  );
}

export default Services;
