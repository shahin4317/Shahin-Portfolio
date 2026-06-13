"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GradientOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orb 1: Cyan/Blue - Top Left */}
      <motion.div
        className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[120px] md:blur-[160px] opacity-20 dark:opacity-25"
        style={{
          background: "radial-gradient(circle, #38bdf8 0%, #0369a1 50%, transparent 100%)",
          left: "-10%",
          top: "5%",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -70, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 2: Purple/Violet - Bottom Right */}
      <motion.div
        className="absolute w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full blur-[100px] md:blur-[150px] opacity-15 dark:opacity-20"
        style={{
          background: "radial-gradient(circle, #8b5cf6 0%, #4d1d95 50%, transparent 100%)",
          right: "-5%",
          bottom: "10%",
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 80, -50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 3: Turquoise/Emerald - Middle Left */}
      <motion.div
        className="absolute w-[200px] md:w-[450px] h-[200px] md:h-[450px] rounded-full blur-[90px] md:blur-[140px] opacity-10 dark:opacity-15"
        style={{
          background: "radial-gradient(circle, #22d3ee 0%, #0891b2 50%, transparent 100%)",
          left: "25%",
          top: "45%",
        }}
        animate={{
          x: [0, 40, -40, 0],
          y: [0, 50, 60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
