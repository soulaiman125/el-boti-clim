import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/el-boti-clim-logo.svg";

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "var(--bg)" }}
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex w-full max-w-xl flex-col items-center gap-5 px-6 text-center">
        <motion.img
          src={logo}
          alt="EL BOTI CLIM logo"
          className="w-[120px]"
          animate={{ scale: [0.85, 1] }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>
          EL BOTI CLIM SARL AU
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 overflow-hidden" style={{ background: "var(--surface)" }}>
        <motion.div
          className="h-full"
          style={{ background: "var(--primary)" }}
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

export default LoadingScreen;
