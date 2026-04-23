import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FadeIn } from "./animations/FadeIn.tsx";
import { viewport } from "./motion.js";

function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = React.useState(0);
  const faqs = t("faq.items", { returnObjects: true });

  return (
    <section id="faq" className="section section-tinted bg-slate-50 py-24 lg:py-32 dark:bg-[#0a0f1e]">
      <div className="container max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="section-heading section-heading-centered">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-300">{t("faq.eyebrow")}</p>
            <h2 className="font-['Sora'] text-3xl font-bold leading-tight text-gray-900 dark:text-white lg:text-5xl">{t("faq.title")}</h2>
            <p className="text-gray-600 dark:text-gray-300">{t("faq.description")}</p>
          </div>
        </FadeIn>

        <div className="mx-auto grid max-w-4xl gap-4">
          {faqs.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <FadeIn key={item.question} delay={index * 0.08}>
              <motion.article
                className={`faq-item relative overflow-hidden rounded-2xl border bg-white shadow-sm backdrop-blur-md dark:bg-[#0d1526] ${isOpen ? "border-[#0099cc]/40 shadow-[inset_3px_0_0_0_rgba(0,153,204,0.9)] dark:border-cyan-300/55 dark:shadow-[inset_3px_0_0_0_rgba(0,200,255,0.9)]" : "border-gray-200 dark:border-white/10"}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <span className="absolute inset-y-0 left-0 w-[3px] origin-top bg-[#0099cc] dark:bg-cyan-300">
                  <motion.span
                    className="absolute inset-0 origin-top bg-[#0099cc] dark:bg-cyan-300"
                    animate={{ scaleY: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </span>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                  aria-expanded={isOpen}
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-xs font-extrabold text-[#0099cc] dark:border-white/15 dark:bg-white/10 dark:text-cyan-300">
                      {index + 1}
                    </span>
                    <span className="font-['Sora'] text-base font-bold text-gray-900 dark:text-slate-100">{item.question}</span>
                  </span>
                  <span className="text-[#0099cc] dark:text-cyan-300">{isOpen ? "-" : "+"}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 pb-5">
                        <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">{item.answer}</p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
