import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import logo from "../assets/el-boti-clim-logo.svg";

const tagline = "Premium HVAC execution in Tangier.";

function LoadingScreen({ isVisible }) {
  const prefersReducedMotion = useReducedMotion();
  const [typedCount, setTypedCount] = React.useState(0);

  React.useEffect(() => {
    if (!isVisible || prefersReducedMotion) return undefined;
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedCount(Math.min(index, tagline.length));
      if (index >= tagline.length) window.clearInterval(timer);
    }, 34);
    return () => window.clearInterval(timer);
  }, [isVisible, prefersReducedMotion]);

  React.useEffect(() => {
    if (isVisible) return;
    setTypedCount(0);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f1e]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex w-full max-w-xl flex-col items-center gap-5 px-6 text-center">
            <motion.img
              src={logo}
              alt="EL BOTI CLIM logo"
              className="w-[120px] animate-pulse"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">EL BOTI CLIM SARL AU</p>
            <p className="min-h-6 text-sm text-slate-300">{prefersReducedMotion ? tagline : tagline.slice(0, typedCount)}</p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default LoadingScreen;
