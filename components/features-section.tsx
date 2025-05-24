"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import {
  Layout,
  Calculator,
  ArrowLeftRight,
  Database,
  ChartLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnimation } from "@/contexts/animation-context"; // Ruta corregida
import { useAnalytics } from "@/hooks/use-analytics";

// Registrar los plugins de GSAP solo en el cliente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const { isMounted, isReady: animationContextIsReady } = useAnimation(); // Obtener isMounted e isReady del contexto
  const { trackSectionView, trackFeature } = useAnalytics();

  // Features data with enhanced descriptions
  const features = [
    {
      number: "01",
      title: "Adaptive Interface",
      description:
        "Dynamic balance sheet widget with integrated period selector, filter buttons (All/Expenses/Income) and responsive design that adapts according to the content displayed.",
      icon: <Layout className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500",
      image: "/c_1.jpg",
    },
    {
      number: "02",
      title: "Balance and Available Funds",
      description:
        "Automatic calculation of accounting balance (income - expenses) and real-time available funds. It distinguishes between accounting balance and account balance, excluding transfers from the accounting calculation",
      icon: <Calculator className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
      color: "from-green-500 to-teal-500",
      bgColor: "bg-green-500/10",
      textColor: "text-green-500",
      image: "/c_2.jpg",
    },
    {
      number: "03",
      title: "Transfers between Accounts",
      description:
        "Functionality to transfer money between different accounts with validation of sufficient funds and automatic update of source and destination balances",
      icon: <ArrowLeftRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-500",
      image: "/c_3.jpg",
    },
    {
      number: "04",
      title: "Local Storage",
      description:
        "Data persistence system using Hive for local storage without internet connection. Includes data migration and synchronization between SharedPreferences and Hive",
      icon: <Database className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10",
      textColor: "text-red-500",
      image: "/c_4.jpg",
    },
    {
      number: "05",
      title: "Advanced Statistics",
      description:
        "Statistics panel with multiple types of visualization: donut charts by categories/accounts, monthly bar charts, and historical charts with zoom and interactive tooltips",
      icon: <ChartLine className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
      color: "from-indigo-500 to-violet-500",
      bgColor: "bg-indigo-500/10",
      textColor: "text-indigo-500",
      image: "/c_5.jpg",
    },
  ];

  // Check screen size and mobile status
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({ width, height });
      setIsMobile(width < 1024);
    };

    // Solo ejecutar si está montado para evitar problemas de hidratación con el primer cálculo
    if (isMounted) {
      checkScreenSize();
    }

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [isMounted]); // Depender solo de isMounted para el cálculo inicial y el listener

  // Horizontal scroll effect for desktop with responsive calculations
  useEffect(() => {
    if (
      isMobile ||
      !isMounted ||
      !animationContextIsReady ||
      !featuresContainerRef.current || // Asegurarse de que featuresContainerRef.current no sea null
      screenSize.width === 0
    ) {
      return;
    }

    // Definir pinTargetElement aquí, asegurándose de que sectionRef.current exista.
    // Si sectionRef.current es null, no se debería ejecutar la animación.
    const pinTargetElement = sectionRef.current;
    if (!pinTargetElement) {
      console.warn(
        "FeaturesSection: sectionRef.current is null, cannot initialize scroll animation."
      );
      return;
    }

    const ctx = gsap.context(() => {
      const getCardWidth = () => {
        // Mover la definición de getCardWidth aquí para evitar redeclaración
        if (screenSize.width >= 1536)
          return Math.min(600, screenSize.width * 0.35); // 2xl
        if (screenSize.width >= 1280)
          return Math.min(550, screenSize.width * 0.4); // xl
        if (screenSize.width >= 1024)
          return Math.min(500, screenSize.width * 0.45); // lg
        return Math.min(450, screenSize.width * 0.85); // fallback
      };

      const cardWidth = getCardWidth();
      const gap = screenSize.width >= 1280 ? 32 : 24;

      // Asegurarse de que featuresContainerRef.current no sea null antes de usarlo
      if (!featuresContainerRef.current) return;

      const featureCardElements =
        featuresContainerRef.current.querySelectorAll<HTMLElement>(
          ".feature-card"
        );
      featureCardElements.forEach((card: HTMLElement) => {
        // Añadir tipo explícito a card
        card.style.width = `${cardWidth}px`;
        card.style.minWidth = `${cardWidth}px`;
      });

      const horizontalTween = gsap.to(featuresContainerRef.current, {
        x: () => {
          const cardCount = features.length;
          const totalCardWidth = cardWidth * cardCount;
          const totalGapWidth = gap * (cardCount - 1);
          const containerPadding = screenSize.width >= 1280 ? 48 : 32;
          const totalContentWidth =
            totalCardWidth + totalGapWidth + containerPadding;

          // Usar pinTargetElement.offsetWidth que ya está definido y verificado
          // para el cálculo del desplazamiento, pero el trigger es featuresContainerRef
          const viewportWidth = pinTargetElement.offsetWidth;
          const totalScroll = totalContentWidth - viewportWidth;
          return -Math.max(totalScroll, 0);
        },
        ease: "none",
        scrollTrigger: {
          id: "featuresScroll",
          trigger: featuresContainerRef.current, // Modificado: el trigger ahora es el contenedor de las tarjetas
          pin: pinTargetElement, // Mantenemos el pin en la sección completa (pinTargetElement es sectionRef.current)
          start: "top 60px", // Modificado: La parte superior del trigger a 60px de la parte superior del viewport
          end: () => `+=${pinTargetElement.offsetWidth * 2.5}`, // Usar la variable definida
          scrub: 0.8,
          anticipatePin: 0.1,
          pinSpacing: "auto",
          markers: false,
          onUpdate: (self) => {
            if (progressRef.current) {
              const adjustedProgress = Math.min(Math.max(self.progress, 0), 1);
              progressRef.current.style.width = `${adjustedProgress * 100}%`;
            }
            const totalCards = features.length;
            let activeIndex;
            if (self.progress < 0.05) {
              activeIndex = 0;
            } else {
              activeIndex = Math.min(
                Math.floor(((self.progress - 0.05) / 0.95) * totalCards),
                totalCards - 1
              );
            }
            if (activeIndex >= 0) {
              setActiveFeature(activeIndex);
            }
          },
          invalidateOnRefresh: true,
        },
      });

      // Asegurarse de que featuresContainerRef.current no sea null antes de usarlo
      if (!featuresContainerRef.current) return;

      const cardNodes =
        featuresContainerRef.current.querySelectorAll<HTMLElement>(
          ".feature-card"
        );
      cardNodes.forEach((card: HTMLElement) => {
        // Añadir tipo explícito a card
        gsap.fromTo(
          card,
          {
            opacity: 1,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 90%",
              end: "right 10%",
              scrub: 0.3,
            },
          }
        );
      });
    }, pinTargetElement); // Usar pinTargetElement como scope, que es sectionRef.current

    return () => {
      ctx.revert();
    };
  }, [isMobile, isMounted, animationContextIsReady, screenSize]); // Quitado features.length

  // Track section view when it comes into view
  useEffect(() => {
    if (isInView) {
      trackSectionView("features");
    }
  }, [isInView, trackSectionView]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className={cn(
        "relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-[#f8f5f5] dark:bg-[#0d0d10]",
        isInView ? "z-10" : "z-0"
      )}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-primary/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.08),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[url(/grain.svg)] opacity-[0.02] mix-blend-overlay"></div>
        <div className="absolute top-1/4 left-[10%] w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-primary/5 blur-[50px] sm:blur-[75px] md:blur-[100px] opacity-80"></div>
        <div className="absolute bottom-1/4 right-[5%] w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-full bg-primary/8 blur-[60px] sm:blur-[90px] md:blur-[120px] opacity-60"></div>
      </div>{" "}
      {/* Section header */}
      <div className="container px-4 sm:px-6 mb-12 sm:mb-16 md:mb-20 text-center relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          viewport={{ once: false, margin: "-50px" }}
        >
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">
            POWERFUL FEATURES
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
            type: "spring",
            stiffness: 80,
            damping: 20,
          }}
          viewport={{ once: false, margin: "-50px" }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight"
        >
          <motion.span
            className="block text-black dark:text-white"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            Moneo Brings
          </motion.span>
          <motion.span
            className="block bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            The Power
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4,
            type: "spring",
            stiffness: 60,
            damping: 25,
          }}
          viewport={{ once: false, margin: "-50px" }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Moneo combines powerful tools with an intuitive interface to give you
          complete control over your finances.
        </motion.p>
      </div>
      {/* Features cards - Responsive layout */}
      {!isMounted ? (
        // Loading state
        <div className="container px-4 sm:px-6 mb-16 relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="opacity-0 h-64 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      ) : isMobile ? ( // Mobile/Tablet layout - vertical stacking
        <div className="container px-4 sm:px-6 mb-16 relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                viewport={{ once: false, margin: "-10%" }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                <PremiumFeatureCard
                  feature={feature}
                  isActive={activeFeature === index}
                  onClick={() => {
                    const featureType = feature.title
                      .toLowerCase()
                      .includes("interface")
                      ? "budget_tracker"
                      : feature.title.toLowerCase().includes("balance")
                      ? "expense_tracker"
                      : feature.title.toLowerCase().includes("transfer")
                      ? "account_transfer"
                      : feature.title.toLowerCase().includes("storage")
                      ? "statistics"
                      : "statistics";
                    trackFeature(featureType);
                    setActiveFeature(index === activeFeature ? null : index);
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        // Desktop layout - horizontal scroll
        <motion.div
          className="features-scroll relative overflow-visible min-h-[600px] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div
              ref={featuresContainerRef}
              className="features-container flex flex-nowrap gap-6 xl:gap-8 px-4 sm:px-6 lg:px-8 py-8"
              style={{
                marginTop: "-40px",
              }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card flex-shrink-0"
                  style={{
                    width:
                      screenSize.width >= 1536
                        ? "600px"
                        : screenSize.width >= 1280
                        ? "550px"
                        : screenSize.width >= 1024
                        ? "500px"
                        : "450px",
                    minWidth:
                      screenSize.width >= 1536
                        ? "600px"
                        : screenSize.width >= 1280
                        ? "550px"
                        : screenSize.width >= 1024
                        ? "500px"
                        : "450px",
                  }}
                >
                  {" "}
                  <PremiumFeatureCard
                    feature={feature}
                    isActive={activeFeature === index}
                    onClick={() => {
                      const featureType = feature.title
                        .toLowerCase()
                        .includes("interface")
                        ? "budget_tracker"
                        : feature.title.toLowerCase().includes("balance")
                        ? "expense_tracker"
                        : feature.title.toLowerCase().includes("transfer")
                        ? "account_transfer"
                        : feature.title.toLowerCase().includes("storage")
                        ? "statistics"
                        : "statistics";
                      trackFeature(featureType);
                      setActiveFeature(index === activeFeature ? null : index);
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Scroll indicator - responsive positioning */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 z-20 w-48 sm:w-56 md:w-64"
              style={{ top: "calc(100% + 20px)" }}
            >
              <div className="relative h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full bg-primary origin-left transition-all duration-300 ease-out"
                  style={{ width: "0%" }}
                ></div>

                <div className="absolute inset-0 flex justify-between px-1 items-center pointer-events-none">
                  {features.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all duration-300",
                        activeFeature === index
                          ? "bg-white scale-125 shadow-glow"
                          : index === 0
                          ? "bg-primary/70 scale-110"
                          : "bg-gray-400/50 scale-100"
                      )}
                      style={{
                        boxShadow:
                          activeFeature === index
                            ? "0 0 5px 1px rgba(255,255,255,0.5)"
                            : "none",
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>01</span>
                <span>{features.length.toString().padStart(2, "0")}</span>
              </div>
            </div>

            {/* Scroll hint - responsive */}
            <div
              className="absolute right-4 sm:right-6 lg:right-8 z-20 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground"
              style={{ top: "calc(100% + 20px)" }}
            >
              <span className="hidden sm:inline text-xs font-medium bg-gray-100 dark:bg-gray-800/70 px-2 sm:px-2.5 py-1 rounded-full">
                {activeFeature !== null
                  ? `${(activeFeature + 1)
                      .toString()
                      .padStart(2, "0")}/${features.length
                      .toString()
                      .padStart(2, "0")}`
                  : "Explora"}
              </span>
              <div
                className={cn(
                  "flex items-center gap-1 sm:gap-2",
                  activeFeature === 0
                    ? "animate-[pulse_3s_ease-in-out_infinite]"
                    : "opacity-80"
                )}
              >
                <span className="hidden sm:inline">
                  {activeFeature === 0 ? "Scroll to explore" : "Keep exploring"}
                </span>
                <span className="sm:hidden">Scroll</span>
                <div className="relative">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 sm:w-4 sm:h-4"
                  >
                    <path
                      d="M3.5 8H12.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 3.5L12.5 8L8 12.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {activeFeature === 0 && (
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-sm animate-ping" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}

// Premium Feature Card Component with responsive improvements
function PremiumFeatureCard({
  feature,
  isActive = false,
  onClick,
}: {
  feature: any;
  isActive?: boolean;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)"
  );
  const { isMounted: cardIsMounted } = useAnimation(); // Usar isMounted del contexto

  const isHighlighted = isActive || isHovered;

  // Handle mouse movements for subtle card interaction - only on larger screens
  useEffect(() => {
    if (
      !cardIsMounted || // Usar isMounted del contexto
      !cardRef.current ||
      typeof window === "undefined" ||
      !window.matchMedia("(min-width: 1024px)").matches
    )
      return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;
      if (!document.body.contains(card)) return; // Verifica que el elemento sigue en el DOM

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const posX = e.clientX - centerX;
      const posY = e.clientY - centerY;

      const rotateY = posX * 0.005; // Reduced intensity
      const rotateX = -posY * 0.005; // Reduced intensity

      setTransform(
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`
      );
    };

    const handleMouseLeave = () => {
      setTransform("perspective(1000px) rotateX(0) rotateY(0) translateZ(0)");
    };

    if (isHighlighted && card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    } else if (card) {
      handleMouseLeave();
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
    // Añadir cardIsMounted a las dependencias
  }, [isHighlighted, cardIsMounted]);
  return (
    <div
      ref={cardRef}
      className={cn(
        "relative h-full w-full border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-out cursor-pointer",
        isHighlighted
          ? "border-transparent shadow-xl lg:shadow-2xl"
          : "border-gray-300 dark:border-gray-600 shadow-lg", // Borde más sutil
        isHighlighted
          ? "bg-transparent dark:bg-transparent" // Fondo transparente para activas para mostrar el gradiente
          : "bg-white dark:bg-gray-900" // Fondo completamente sólido SIN backdrop-blur
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        willChange: "transform",
        transformStyle: "preserve-3d",
        transition:
          "transform 0.3s ease-out, border-color 0.3s ease, box-shadow 0.5s ease",
        transform: transform,
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
            feature.color
          )}
        />

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

        <div className="absolute inset-0 bg-[url('/grain.svg')] bg-repeat opacity-25 mix-blend-overlay" />

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

      {/* Card content - responsive grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-6 sm:p-8 h-full">
        {/* Left content */}
        <div className="flex flex-col order-2 lg:order-1">
          {/* Top section with icon and number */}
          <div className="flex items-center mb-4 sm:mb-6">
            {" "}
            <div
              className={cn(
                "p-3 sm:p-4 rounded-xl transition-all duration-500 mr-3 sm:mr-4",
                isHighlighted
                  ? "bg-white/20 text-white ring-1 ring-white/30 shadow-lg"
                  : "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-lg" // Iconos con máximo contraste
              )}
            >
              {feature.icon}
            </div>{" "}
            <span
              className={cn(
                "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight transition-all duration-500",
                isHighlighted
                  ? "text-white opacity-100"
                  : "text-gray-900 dark:text-white" // Números con máximo contraste
              )}
              style={{
                textShadow: isHighlighted
                  ? "0 2px 10px rgba(0,0,0,0.2)"
                  : "none",
              }}
            >
              {feature.number}
            </span>
          </div>

          {/* Content section */}
          <div className="flex flex-col flex-grow">
            {" "}
            <h3
              className={cn(
                "text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 transition-colors duration-300",
                isHighlighted ? "text-white" : "text-gray-900 dark:text-white" // Títulos con máximo contraste
              )}
            >
              {feature.title}
            </h3>{" "}
            <p
              className={cn(
                "text-sm sm:text-base transition-colors duration-300 mb-auto leading-relaxed",
                isHighlighted
                  ? "text-white/95"
                  : "text-gray-800 dark:text-gray-100" // Descripciones con máximo contraste
              )}
            >
              {feature.description}
            </p>{" "}
          </div>
        </div>

        {/* Right content - Feature image */}
        <div className="relative h-48 sm:h-56 lg:h-full flex items-center justify-center order-1 lg:order-2">
          <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-xl w-full h-full">
            <div
              className={cn(
                "absolute -inset-2 sm:-inset-4 blur-xl sm:blur-2xl opacity-30 rounded-full",
                isHighlighted ? "bg-white/30" : feature.bgColor
              )}
            />

            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover rounded-lg sm:rounded-xl relative z-10"
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent z-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 z-20" />

            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full z-30",
                isHighlighted ? "animate-shimmer" : ""
              )}
            />
          </div>

          {/* Decorative elements - responsive sizes */}
          <div
            className={cn(
              "absolute -bottom-3 sm:-bottom-6 -right-3 sm:-right-6 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 rounded-full blur-lg sm:blur-2xl opacity-40",
              feature.bgColor
            )}
          />
          <div
            className={cn(
              "absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full blur-md sm:blur-xl opacity-30",
              feature.bgColor
            )}
          />
        </div>
      </div>
    </div>
  );
}
