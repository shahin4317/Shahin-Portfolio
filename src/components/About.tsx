"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FloatingElement from "./ui/FloatingElement";
import { Code, Heart, Award } from "lucide-react";

export default function About() {
  const metrics = [
    { icon: <Code className="w-5 h-5 text-cyan-400" />, title: "1+ Years", desc: "Dedicated Coding" },
    { icon: <Award className="w-5 h-5 text-violet-500" />, title: "20+ Projects", desc: "Completed & Active" },
    { icon: <Heart className="w-5 h-5 text-emerald-400" />, title: "100%", desc: "Passion & Focus" },
  ];

  return (
    <section id="about" className="relative py-16 md:py-24 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-cyan-400 font-outfit text-sm font-semibold uppercase tracking-wider mb-2">
            Who I Am
          </span>
          <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            About Me
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full mt-4" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image wrapper */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <FloatingElement floatDuration={7} floatYRange={10} className="w-full max-w-[360px] relative">
              {/* Outer decorative gradient border */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-violet-500 rounded-2xl blur-xl opacity-20 dark:opacity-30 -z-10 scale-95" />
              
              {/* Main Photo Card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] dark:border-white/[0.08] light:border-slate-200 glass-panel p-3">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                  <Image
                    src="/shapic.png"
                    alt="Md Shahin Profile Image"
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    priority
                    className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  />
                </div>
                
                {/* Floating Corner Badges */}
                <div className="absolute top-6 left-6 py-1 px-3 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-md text-xs font-semibold text-white tracking-wide">
                  🚀 Coding Daily
                </div>
              </div>
            </FloatingElement>
          </div>

          {/* Right Column: Journey Details */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-2xl p-6 sm:p-8 relative glow-border shadow-xl"
            >
              <h3 className="font-outfit text-2xl font-bold text-white dark:text-white light:text-slate-900 mb-4">
                My Journey
              </h3>

              <div className="space-y-4 font-sans text-slate-300 light:text-slate-600 leading-relaxed text-sm sm:text-base">
                <p>
                  I started my development journey with a deep curiosity for how digital spaces are shaped. Over time, that curiosity evolved into a dedicated passion for writing clean, performant, and premium frontend code.
                </p>
                <p>
                  Specializing in the modern React and Next.js ecosystem, I focus on constructing interfaces that feel responsive, fast, and visually spectacular. I combine a technical background with creative execution to build web applications that look like premium designs and run at maximum lighthouse speeds.
                </p>
                <p>
                  For me, programming is more than writing code—it's about designing seamless, immersive user journeys that make complex concepts easy to understand and pleasant to interact with.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/[0.06] dark:border-white/[0.06] light:border-slate-100">
                {metrics.map((m, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-900/30 dark:bg-slate-900/30 light:bg-slate-50 border border-white/[0.03] dark:border-white/[0.03] light:border-slate-200/50">
                    <div className="mb-2 p-1.5 rounded-lg bg-slate-950/40 light:bg-white border border-white/[0.05] light:border-slate-200">
                      {m.icon}
                    </div>
                    <span className="font-outfit font-bold text-sm sm:text-base text-white dark:text-white light:text-slate-900">
                      {m.title}
                    </span>
                    <span className="font-sans text-[10px] sm:text-xs text-slate-500 light:text-slate-500">
                      {m.desc}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
