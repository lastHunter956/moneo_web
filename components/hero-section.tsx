"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useTransform, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown, ArrowRight } from "lucide-react";
import { useAnimation as useAnimationContext } from "@/contexts/animation-context";
import { useAnalytics } from "@/hooks/use-analytics";
import gsap from "gsap";

interface HeroSectionProps {
  scrollProgress: any;
  scrollToDownload: () => void;
  scrollToFeatures: () => void;
}

export default function HeroSection({
  scrollProgress,
  scrollToDownload,
  scrollToFeatures,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation(); // Framer Motion
  const scrollIndicatorRef = useRef<HTMLDivElement>(null); // Ref para el indicador de scroll
  const { trackButtonClick, trackDownload, trackSectionView } = useAnalytics();

  // Estado para controlar la animación inicial vs. scroll
  const [initialView, setInitialView] = useState(true);

  // Referencias para los elementos de parallax
  const bgGradientRef = useRef<HTMLDivElement>(null);
  const bgCircleRef = useRef<HTMLDivElement>(null);
  const bgLinesRef = useRef<HTMLDivElement>(null);

  // Contexto de animación
  const { isReady, isMounted } = useAnimationContext();

  // Efectos para la transición al hacer scroll (Framer Motion)
  const opacity = useTransform(scrollProgress, [0, 0.3, 0.45], [1, 0.7, 0]);
  const scale = useTransform(scrollProgress, [0, 0.3, 0.45], [1, 0.95, 0.9]);
  const translateY = useTransform(
    scrollProgress,
    [0, 0.3, 0.45],
    [0, -20, -60]
  );
  // Enhanced scroll exit effects with staggered animations
  const titleOpacity = useTransform(
    scrollProgress,
    [0, 0.15, 0.3],
    [1, 0.9, 0]
  );
  const titleY = useTransform(scrollProgress, [0, 0.15, 0.3], [0, -20, -80]);
  const titleScale = useTransform(
    scrollProgress,
    [0, 0.15, 0.3],
    [1, 0.98, 0.95]
  );

  const subtitleOpacity = useTransform(
    scrollProgress,
    [0, 0.18, 0.35],
    [1, 0.8, 0]
  );
  const subtitleY = useTransform(
    scrollProgress,
    [0, 0.18, 0.35],
    [0, -15, -70]
  );

  const buttonOpacity = useTransform(
    scrollProgress,
    [0, 0.2, 0.4],
    [1, 0.7, 0]
  );
  const buttonY = useTransform(scrollProgress, [0, 0.2, 0.4], [0, -10, -60]);
  const buttonScale = useTransform(
    scrollProgress,
    [0, 0.2, 0.4],
    [1, 0.97, 0.9]
  );

  // Enhanced background parallax effects
  const bgTranslateY = useTransform(scrollProgress, [0, 1], [0, 250]);
  const bgScale = useTransform(scrollProgress, [0, 0.8], [1, 1.3]);
  const bgOpacity = useTransform(scrollProgress, [0, 0.3, 0.7], [1, 0.8, 0.1]);

  // Efectos para las líneas
  const linesTranslateY = useTransform(scrollProgress, [0, 1], [0, 100]);
  const linesScale = useTransform(scrollProgress, [0, 0.5], [1, 1.1]);

  // Usar GSAP para crear animaciones más complejas
  useEffect(() => {
    if (!isMounted || !isReady || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Efecto de entrada para el título
      if (titleRef.current) {
        const titleElements = titleRef.current.querySelectorAll(".word-reveal");
        gsap.fromTo(
          titleElements,
          {
            y: 50,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            duration: 1.2,
            ease: "expo.out",
            delay: 0.2,
          }
        );
      }

      // Animaciones para el subtítulo
      if (subtitleRef.current) {
        const subtitleAnimation = gsap.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.9,
            ease: "power3.out",
          }
        );
      }

      // Animaciones para los botones
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll("button");
        const buttonsAnimation = gsap.fromTo(
          buttons,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            duration: 0.9,
            delay: 1.2,
            ease: "elastic.out(1.1, 0.5)",
          }
        );
      }

      // Animación del indicador de scroll usando la ref
      if (scrollIndicatorRef.current) {
        const indicatorAnimation = gsap.fromTo(
          scrollIndicatorRef.current, // Usar la ref
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 1.7,
            ease: "power2.out",
          }
        );
        // No es estrictamente necesario registrarlo si ctx.revert() lo maneja
      }
      controls.start({ opacity: 1 });

      // Track section view
      trackSectionView("hero");
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, [isMounted, isReady, controls, trackSectionView]); // Agregado trackSectionView a las dependencias

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* Fondo con gradientes optimizados para finanzas y efecto parallax */}
      <motion.div
        ref={parallaxRef}
        className="hero-parallax absolute inset-0 z-0"
        style={{
          y: bgTranslateY,
          scale: bgScale,
          opacity: bgOpacity,
        }}
      >
        {/* Gradiente azul-verde con animación sutil */}
        <motion.div
          ref={bgGradientRef}
          className="absolute inset-0 bg-gradient-to-b from-blue-400/15 via-emerald-300/10 to-background/0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {/* Capa de brillo animado */}
          <div className="absolute inset-0 bg-gradient-radial-animated opacity-30"></div>
        </motion.div>

        {/* Círculo radial central con pulso sutil */}
        <motion.div
          ref={bgCircleRef}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.15),transparent_70%)]"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        ></motion.div>

        {/* Patrón de textura sutil */}
        <div className="absolute inset-0 bg-[url(/grain.svg)] opacity-[0.02] mix-blend-overlay"></div>

        {/* Líneas gráficas con animación */}
        <motion.div
          ref={bgLinesRef}
          className="absolute inset-0 overflow-hidden"
          style={{
            y: linesTranslateY,
            scale: linesScale,
          }}
        >
          <svg
            className="w-full h-full opacity-[0.05]"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,800 Q250,700 500,800 T1000,700"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="chart-line main-chart"
            />
            <motion.path
              d="M0,700 Q250,650 500,550 T1000,600"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 5, ease: "easeInOut", delay: 0.5 }}
              className="chart-line secondary-chart"
            />
            <motion.path
              d="M0,600 Q250,550 500,650 T1000,500"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 6, ease: "easeInOut", delay: 1 }}
              className="chart-line reference-chart"
            />
          </svg>
        </motion.div>
      </motion.div>
      {/* Contenido principal con efecto mejorado de salida al hacer scroll */}
      <motion.div
        className="container relative z-10 px-4 text-center"
        style={{ opacity, scale, y: translateY }}
        initial={{ opacity: 0 }}
        animate={controls}
      >
        <h1
          ref={titleRef}
          className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
        >
          <span className="inline-block overflow-hidden">
            <span className="word-reveal inline-block">Your</span>
          </span>{" "}
          <span className="inline-block overflow-hidden">
            <span className="word-reveal inline-block">Money,</span>
          </span>{" "}
          <span className="inline-block overflow-hidden">
            <span className="word-reveal inline-block">Your</span>
          </span>{" "}
          <span className="inline-block overflow-hidden">
            <span className="word-reveal bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent inline-block">
              Financial
            </span>
          </span>{" "}
          <span className="inline-block overflow-hidden">
            <span className="word-reveal bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent inline-block">
              Future
            </span>
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="hero-subtitle text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10"
        >
          Moneo helps you organize your personal finances, save wisely and
          create an investment plan that grows your wealth every day.
        </p>

        <div
          ref={ctaRef}
          className="hero-cta flex flex-col sm:flex-row gap-4 justify-center"
        >
          {" "}
          <Button
            size="lg"
            className="gap-2 px-8 py-6 relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-colors duration-300 shadow-lg hover:shadow-blue-500/20"
            onClick={() => {
              trackButtonClick("join_waitlist_hero", "hero");
              scrollToDownload();
            }}
          >
            <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-500 ease-out group-hover:w-full"></span>
            <Download className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
            <span className="font-medium">Join Waitlist</span>
          </Button>{" "}
          <Button
            size="lg"
            variant="outline"
            className="gap-2 px-8 py-6 group border-2 hover:bg-foreground/5 transition-colors duration-300"
            onClick={() => {
              trackButtonClick("learn_more_hero", "hero");
              scrollToFeatures();
            }}
          >
            <span className="font-medium">Learn More</span>
            <ArrowRight className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </motion.div>
      {/* Indicador de scroll mejorado con animación pulsante */}{" "}
      <motion.div
        ref={scrollIndicatorRef} // Asignar la ref aquí
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 scroll-indicator cursor-pointer opacity-0"
        onClick={() => {
          trackButtonClick("scroll_indicator", "hero");
          scrollToFeatures();
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      ></motion.div>
    </section>
  );
}
