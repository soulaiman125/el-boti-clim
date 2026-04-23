import React from "react";
import { motion } from "framer-motion";

export const ScaleOnHover = ({ children }) => (
  <motion.div
    whileHover={{
      y: -6,
      transition: { type: "spring", stiffness: 400, damping: 17 },
    }}
    style={{ willChange: "transform" }}
  >
    {children}
  </motion.div>
);
