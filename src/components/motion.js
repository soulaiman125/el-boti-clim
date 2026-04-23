export const viewport = {
  once: true,
  amount: 0.18,
};

export const premiumEase = [0.21, 0.47, 0.32, 0.98];

export const springHover = {
  y: -6,
  transition: { type: "spring", stiffness: 400, damping: 17 },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const sectionReveal = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

export const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: premiumEase,
    },
  },
};

export const heroReveal = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const headlineReveal = {
  hidden: { opacity: 0, y: "1.1em" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: "0em",
    transition: {
      delay,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const slideCard = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
