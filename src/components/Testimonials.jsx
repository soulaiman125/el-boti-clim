import React from "react";
import { motion } from "framer-motion";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/pagination";
import { FadeIn } from "./animations/FadeIn.tsx";
import { ScaleOnHover } from "./animations/ScaleOnHover.tsx";
import { StaggerContainer } from "./animations/StaggerContainer.tsx";
import { springHover } from "./motion.js";

const avatarPalette = [
  ["#00c8ff", "#60a5fa"],
  ["#0ef0a0", "#14b8a6"],
  ["#3b82f6", "#06b6d4"],
  ["#06b6d4", "#22d3ee"],
];

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function Testimonials() {
  const { t } = useTranslation();
  const testimonials = t("testimonials.items", { returnObjects: true });

  return (
    <section id="testimonials" className="section section-tinted bg-white py-24 lg:py-32 dark:bg-[#0a0f1e]">
      <div className="container max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="section-heading section-heading-centered">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-300">{t("testimonials.eyebrow")}</p>
            <h2 className="font-['Sora'] text-3xl font-bold leading-tight text-gray-900 dark:text-white lg:text-5xl">{t("testimonials.title")}</h2>
            <p className="text-gray-600 dark:text-gray-300">{t("testimonials.description")}</p>
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.12}>
        <Swiper
          className="testimonials-swiper"
          modules={[Autoplay, Pagination, A11y]}
          slidesPerView={1}
          spaceBetween={20}
          loop
          autoplay={{ delay: 3600, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          breakpoints={{ 860: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={item.name}>
              <motion.div initial={{ opacity: 0, y: 22, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
                <ScaleOnHover>
                  <motion.article className="testimonial-card relative h-full cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm backdrop-blur-md will-change-transform dark:border-white/10 dark:bg-[#0d1526]" whileHover={springHover}>
                    <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent" aria-hidden="true" />
                    <FaQuoteLeft className="mb-4 text-cyan-300/80" />
                    <div className="mb-3 flex items-center gap-1 text-amber-300">
                      {Array.from({ length: 5 }).map((_, starIndex) => <FaStar key={starIndex} />)}
                    </div>
                    <p className="text-sm leading-7 text-gray-600 dark:text-gray-300 md:text-[15px]">"{item.quote}"</p>
                    <div className="mt-5 flex items-center gap-3">
                      <div
                        className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full text-sm font-extrabold text-white"
                        style={{ background: `linear-gradient(135deg, ${avatarPalette[index % avatarPalette.length][0]}, ${avatarPalette[index % avatarPalette.length][1]})` }}
                        aria-hidden="true"
                      >
                        {getInitials(item.name)}
                      </div>
                      <div>
                        <p className="font-['Sora'] font-bold text-gray-900 dark:text-slate-100">{item.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
                      </div>
                    </div>
                  </motion.article>
                </ScaleOnHover>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        </StaggerContainer>
      </div>
    </section>
  );
}

export default Testimonials;
