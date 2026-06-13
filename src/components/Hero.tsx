"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

// Tech logo custom SVG components for ultimate visual control and zero external dependency failure
const HTMLIcon = () => (
  <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.119l-.326 3.486-2.902.785-2.898-.781-.188-2.16H6.223l.366 4.384 5.412 1.507 5.406-1.503 1.028-11.388H8.531z" />
  </svg>
);

const CSSIcon = () => (
  <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.119l-.326 3.486-2.902.785-2.898-.781-.188-2.16H6.223l.366 4.384 5.412 1.507 5.406-1.503 1.028-11.388H8.531z" />
  </svg>
);

const JSIcon = () => (
  <svg className="w-8 h-8 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 0h24v24H0V0zm22.034 18.376c-.666-1.134-2.002-1.905-3.522-1.905-1.647 0-2.54.945-2.54 2.21 0 2.936 5.064 2.805 5.064 5.922 0 1.748-1.378 3.125-3.604 3.125-2.455 0-3.84-1.378-4.544-2.73l2.253-1.399c.532.946 1.392 1.512 2.309 1.512.988 0 1.439-.493 1.439-1.111 0-2.617-5.065-2.417-5.065-5.89 0-1.98 1.59-3.23 3.696-3.23 2.054 0 3.322 1.088 3.996 2.378l-2.031 1.228zM12.99 18.067c-.667-1.133-2.003-1.904-3.522-1.904-1.647 0-2.54.945-2.54 2.21 0 2.936 5.064 2.805 5.064 5.922 0 1.748-1.378 3.125-3.604 3.125-2.456 0-3.84-1.378-4.544-2.73l2.253-1.399c.532.946 1.392 1.512 2.309 1.512.988 0 1.439-.493 1.439-1.111 0-2.617-5.065-2.417-5.065-5.89 0-1.98 1.59-3.23 3.696-3.23 2.054 0 3.322 1.088 3.996 2.378l-2.031 1.228z" />
  </svg>
);

const ReactIcon = () => (
  <svg className="w-8 h-8 text-cyan-400 animate-[spin_12s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const NextIcon = () => (
  <svg className="w-8 h-8 text-white dark:text-white light:text-slate-900" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.1 17.4l-5.4-8.1v6.3H9.9v-9.6h1.8l5.1 7.8V6h1.8v11.4h-1.5z" />
  </svg>
);

const TailwindIcon = () => (
  <svg className="w-8 h-8 text-cyan-300" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse coords mapped to slow parallax drift
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 200 };
  const floatX = useSpring(mouseX, springConfig);
  const floatY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const logos = [
    { component: <HTMLIcon />, label: "HTML", x: "12%", y: "15%", duration: 7, delay: 0 },
    { component: <CSSIcon />, label: "CSS", x: "75%", y: "12%", duration: 8, delay: 0.5 },
    { component: <JSIcon />, label: "JavaScript", x: "18%", y: "68%", duration: 6, delay: 1.2 },
    { component: <ReactIcon />, label: "React", x: "72%", y: "62%", duration: 7.5, delay: 0.8 },
    { component: <NextIcon />, label: "Next.js", x: "46%", y: "38%", duration: 9, delay: 1.8 },
    { component: <TailwindIcon />, label: "Tailwind", x: "55%", y: "78%", duration: 8.5, delay: 0.2 },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden z-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        
        {/* Left Side: Developer Info */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-30">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 light:bg-cyan-100/60 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Available for Freelance & Full-time
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-outfit text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-white dark:text-white light:text-slate-900"
          >
            Hi, I'm{" "}
            <span className="text-gradient">
              Shahin
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="font-outfit text-2xl sm:text-3xl font-bold text-slate-300 light:text-slate-700 mb-6"
          >
            MERN Stack Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="font-sans text-base sm:text-lg text-slate-400 light:text-slate-600 max-w-xl mb-4 leading-relaxed"
          >
            "Crafting modern web experiences with React, Next.js, MongoDB,Express.js and creative UI engineering."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="font-sans text-sm sm:text-base text-slate-500 light:text-slate-500 max-w-lg mb-8"
          >
            Passionate developer focused on creating fast, beautiful, and user-friendly digital experiences. Let's build something exceptional together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-violet-500/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/[0.08] dark:border-white/[0.08] light:border-slate-200 bg-slate-900/40 hover:bg-slate-800/60 light:bg-white light:hover:bg-slate-50 text-slate-300 light:text-slate-700 font-semibold hover:text-white light:hover:text-slate-900 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right Side: Interactive Anti-gravity sphere & drifting icons */}
        <div className="lg:col-span-5 h-[350px] sm:h-[450px] lg:h-[600px] w-full relative flex items-center justify-center z-20">
          {/* Parallax Wrapper */}
          <motion.div
            style={{ x: floatX, y: floatY }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Center Glowing Hub */}
            <div className="absolute w-[180px] sm:w-[260px] h-[180px] sm:h-[260px] rounded-full border border-cyan-500/10 dark:border-cyan-500/10 light:border-slate-200 flex items-center justify-center orbit-path animate-[spin_50s_linear_infinite]">
              <div className="w-[120px] sm:w-[180px] h-[120px] sm:h-[180px] rounded-full border border-violet-500/5 dark:border-violet-500/5 light:border-slate-100 orbit-path animate-[spin_30s_linear_infinite_reverse]" />
            </div>
            
            <div className="absolute w-24 h-24 rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 light:bg-cyan-100/50 blur-xl animate-pulse" />

            {/* Floating Tech Badges */}
            {logos.map((logo, index) => (
              <motion.div
                key={index}
                className="absolute p-4 sm:p-5 rounded-2xl glass-panel shadow-2xl flex flex-col items-center justify-center gap-1.5 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform duration-300"
                style={{
                  left: logo.x,
                  top: logo.y,
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.4)",
                }}
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: logo.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: logo.delay,
                }}
              >
                <div className="drop-shadow-[0_0_12px_rgba(56,189,248,0.25)]">
                  {logo.component}
                </div>
                <span className="font-outfit text-[10px] sm:text-xs font-semibold text-slate-400 light:text-slate-600 tracking-wider uppercase">
                  {logo.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
