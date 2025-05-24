"use client";

import { useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppData } from "@/contexts/app-data-context";
import { useAutoplay } from "@/hooks/use-autoplay";

export default function ScreenshotsCarousel() {
  const {
    screenshots,
    currentScreenshot,
    setCurrentScreenshot,
    prevIndex,
    nextIndex,
    isAutoplay,
    toggleAutoplay,
  } = useAppData();

  const { resetAutoplayTimer } = useAutoplay();

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - dragStartX;
    setDragOffset(offset);
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        setCurrentScreenshot(prevIndex);
      } else {
        setCurrentScreenshot(nextIndex);
      }
      resetAutoplayTimer();
    }
    setDragOffset(0);
  };

  const goToScreenshot = useCallback(
    (index: number) => {
      setCurrentScreenshot(index);
      resetAutoplayTimer();
    },
    [setCurrentScreenshot, resetAutoplayTimer]
  );

  const current = screenshots[currentScreenshot];

  return (
    <div className="screenshots-carousel relative container px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-12 lg:gap-20">
          {/* Visualización principal */}
          <div
            className="relative iphone-showcase w-full md:w-auto md:flex-shrink-0 mb-6 md:mb-0 flex justify-center"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <motion.div
              className="absolute inset-0 -z-10 transform-gpu rounded-3xl opacity-40"
              animate={{
                background: `radial-gradient(circle at center, ${current.accent}33, transparent 70%)`,
              }}
              transition={{ duration: 1.2 }}
            />
            <div className="relative w-[260px] sm:w-[280px] md:w-[300px] z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreenshot}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: isDragging ? dragOffset * 0.1 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  className="w-full relative"
                >
                  <div className="relative w-full h-[580px] rounded-[38px] overflow-hidden border-[12px] border-black/90 dark:border-[#222] bg-black shadow-xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[26px] bg-black z-10 rounded-b-3xl flex justify-center items-end pb-1">
                      <div className="w-[25%] h-[4px] rounded-full bg-zinc-700 dark:bg-zinc-600"></div>
                    </div>
                    <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-black">
                      <Image
                        src={current.image}
                        alt={current.title}
                        width={300}
                        height={650}
                        className="w-full h-full object-cover"
                        priority={true}
                        quality={95}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transform -translate-x-full"></div>
                      <div className="absolute top-0 left-0 right-0 h-[60px] bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[70%] h-[20px] bg-black/20 dark:bg-black/40 rounded-full blur-xl"></div>
            </div>

            {/* Botones navegación */}
            <div className="absolute left-0 md:-left-10 top-1/2 -translate-y-1/2 z-20">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentScreenshot(prevIndex);
                  resetAutoplayTimer();
                }}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-background/80 backdrop-blur-md border border-border shadow-xl"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground hover:text-primary transition-colors" />
              </motion.button>
            </div>
            <div className="absolute right-0 md:-right-10 top-1/2 -translate-y-1/2 z-20">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentScreenshot(nextIndex);
                  resetAutoplayTimer();
                }}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-background/80 backdrop-blur-md border border-border shadow-xl"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground hover:text-primary transition-colors" />
              </motion.button>
            </div>

            <div className="absolute -bottom-8 md:hidden left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground flex items-center gap-1 opacity-50">
              <MoveHorizontal className="w-3 h-3" />
              <span>Desliza para navegar</span>
            </div>
          </div>

          {/* Información de la captura */}
          <div className="w-full md:max-w-xs lg:max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreenshot}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-center md:text-left px-4 sm:px-8 md:px-0 py-4 md:py-0"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="inline-block text-sm font-medium mb-1 md:mb-2 tracking-wider"
                  style={{ color: current.accent }}
                >
                  {`${currentScreenshot + 1}/${screenshots.length}`}
                </motion.span>
                <h3
                  className="text-xl sm:text-2xl md:text-3xl font-medium mb-3 md:mb-4"
                  style={{
                    color: current.accent,
                    textShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  }}
                >
                  {current.title}
                </h3>
                <p className="text-muted-foreground mb-6 md:mb-8 text-base md:text-lg">
                  {current.description}
                </p>
                <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-4 md:gap-6 mt-2 md:mt-0">
                  <div className="flex gap-2 items-center">
                    {screenshots.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToScreenshot(idx)}
                        className={cn(
                          "rounded-full transition-all duration-300 ease-out",
                          currentScreenshot === idx
                            ? "w-6 h-2 sm:w-8 md:w-10"
                            : "w-2 h-2 hover:bg-muted-foreground/60"
                        )}
                        aria-label={`Go to screenshot ${idx + 1}`}
                        style={{
                          backgroundColor:
                            currentScreenshot === idx
                              ? screenshots[idx].accent
                              : "rgba(var(--muted-foreground), 0.3)",
                        }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={toggleAutoplay}
                    className={cn(
                      "flex items-center gap-2 text-xs sm:text-sm backdrop-blur-md rounded-full px-4 py-1.5 transition-all",
                      isAutoplay
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-white/5 text-muted-foreground border border-white/10 hover:border-primary/20 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isAutoplay ? "bg-primary" : "bg-muted-foreground"
                      }`}
                    ></span>
                    {isAutoplay ? "Autoplay On" : "Autoplay Off"}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
