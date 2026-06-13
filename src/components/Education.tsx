"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Code2, Layers, Cpu, Rocket } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
}

const timelineData: TimelineItem[] = [
  {
    year: "Running",
    title: "Diploma in Engineering",
    subtitle: "Sylhet Polytechnic Institute",
    desc: "Pursuing a Diploma in Power Engineering while building expertise in modern web development.",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    year: "2026",
    title: "MERN Stack Development Journey",
    subtitle: "Self-driven & Specialized Training",
    desc: "Dedicated thousands of hours mastering semantic HTML5, CSS layout mechanics (Grid/Flexbox), modern JS (ES6+), and responsive web standards.",
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    year: "2026",
    title: "React Learning & Mastery",
    subtitle: "Advanced SPA Engineering",
    desc: "Delved into React states, component lifecycles, hooks, context API, high-performance re-render mitigation, and state managers.",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    year: "2026",
    title: "Next.js Projects & SSR",
    subtitle: "Hands-on Projects",
    desc: "Building real-world projects using React and Next.js, learning routing, API integration, and UI development..",
    icon: <Layers className="w-5 h-5" />,
  },
  {
    year: "2026 (Ongoing)",
    title: "MERN Stack Learning",
    subtitle: "Backend Expansion",
    desc: "Currently expanding skills toward MERN Stack development including MongoDB, Express, and Node.js.",
    icon: <Rocket className="w-5 h-5" />,
  },
];

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-8 sm:pl-12 pb-12 group last:pb-0"
    >
      {/* Outer Vertical Connector Line Segment */}
      <div className="absolute left-[19px] sm:left-[27px] top-0 bottom-0 w-[2px] bg-slate-800 dark:bg-slate-800 light:bg-slate-200 group-last:hidden" />

      {/* Floating Animated Timeline Dot Indicator */}
      <motion.div
        whileInView={{ scale: [0, 1.2, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, delay: index * 0.15 }}
        className="absolute left-1.5 sm:left-[11px] top-0.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-cyan-400 bg-slate-950 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-colors duration-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
      >
        {item.icon}
      </motion.div>

      {/* Content Box */}
      <div className="glass-panel p-6 rounded-2xl relative glow-border shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
        <span className="font-outfit text-xs font-bold text-violet-400 light:text-violet-600 tracking-wider uppercase bg-violet-400/10 light:bg-violet-100 py-1 px-3 rounded-full mb-3 inline-block">
          {item.year}
        </span>
        <h3 className="font-outfit font-extrabold text-lg sm:text-xl text-white dark:text-white light:text-slate-900 mb-1">
          {item.title}
        </h3>
        <h4 className="font-sans text-xs sm:text-sm text-slate-400 light:text-slate-500 font-semibold mb-3">
          {item.subtitle}
        </h4>
        <p className="font-sans text-xs sm:text-sm text-slate-400 light:text-slate-600 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="relative py-16 md:py-24 z-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-cyan-400 font-outfit text-sm font-semibold uppercase tracking-wider mb-2">
            Timeline
          </span>
          <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Education & Journey
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full mt-4" />
        </div>

        {/* Timeline Wrapper */}
        <div className="relative pt-4">
          {timelineData.map((item, index) => (
            <TimelineCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
