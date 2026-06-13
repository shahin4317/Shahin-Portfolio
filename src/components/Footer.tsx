"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub className="w-5 h-5" />, href: "https://github.com/shahin4317", label: "GitHub" },
    { icon: <FaLinkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/md-shahin-alam-1b24aa321/", label: "LinkedIn" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:shahinalam4317@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative border-t border-white/[0.06] dark:border-white/[0.06] light:border-slate-200 bg-[#050816]/90 backdrop-blur-md py-12 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Branding & Logo */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <a href="#home" className="group flex items-center gap-2 mb-2">
            <span className="font-outfit text-lg font-bold tracking-wider text-gradient">
              SHA.DEV
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:animate-ping" />
          </a>
          <p className="font-sans text-xs text-slate-500 light:text-slate-400">
            Crafting premium interactive digital experiences.
          </p>
        </div>

        {/* Copyright */}
        <div className="font-sans text-xs text-slate-500 light:text-slate-400 text-center md:order-none order-last">
          &copy; {currentYear} Md Shahin. All rights reserved.
        </div>

        {/* Social Links with float animations */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={link.label}
              className="p-3 rounded-full border border-white/[0.06] dark:border-white/[0.06] light:border-slate-200 bg-slate-950/40 hover:bg-cyan-400 hover:text-slate-950 light:bg-slate-50 light:hover:bg-slate-900 light:hover:text-white text-slate-400 light:text-slate-600 transition-all duration-300 shadow-lg cursor-pointer"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.4,
              }}
              whileHover={{
                scale: 1.1,
                y: -6,
                transition: { duration: 0.15 },
              }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

      </div>
    </footer>
  );
}
