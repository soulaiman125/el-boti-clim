import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.22,
  });

  return (
    <div className="scroll-progress" aria-hidden="true">
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />
    </div>
  );
}

export default ScrollProgress;
