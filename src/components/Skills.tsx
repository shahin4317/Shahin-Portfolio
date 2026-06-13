"use client";

import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML5", category: "Frontend", color: "text-orange-500 border-orange-500/20 bg-orange-500/5 hover:shadow-orange-500/10", delay: 0, duration: 6 },
  { name: "CSS3", category: "Frontend", color: "text-blue-400 border-blue-400/20 bg-blue-400/5 hover:shadow-blue-400/10", delay: 0.4, duration: 7 },
  { name: "JavaScript", category: "Languages", color: "text-yellow-400 border-yellow-400/20 bg-yellow-400/5 hover:shadow-yellow-400/10", delay: 0.2, duration: 6.5 },
  { name: "React", category: "Library", color: "text-cyan-400 border-cyan-400/20 bg-cyan-400/5 hover:shadow-cyan-400/10", delay: 0.6, duration: 8 },
  { name: "Next.js", category: "Framework", color: "text-white border-white/20 bg-white/5 hover:shadow-white/10 dark:text-white light:text-slate-900 light:border-slate-300 light:bg-slate-100", delay: 0.8, duration: 7.5 },
  { name: "Tailwind CSS", category: "CSS", color: "text-sky-300 border-sky-300/20 bg-sky-300/5 hover:shadow-sky-300/10", delay: 0.3, duration: 6.2 },
  { name: "DaisyUI", category: "UI Kit", color: "text-pink-400 border-pink-400/20 bg-pink-400/5 hover:shadow-pink-400/10", delay: 0.7, duration: 6.8 },
  { name: "Git", category: "Tooling", color: "text-red-500 border-red-500/20 bg-red-500/5 hover:shadow-red-500/10", delay: 1.1, duration: 5.8 },
  { name: "GitHub", category: "Tooling", color: "text-slate-300 border-slate-300/20 bg-slate-300/5 hover:shadow-slate-300/10 light:text-slate-800 light:border-slate-300 light:bg-slate-100", delay: 0.9, duration: 7.2 },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-16 md:py-24 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-cyan-400 font-outfit text-sm font-semibold uppercase tracking-wider mb-2">
            My Toolbox
          </span>
          <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Skills & Technologies
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full mt-4" />
        </div>

        {/* Asymmetrical Floating Capsule Grid */}
        <div className="flex flex-wrap justify-center items-center gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className={`px-6 py-4 rounded-full border glass-panel shadow-lg flex items-center gap-3 cursor-default select-none transition-shadow duration-300 ${skill.color}`}
              style={{
                boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.2)",
              }}
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: skill.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: skill.delay,
              }}
              whileHover={{
                scale: 1.1,
                y: -18,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              {/* Pulse Indicator */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              
              <div className="flex flex-col items-start leading-none">
                <span className="font-outfit font-bold text-sm sm:text-base tracking-wide text-white dark:text-white light:text-slate-900">
                  {skill.name}
                </span>
                <span className="font-sans text-[9px] text-slate-500 light:text-slate-500 uppercase tracking-widest mt-1">
                  {skill.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Floating Decorative Label */}
        <div className="mt-16 text-center text-xs sm:text-sm text-slate-500 light:text-slate-500 font-sans tracking-wide">
          💡 Pro-tip: Hover over capsules to pause gravity and inspect detail
        </div>
      </div>
    </section>
  );
}
