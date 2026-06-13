import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Visual backgrounds and mouse trackers
import ParticlesBg from "@/components/ui/ParticlesBg";
import CursorGlow from "@/components/ui/CursorGlow";
import GradientOrbs from "@/components/ui/GradientOrbs";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full select-none overflow-x-hidden">
      {/* Anti-Gravity Environment Visual Layer (Backdrops) */}
      <ParticlesBg />
      <GradientOrbs />
      <CursorGlow />

      {/* Foreground Interactive UI */}
      <Navbar />
      
      {/* Main content grid flow */}
       <div className="relative z-20 flex flex-col">
    <section id="home">
      <Hero />
    </section>

    <section id="about">
      <About />
    </section>

    <section id="skills">
      <Skills />
    </section>

    <section id="projects">
      <Projects />
    </section>

    <section id="education">
      <Education />
    </section>

    <section id="contact">
      <Contact />
    </section>
  </div>

      <Footer />
    </main>
  );
}
