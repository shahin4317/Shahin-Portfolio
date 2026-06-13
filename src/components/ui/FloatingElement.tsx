"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface FloatingElementProps {
  children: React.ReactNode;
  tiltEnabled?: boolean;
  floatDuration?: number;
  floatYRange?: number;
  className?: string;
}

export default function FloatingElement({
  children,
  tiltEnabled = true,
  floatDuration = 6,
  floatYRange = 12,
  className = "",
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values to avoid triggering component state updates on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotational transitions
  const rotateXSpring = useSpring(mouseY, { stiffness: 120, damping: 18 });
  const rotateYSpring = useSpring(mouseX, { stiffness: 120, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEnabled || !ref.current) return;

    const el = ref.current;
    const rect = el.getBoundingClientRect();

    // Mouse positions relative to element center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Convert coordinates to tilt angles (max ~8 degrees)
    const tiltX = -(y / (rect.height / 2)) * 8;
    const tiltY = (x / (rect.width / 2)) * 8;

    mouseX.set(tiltY);
    mouseY.set(tiltX);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        y: [0, -floatYRange, 0],
      }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      }}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}
