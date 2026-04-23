import React from "react";
import { motion } from "framer-motion";

export const StaggerContainer = ({ children, staggerDelay = 0.1 }) => (
  <motion.div
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: staggerDelay } },
    }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
  >
    {children}
  </motion.div>
);
