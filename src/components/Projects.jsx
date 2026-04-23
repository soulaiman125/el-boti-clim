import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { fadeUp, sectionReveal, viewport } from "./motion.js";
import commercialHvacImage from "../assets/projects/hvac-outdoor.jpg";
import livingRoomSplitImage from "../assets/projects/living-room-ac.jpg";
import homeWallMountedAcImage from "../assets/projects/wall-ac.jpg";
import officeCeilingHvacImage from "../assets/projects/office-hvac.jpg";

function Projects() {
  const { t } = useTranslation();
  const sectionRef = React.useRef(null);
  const projectImages = [
    commercialHvacImage,
    livingRoomSplitImage,
    homeWallMountedAcImage,
    officeCeilingHvacImage,
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
  const gridScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  return (
    <motion.section
      ref={sectionRef}
      id="projects"
      className="section"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <motion.div className="container section-depth-shell" style={{ y: shellY, scale: gridScale }}>
        <motion.div
          className="section-heading section-heading-centered"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <p className="eyebrow">{t("projects.eyebrow")}</p>
          <h2>{t("projects.title")}</h2>
          <p>{t("projects.description")}</p>
        </motion.div>

        <div className="project-grid">
          {projects.map((project) => (
            <motion.article
              key={project.title}
              className="project-card glass-panel premium-card transition duration-300 hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
            >
              <div className="project-media">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="object-cover rounded-xl shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="project-badge">{project.location}</span>
              </div>
              <div className="project-copy">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="projects-cta-wrap"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >
          <motion.a
            className="button button-primary projects-cta"
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {t("projects.viewAll")}
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Projects;
