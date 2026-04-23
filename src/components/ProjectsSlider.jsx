import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FadeIn } from "./animations/FadeIn.tsx";
import { springHover } from "./motion.js";
import { PROJECT_IMAGES } from "../constants/images.ts";

function ProjectsSlider() {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = React.useState(1);
  const sectionRef = React.useRef(null);
  const projectImages = [
    PROJECT_IMAGES.heating,
    PROJECT_IMAGES.home,
    PROJECT_IMAGES.office,
    PROJECT_IMAGES.commercial,
  ];
  const projects = t("projects.showcase", { returnObjects: true }).map((project, index) => ({
    ...project,
    image: projectImages[index],
  }));
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const shellY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-slate-50 py-24 lg:py-32 dark:bg-[#0a0f1e]"
    >
      <motion.div className="mx-auto w-full max-w-7xl px-6 lg:px-8" style={{ y: shellY }}>
        <FadeIn>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-300">{t("projects.eyebrow")}</p>
            <h2 className="font-['Sora'] text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">{t("projects.title")}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-200 md:text-base">
              {t("projects.description")}
            </p>
          </div>
        </FadeIn>

        <motion.div
          className="relative rounded-[2rem] border border-gray-200 bg-white p-4 shadow-sm backdrop-blur-lg dark:border-white/10 dark:bg-white/5 dark:shadow-soft md:p-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <Swiper
            className="projects-swiper"
            modules={[Navigation, Pagination, Autoplay, A11y]}
            spaceBetween={22}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop
            grabCursor
            allowTouchMove
            onInit={(swiper) => {
              if (swiper.navigation?.nextEl && swiper.navigation?.prevEl) {
                swiper.navigation.nextEl.setAttribute("aria-label", t("projects.nextProject"));
                swiper.navigation.prevEl.setAttribute("aria-label", t("projects.previousProject"));
              }
            }}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex + 1)}
            breakpoints={{
              700: { slidesPerView: 2, spaceBetween: 20 },
              1080: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {projects.map((project, index) => (
              <SwiperSlide key={project.title}>
                <motion.article
                  className={`project-card group cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm backdrop-blur-md will-change-transform dark:border-white/10 dark:bg-slate-900/60 dark:shadow-xl ${activeSlide === index + 1 ? "scale-[1.02]" : "scale-100"}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={springHover}
                >
                  <div className="project-media p-3">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                    <motion.img
                      className="project-image h-full w-full scale-100 rounded-xl object-cover shadow-lg transition-transform duration-700 ease-out group-hover:scale-110"
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" aria-hidden="true" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                      <p className="font-['Sora'] text-lg font-bold text-white">{project.title}</p>
                      <p className="text-sm text-white/85 opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100">{project.description}</p>
                    </div>
                    </div>
                    <span className="project-badge project-badge-glass">{project.location}</span>
                  </div>
                  <div className="p-6 pt-4">
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-200">{project.description}</p>
                  </div>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>
          <p className="mt-4 text-center text-sm font-semibold text-slate-600 dark:text-slate-200" aria-live="polite">
            {activeSlide} / {projects.length}
          </p>
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
        >
          <a
            className="inline-flex min-h-[3.3rem] items-center justify-center rounded-full bg-brand-gradient px-7 text-sm font-extrabold text-white shadow-glow transition-all hover:scale-105"
            href="#contact"
          >
            {t("projects.viewAll")}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ProjectsSlider;
