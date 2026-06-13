"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";

interface Project {
  name: string;
  description: string;
  image: string;
  tags: string[];
  liveLink: string;
  githubLink: string;
  gridClass: string;
}

const projects: Project[] = [
  {
    name: "Zenith SaaS Analytics Platform",
    description: "A high-performance cloud monitoring dashboard with real-time charting, automated threshold alerts, and glassmorphic telemetry displays.",
    image: "/project_zenith.png",
    tags: ["Next.js 15", "React 19", "Tailwind CSS", "Recharts", "TypeScript"],
    liveLink: "https://github.com/shahin4317/zenith-analytics",
    githubLink: "https://github.com/shahin4317/zenith-analytics",
    gridClass: "lg:col-span-8",
  },
  {
    name: "Aether NFT Marketplace",
    description: "Futuristic digital collectibles auction catalog. Displays detailed card components with dynamic Web3 metadata lists and high-speed image loads.",
    image: "/project_aether.png",
    tags: ["React", "Framer Motion", "Tailwind CSS", "Ethers.js"],
    liveLink: "https://github.com/shahin4317/aether-nft",
    githubLink: "https://github.com/shahin4317/aether-nft",
    gridClass: "lg:col-span-4",
  },
  {
    name: "Nova E-Commerce Storefront",
    description: "Sleek shopping layout featuring 3D product view transitions, dynamic cart sliders, fast loading times, and a full-stack checkout flow.",
    image: "/project_nova.png",
    tags: ["Next.js 15", "DaisyUI", "Stripe API", "React 19"],
    liveLink: "https://github.com/shahin4317/nova-shop",
    githubLink: "https://github.com/shahin4317/nova-shop",
    gridClass: "lg:col-span-4",
  },
  {
    name: "Vesper Encrypted Chat App",
    description: "Minimalist direct-messaging and team collaboration space using secure socket events, floating sidebar navigators, and active status animations.",
    image: "/project_zenith.png",
    tags: ["React", "Node.js", "Socket.io", "Tailwind CSS"],
    liveLink: "https://github.com/shahin4317/vesper-chat",
    githubLink: "https://github.com/shahin4317/vesper-chat",
    gridClass: "lg:col-span-8",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth 3D tilt rotation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt coordinates
  const rotateX = useSpring(mouseY, { stiffness: 100, damping: 15 });
  const rotateY = useSpring(mouseX, { stiffness: 100, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Mouse coords relative to card center, scaled for tilt degrees
    const x = (e.clientX - rect.left - rect.width / 2) / 25; // max ~6-8 deg
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    
    mouseX.set(x);
    mouseY.set(-y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group rounded-2xl border border-white/[0.08] dark:border-white/[0.08] light:border-slate-200 glass-panel overflow-hidden flex flex-col justify-between shadow-2xl h-[420px] transition-shadow duration-500 hover:shadow-cyan-500/10 ${project.gridClass}`}
    >
      {/* Dynamic Glow Background behind card */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Card Image section */}
      <div className="relative w-full h-[52%] overflow-hidden border-b border-white/[0.05] dark:border-white/[0.05] light:border-slate-100">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-slate-950/20 light:bg-transparent" />
      </div>

      {/* Card Text & Information */}
      <div className="p-6 flex-grow flex flex-col justify-between z-10" style={{ transform: "translateZ(30px)" }}>
        <div>
          <h3 className="font-outfit font-bold text-lg sm:text-xl text-white dark:text-white light:text-slate-900 tracking-wide mb-2 line-clamp-1">
            {project.name}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-slate-400 light:text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4 overflow-hidden h-7">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-semibold font-outfit px-2 py-0.5 rounded bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border border-white/[0.05] dark:border-white/[0.05] light:border-slate-200 text-slate-300 light:text-slate-600 uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-4">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider cursor-pointer"
            >
              Demo <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white dark:hover:text-white light:text-slate-500 light:hover:text-slate-800 transition-colors uppercase tracking-wider cursor-pointer"
            >
              Code <FaGithub className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-16 md:py-24 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-cyan-400 font-outfit text-sm font-semibold uppercase tracking-wider mb-2">
            Showcase
          </span>
          <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full mt-4" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
