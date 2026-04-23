import React from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from "../assets/el-boti-clim-logo.svg";
import { HERO_IMAGE, HERO_IMAGE_FALLBACK } from "../constants/images.ts";

function Typewriter({ lines }) {
  const prefersReducedMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const safeLines = Array.isArray(lines) && lines.length > 0 ? lines : [""];

  React.useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const current = safeLines[phraseIndex];
    const typingDelay = isDeleting ? 35 : 55;
    const holdDelay = 1200;
    const restartDelay = 260;

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting && charIndex < current.length) {
        setCharIndex((prev) => prev + 1);
        return;
      }

      if (!isDeleting && charIndex === current.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && charIndex > 0) {
        setCharIndex((prev) => prev - 1);
        return;
      }

      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % safeLines.length);
      }
    }, !isDeleting && charIndex === current.length ? holdDelay : charIndex === 0 && !isDeleting ? restartDelay : typingDelay);

    return () => window.clearTimeout(timeoutId);
  }, [charIndex, isDeleting, phraseIndex, prefersReducedMotion, safeLines]);

  const visibleText = prefersReducedMotion
    ? safeLines[0]
    : safeLines[phraseIndex].slice(0, charIndex);

  return (
    <div className="hero-typing mt-6 min-h-8 text-lg">
      <span className="font-medium text-slate-800 dark:text-white">{visibleText}</span>
    </div>
  );
}

function CountBadge({ value, suffix, label }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 110, damping: 18 });
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }
    let frameId = 0;
    const duration = 2000;
    const startedAt = performance.now();

    const animateValue = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      motionValue.set(progress * value);
      if (progress < 1) {
        frameId = requestAnimationFrame(animateValue);
      }
    };

    frameId = requestAnimationFrame(animateValue);
    return () => cancelAnimationFrame(frameId);
  }, [inView, motionValue, prefersReducedMotion, value]);

  React.useEffect(() => spring.on("change", (latest) => setDisplayValue(Math.round(latest))), [spring]);

  return (
    <motion.div
      ref={ref}
      className="will-change-transform cursor-pointer rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5"
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 17 } }}
    >
      <p className="text-2xl font-black text-gray-900 dark:text-slate-100 md:text-3xl">
        {displayValue}
        {suffix}
      </p>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{label}</p>
    </motion.div>
  );
}

function Hero() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [heroImageSrc, setHeroImageSrc] = React.useState(HERO_IMAGE);
  const titleParts = t("hero.titleParts", { returnObjects: true });
  const rotatingLines = t("hero.rotatingLines", { returnObjects: true });
  const titleVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 0.55,
            delay: index * 0.1,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
    }),
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-white py-24 lg:py-32 dark:bg-[#0a0f1e]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 hidden dark:block dark:bg-[radial-gradient(circle_at_18%_20%,rgba(0,200,255,0.22),transparent_34%),radial-gradient(circle_at_78%_12%,rgba(14,240,160,0.17),transparent_28%),linear-gradient(180deg,#0a0f1e_0%,#070d1a_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(#00c8ff15_1px,transparent_1px)] [background-size:24px_24px] dark:opacity-20 dark:[background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.24)_1px,transparent_1px)]" />

      {!prefersReducedMotion ? (
        <>
          <motion.div
            className="pointer-events-none absolute -left-32 top-16 -z-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-28 bottom-16 -z-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl"
            animate={{ x: [0, -24, 0], y: [0, 24, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : null}

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <motion.div className="relative z-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            {t("hero.eyebrow")}
          </p>
          <img src={logo} alt="EL BOTI CLIM logo" className="mb-4 h-auto w-full max-w-[120px]" />
          <h1 className="max-w-[21ch] pr-2 font-['Sora'] text-4xl font-bold leading-[1.12] text-gray-900 dark:text-white md:text-6xl">
            {titleParts.map((part, index) => (
              <motion.span
                key={`${part.text}-${index}`}
                custom={index}
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={part.accent ? { color: "var(--accent)" } : undefined}
              >
                {part.text}
              </motion.span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Typewriter lines={rotatingLines} />
          </motion.div>

          <div className="mt-7 flex flex-wrap gap-3">
            <motion.a
              className="group relative inline-flex min-h-[3.2rem] items-center justify-center overflow-hidden rounded-full bg-cyan-500 px-6 text-sm font-extrabold text-white shadow-[0_10px_30px_rgba(56,189,248,0.28)] will-change-transform dark:bg-cyan-400 dark:text-slate-950 dark:shadow-[0_10px_30px_rgba(34,211,238,0.35)]"
              href="#contact"
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 30px rgba(0,200,255,0.4)",
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="relative z-10">{t("hero.primaryCta")}</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              />
            </motion.a>
            <motion.a
              className="group relative inline-flex min-h-[3.2rem] items-center justify-center gap-2 overflow-hidden rounded-full border border-gray-300 bg-white px-6 text-sm font-bold text-gray-900 will-change-transform dark:border-white/20 dark:bg-white/5 dark:text-slate-100"
              href="#services"
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{t("hero.secondaryCta")}</span>
              <span aria-hidden="true">-&gt;</span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-500 group-hover:translate-x-full" />
            </motion.a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <CountBadge value={10} suffix="+" label={t("hero.stats.experienceLabel")} />
            <CountBadge value={24} suffix="/7" label={t("hero.stats.supportLabel")} />
            <CountBadge value={100} suffix="%" label={t("hero.stats.recommendationLabel")} />
          </div>
        </motion.div>

        <motion.div
          className="relative z-10 will-change-transform"
          initial={{ opacity: 0, x: 36, rotate: 1.8 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.65),transparent_70%)] blur-[120px] opacity-30 dark:bg-[radial-gradient(circle,rgba(56,189,248,0.8),transparent_70%)]" />
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
            transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: 6, ease: "easeInOut" }}
            whileHover={prefersReducedMotion ? undefined : { rotate: 0, scale: 1.02, y: -4 }}
          >
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_25px_60px_rgba(0,200,255,0.15)] backdrop-blur-md transition-transform duration-500 md:rotate-[-2deg] dark:border-white/10 dark:bg-white/5">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={heroImageSrc}
                  alt={t("hero.visualAlt")}
                  className="h-[300px] w-full object-cover sm:h-[400px] lg:h-[460px]"
                  loading="lazy"
                  decoding="async"
                  onError={() => {
                    if (heroImageSrc !== HERO_IMAGE_FALLBACK) setHeroImageSrc(HERO_IMAGE_FALLBACK);
                  }}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
                <span className="absolute bottom-4 left-4 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 backdrop-blur">
                  {t("hero.location")}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-5 left-1/2 z-10 inline-flex -translate-x-1/2 flex-col items-center text-xs font-semibold tracking-[0.12em] text-slate-500 dark:text-slate-400"
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        {t("hero.scroll")}
        <span aria-hidden="true" className="text-lg text-cyan-600 dark:text-cyan-300">
          v
        </span>
      </motion.a>
    </section>
  );
}

export default Hero;
