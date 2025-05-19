"use client";

import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  color?: string;
}

export default function FeatureCard({
  number,
  title,
  description,
  icon,
  isActive = false,
  onClick,
  color = "from-blue-600/90 to-indigo-700/90",
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isHighlighted = isActive || isHovered;

  // Handle mouse movements for subtle card interaction
  useEffect(() => {
    if (!cardRef.current || !window.matchMedia("(min-width: 768px)").matches)
      return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const posX = e.clientX - centerX;
      const posY = e.clientY - centerY;

      // Subtle tilt effect (much more restrained than before)
      const rotateY = posX * 0.01; // Reduced multiplier for subtlety
      const rotateX = -posY * 0.01; // Reduced multiplier for subtlety

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    };

    const handleMouseLeave = () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    };

    if (isHighlighted) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    } else {
      handleMouseLeave();
    }

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHighlighted]);

  return (
    <motion.div
      className="feature-card relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Custom ease curve for smooth animation
      }}
    >
      <div
        ref={cardRef}
        className={cn(
          "relative w-full sm:w-[350px] sm:min-w-[350px] md:w-[400px] md:min-w-[400px] h-auto min-h-[280px] border",
          "rounded-2xl overflow-hidden transition-all duration-500 ease-out",
          "flex flex-col",
          isHighlighted
            ? "border-transparent shadow-xl"
            : "border-gray-200/70 dark:border-gray-800/70 shadow-md",
          isHighlighted ? "dark:bg-gray-900" : "bg-white dark:bg-gray-950"
        )}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          willChange: "transform",
          transformStyle: "preserve-3d",
          transition:
            "transform 0.3s ease-out, border-color 0.3s ease, box-shadow 0.5s ease",
        }}
      >
        {/* Background gradient with animation */}
        <div
          className={cn(
            "absolute inset-0 z-0 transition-opacity duration-500",
            isHighlighted ? "opacity-100" : "opacity-0"
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-90",
              color
            )}
          />

          {/* Animated background pattern - refined with better gradient positions */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 15% 25%, rgba(255,255,255,0.25) 0%, transparent 15%), 
                              radial-gradient(circle at 85% 65%, rgba(255,255,255,0.2) 0%, transparent 15%),
                              radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
              backgroundSize: "60% 60%, 50% 50%, 100% 100%",
              backgroundPosition: "0% 0%, 100% 100%, 50% 50%",
            }}
          />

          {/* Subtle noise texture overlay - increased contrast slightly */}
          <div className="absolute inset-0 bg-[url('/grain.svg')] bg-repeat opacity-25 mix-blend-overlay" />

          {/* Light halo effect */}
          <div
            className={cn(
              "absolute inset-0 opacity-70 transition-opacity duration-700",
              isHighlighted ? "opacity-100" : "opacity-0"
            )}
            style={{
              background: isHighlighted
                ? "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2), transparent 70%)"
                : "none",
            }}
          />
        </div>

        {/* Card content */}
        <div ref={contentRef} className="relative z-10 flex flex-col h-full p-6">
          {/* Top section with icon and number in balanced layout */}
          <div className="flex items-center mb-4">
            {/* Enhanced icon container - moved to the left for better visual flow */}
            <div
              className={cn(
                "p-3 rounded-xl backdrop-blur-sm transition-all duration-500 mr-4",
                isHighlighted
                  ? "bg-white/20 text-white ring-1 ring-white/30 shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300"
              )}
            >
              {icon}
            </div>
            
            {/* Number with enhanced styling - smaller and aligned with icon */}
            <span
              className={cn(
                "text-5xl font-bold tracking-tight transition-all duration-500",
                isHighlighted
                  ? "text-white opacity-90"
                  : "text-gray-900/20 dark:text-white/15"
              )}
              style={{
                textShadow: isHighlighted
                  ? "0 2px 10px rgba(0,0,0,0.2)"
                  : "none",
              }}
            >
              {number}
            </span>
          </div>
          
          {/* Content section with title and description */}
          <div className="flex flex-col mt-2 flex-grow">
            <h3
              className={cn(
                "text-xl font-semibold mb-3 transition-colors duration-300",
                isHighlighted ? "text-white" : "text-gray-900 dark:text-white"
              )}
            >
              {title}
            </h3>

            <p
              className={cn(
                "text-base transition-colors duration-300 mb-auto",
                isHighlighted
                  ? "text-white/90"
                  : "text-gray-600 dark:text-gray-400"
              )}
            >
              {description}
            </p>

            {/* Animated call-to-action - moved to bottom and styled better */}
            <AnimatePresence>
              {isHighlighted && (
                <motion.div
                  className="flex items-center mt-6 text-sm font-medium text-white group"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white/70 group-hover:after:w-full after:transition-all after:duration-300">Ver más</span>
                  <svg
                    className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 3.5L11 8L6.5 12.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
