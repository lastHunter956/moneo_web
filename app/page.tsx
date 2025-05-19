"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "@studio-freight/lenis";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  PhoneIcon,
  CreditCard,
  PieChart,
  TrendingUp,
  Shield,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
} from "lucide-react";
import FeatureCard from "@/components/feature-card";
import { ThemeProvider } from "@/components/theme-provider";
import AppDescription from "@/components/app-description";
import TestimonialsSection from "@/components/testimonials-section";
import Header from "@/components/header";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const screenshotsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Features data
  const features = [
    {
      number: "01",
      title: "Expense Tracking",
      description:
        "Automatically categorize and track your expenses to understand where your money goes.",
      icon: <TrendingUp />,
      color: "from-blue-500 to-purple-500",
    },
    {
      number: "02",
      title: "Budget Planning",
      description:
        "Create custom budgets and get alerts when you're approaching your limits.",
      icon: <PieChart />,
      color: "from-green-500 to-teal-500",
    },
    {
      number: "03",
      title: "Bill Reminders",
      description:
        "Never miss a payment with automated bill reminders and scheduling.",
      icon: <CreditCard />,
      color: "from-amber-500 to-orange-500",
    },
    {
      number: "04",
      title: "Secure Banking",
      description:
        "Bank-level encryption keeps your financial data safe and secure.",
      icon: <Shield />,
      color: "from-red-500 to-pink-500",
    },
    {
      number: "05",
      title: "Investment Tracking",
      description:
        "Monitor your investments and track your portfolio performance in real-time.",
      icon: <TrendingUp />,
      color: "from-indigo-500 to-violet-500",
    },
  ];

  const screenshotsData = [
    {
      id: 1,
      title: "Dashboard Overview",
      description:
        "A brief summary of how you have managed your finances so far this month.",
      image: "/1.jpg",
      color: "from-blue-500/20 to-violet-500/20",
      accent: "#8B5CF6",
    },
    {
      id: 2,
      title: "Income and expenses report",
      description: "Detailed report of the economic flow in a waste of time",
      image: "/2.jpg",
      color: "from-green-500/20 to-emerald-500/20",
      accent: "#10B981",
    },
    {
      id: 3,
      title: "Account registration",
      description: "View all the income you have in all your accounts",
      image: "/3.jpg",
      color: "from-amber-500/20 to-yellow-500/20",
      accent: "#F59E0B",
    },
    {
      id: 4,
      title: "Category management",
      description:
        "Categories help to organize income sources clearly and personalized.",
      image: "/5.jpg",
      color: "from-red-500/20 to-rose-500/20",
      accent: "#F43F5E",
    },
    {
      id: 5,
      title: "Visualization of historical data",
      description: "Compare with previous months and make strategic decisions.",
      image: "/4.jpg",
      color: "from-sky-500/20 to-cyan-500/20",
      accent: "#0EA5E9",
    },
    {
      id: 6,
      title: "Editing existing records",
      description: "Fix or delete the records",
      image: "/6.jpg",
      color: "from-fuchsia-500/20 to-pink-500/20",
      accent: "#D946EF",
    },
  ];

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Initialize Lenis for smooth scrolling
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Hero section animations - optimized
    if (heroRef.current) {
      const heroTitle = heroRef.current.querySelector(".hero-title");
      const heroSubtitle = heroRef.current.querySelector(".hero-subtitle");
      const heroCta = heroRef.current.querySelector(".hero-cta");

      if (heroTitle && heroSubtitle && heroCta) {
        // Simplified animation for better performance
        gsap.fromTo(
          heroTitle,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );

        gsap.fromTo(
          heroSubtitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
        );

        gsap.fromTo(
          heroCta,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power3.out" }
        );
      }

      // Parallax effect for hero section - optimized
      gsap.to(".hero-parallax", {
        y: "-20%",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Scroll down indicator animation - simplified
      gsap.to(".scroll-indicator", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }

    // Features section animations - advanced Lenis-style with GSAP
    if (featuresRef.current) {
      // Setup features section with enhanced parallax
      const featureCards = gsap.utils.toArray(".feature-card");
      const featuresSection = featuresRef.current;
      const featuresTitle = featuresSection.querySelector(
        ".features-title-wrapper"
      );
      const handModel = featuresSection.querySelector(".hand-model");
      const particles = featuresSection.querySelectorAll(".particle");

      // Create particles floating animation with advanced randomization
      particles.forEach((particle) => {
        // Randomize starting position
        gsap.set(particle as Element, {
          x: `random(-50, 50)`,
          y: `random(-50, 50)`,
          scale: `random(0.5, 1.5)`,
          opacity: `random(0.3, 0.8)`,
        });

        // Create continuous floating movement
        gsap.to(particle as Element, {
          x: `random(-150, 150)`,
          y: `random(-150, 150)`,
          rotation: `random(-360, 360)`,
          scale: `random(0.7, 1.3)`,
          duration: `random(15, 30)`,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: `random(0, 8)`,
        });

        // Add pulsing opacity for ethereal effect
        gsap.to(particle as Element, {
          opacity: `random(0.2, 0.6)`,
          duration: `random(2, 5)`,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: `random(0, 3)`,
        });
      });

      // Animación simplificada del título sin efectos 3D
      if (featuresTitle) {
        const perspectiveText =
          featuresTitle.querySelector(".perspective-text");
        if (perspectiveText) {
          // Configuración inicial simple
          gsap.set(perspectiveText, {
            opacity: 0,
            y: 30,
          });

          // Secuencia de animación simplificada
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: featuresTitle,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });

          tl.to(perspectiveText, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          }).to(
            perspectiveText,
            {
              textShadow: "0 4px 8px rgba(0,0,0,0.15)",
              duration: 0.5,
              ease: "power2.out",
            },
            "<0.2"
          );
        }
      }

      // Animación de entrada simplificada sin efectos 3D
      featureCards.forEach((card, i) => {
        gsap.set(card as Element, {
          x: -30,
          opacity: 0,
        });

        gsap.to(card as Element, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      });

      // Enhanced smooth horizontal scrolling with optimized performance
      gsap.to(".features-container", {
        x: () => {
          // Calculate the scroll distance based on the number of cards with improved calculation
          const container = document.querySelector(".features-container");
          if (!container) return 0;
          const width = container.scrollWidth;
          const viewportWidth = window.innerWidth;
          // Extended overshoot for a more immersive experience
          return -(width - viewportWidth + 400);
        },
        ease: "power1.out", // Improved easing for more natural movement
        scrollTrigger: {
          trigger: ".features-scroll",
          start: "top 40%", // Better trigger point for natural transition
          end: "+=6000", // Longer scroll area for smoother effect
          scrub: 2, // More smoothing for professional transitions
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          onEnter: () => {
            // Slow down Lenis scroll for more controlled experience in this section
            if (lenis) {
              gsap.to(lenis, {
                duration: 1,
                scrollMultiplier: 0.8,
                ease: "power2.out",
                overwrite: true,
              });
            }
          },
          onLeaveBack: () => {
            // Reset Lenis scroll speed when leaving section backward
            if (lenis) {
              gsap.to(lenis, {
                duration: 1,
                scrollMultiplier: 1,
                ease: "power2.out",
                overwrite: true,
              });
            }
          },
          onLeave: () => {
            // Reset Lenis scroll speed when leaving section forward
            if (lenis) {
              gsap.to(lenis, {
                duration: 1,
                scrollMultiplier: 1,
                ease: "power2.out",
                overwrite: true,
              });
            }
          },
          onUpdate: (self) => {
            // Desplazamiento horizontal simplificado sin efectos de escala
            featureCards.forEach((card, i) => {
              // No aplicamos transformaciones de escala para mantener tamaño constante
              gsap.to(card as Element, {
                duration: 0.5,
                ease: "power1.out",
                overwrite: "auto",
              });
            });

            // Efecto de iluminación simplificado sin gradientes dinámicos
            gsap.to(".features-scroll", {
              duration: 0.6,
              ease: "power1.out",
              overwrite: "auto",
            });
          },
        },
      });

      // 3D hand model animation removed
    }

    // App description section animations - optimized
    if (descriptionRef.current) {
      const textElements =
        descriptionRef.current.querySelectorAll(".reveal-text");

      textElements.forEach((text) => {
        gsap.fromTo(
          text,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text as Element,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    // Add scroll progress animation for the features section
    if (featuresRef.current) {
      // Create a scroll progress indicator
      const scrollTrigger = ScrollTrigger.create({
        trigger: ".features-scroll",
        start: "top 35%",
        end: "+=5000",
        onUpdate: (self) => {
          gsap.to(".features-progress", {
            xPercent: self.progress * 200 - 100,
            ease: "none",
            overwrite: true,
            duration: 0.1,
          });
        },
      });
    }

    // App screenshots carousel animations
    if (screenshotsRef.current) {
      const screenshotsSection = screenshotsRef.current;

      // Animate screenshots title
      gsap.fromTo(
        screenshotsSection.querySelector(".screenshots-title"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: screenshotsSection,
            start: "top 75%",
          },
        }
      );

      // Animate carousel
      gsap.fromTo(
        screenshotsSection.querySelector(".screenshots-carousel"),
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: screenshotsSection,
            start: "top 60%",
          },
        }
      );

      // Create glow effect
      const screenshotGlow =
        screenshotsSection.querySelector(".screenshot-glow");
      if (screenshotGlow) {
        gsap.to(screenshotGlow, {
          opacity: 0.8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }

    return () => {
      lenisInstance.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const downloadRef = useRef<HTMLDivElement>(null);

  const scrollToDownload = () => {
    if (lenis && downloadRef.current) {
      lenis.scrollTo(downloadRef.current, {
        duration: 0.005,
      });
    }
  };
  const scrollToFeatures = () => {
    if (lenis && featuresRef.current) {
      lenis.scrollTo(featuresRef.current, {
        offset: -100,
        duration: 0.1,
      });
    }
  };

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) =>
      prev === screenshotsData.length - 1 ? 0 : prev + 1
    );
    resetAutoplayTimer();
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) =>
      prev === 0 ? screenshotsData.length - 1 : prev - 1
    );
    resetAutoplayTimer();
  };

  // Control de autoplay para carrusel estilo Apple
  const resetAutoplayTimer = () => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }

    if (isAutoplay) {
      autoplayTimerRef.current = setTimeout(() => {
        nextScreenshot();
      }, 4000); // 4 segundos por slide, como Apple suele usar
    }
  };

  // Gestión de arrastrar para navegación táctil estilo iOS
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - dragStartX;
    setDragOffset(offset);
    // Prevenir desplazamiento de la página mientras se arrastra
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        prevScreenshot();
      } else {
        nextScreenshot();
      }
    }

    setDragOffset(0);
  };

  // Calculamos el índice anterior y posterior para animaciones
  const prevIndex =
    (currentScreenshot - 1 + screenshotsData.length) % screenshotsData.length;
  const nextIndex = (currentScreenshot + 1) % screenshotsData.length;

  // Autoplay effect for the screenshots carousel
  useEffect(() => {
    // Iniciar autoplay para el carrusel
    resetAutoplayTimer();

    if (screenshotsRef.current) {
      // Optimizar animaciones por rendimiento
      let mm = gsap.matchMedia();

      // Configuración específica para el carrusel de capturas de pantalla
      mm.add("(min-width: 768px)", () => {
        const iphoneContainer =
          screenshotsRef.current?.querySelector(".iphone-showcase");
        const floatingElements =
          screenshotsRef.current?.querySelectorAll(".floating-element");

        if (iphoneContainer) {
          // Animación de aparición del iPhone con efecto de elevación
          gsap.fromTo(
            iphoneContainer,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: screenshotsRef.current,
                start: "top 70%",
              },
            }
          );

          // Rotación suave del iPhone al hacer scroll
          gsap.to(iphoneContainer, {
            rotateY: 10,
            scrollTrigger: {
              trigger: screenshotsRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          });
        }

        // Animación de elementos flotantes de fondo
        if (floatingElements) {
          floatingElements.forEach((el, i) => {
            // Posición inicial aleatoria
            gsap.set(el, {
              x: `random(-100, 100)`,
              y: `random(-100, 100)`,
              opacity: 0,
            });

            // Animación de entrada escalonada
            gsap.to(el, {
              opacity: 0.6,
              duration: 1,
              delay: 0.1 * i,
              ease: "power2.out",
              scrollTrigger: {
                trigger: screenshotsRef.current,
                start: "top 80%",
              },
            });

            // Movimiento perpetuo
            gsap.to(el, {
              x: `+=${Math.random() * 60 - 30}`,
              y: `+=${Math.random() * 60 - 30}`,
              rotation: `+=${Math.random() * 40 - 20}`,
              duration: 7 + i * 2,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          });
        }
      });

      // Efecto de reflexión y brillo a lo Apple
      const reflections =
        screenshotsRef.current?.querySelectorAll(".reflection");
      if (reflections) {
        reflections.forEach((reflection) => {
          gsap.fromTo(
            reflection,
            { opacity: 0, x: -100 },
            {
              opacity: 0.5,
              x: 100,
              duration: 3,
              ease: "power1.inOut",
              repeat: -1,
              repeatDelay: 2,
            }
          );
        });
      }

      // Efecto de desenfoque cinemático para la sección
      const blurLayer =
        screenshotsRef.current?.querySelector(".cinematic-blur");
      if (blurLayer) {
        gsap.fromTo(
          blurLayer,
          { opacity: 0 },
          {
            opacity: 0.8,
            duration: 1.5,
            scrollTrigger: {
              trigger: screenshotsRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }

    // Limpiar autoplay y otras animaciones
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [isAutoplay]);

  // Efecto para reiniciar el temporizador cuando cambia la captura actual
  useEffect(() => {
    resetAutoplayTimer();
  }, [currentScreenshot, isAutoplay]);

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <div className="relative" ref={containerRef}>
        <Header />

        <main>
          {/* Hero Section - Optimized */}
          <section
            ref={heroRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
          >
            <div className="hero-parallax absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background/0"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1),transparent_50%)]"></div>
            </div>

            <motion.div
              className="container relative z-10 px-4 text-center"
              style={{ opacity, scale }}
            >
              <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                Smart Finance For Smart People
              </h1>
              <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Take control of your finances with Moneo, the all-in-one
                personal finance app that helps you track, save, and grow your
                money.
              </p>
              <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2" onClick={scrollToDownload}>
                  <Download className="h-5 w-5" />
                  Download App
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={scrollToFeatures}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 scroll-indicator cursor-pointer"
              onClick={scrollToFeatures}
            >
              <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <span className="text-sm">Scroll Down</span>
                <ChevronDown className="h-5 w-5 animate-bounce" />
              </div>
            </div>
          </section>

          {/* Features Section - Lenis Style */}
          <section
            id="features"
            ref={featuresRef}
            className="relative py-40 bg-[#f8f5f5] dark:bg-[#0d0d10] overflow-hidden"
          >
            {/* Enhanced floating particles background */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="particle absolute rounded-full bg-primary/20 dark:bg-primary/30"
                  style={{
                    width: `${Math.random() * 18 + 6}px`,
                    height: `${Math.random() * 18 + 6}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 10 + 10}s`,
                    filter: `blur(${Math.random() * 1}px)`,
                    opacity: Math.random() * 0.5 + 0.3,
                  }}
                />
              ))}
            </div>

            {/* Added atmospheric ambient light layer */}
            <div className="features-ambient-light absolute inset-0 pointer-events-none opacity-0">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent"></div>
            </div>

            {/* Top area with 3D title */}
            <div className="container px-4 mb-16 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="features-title-wrapper"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  <span className="text-black dark:text-white perspective-text">
                    Moneo Brings
                  </span>{" "}
                  <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                    The Power
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to manage your finances in one place.
                </p>
              </motion.div>
            </div>

            {/* Hand model removed */}

            {/* Horizontal scrolling features carousel */}
            <div className="features-scroll relative overflow-hidden">
              <div className="features-container flex flex-nowrap gap-10 px-6 py-16 ml-[5%]">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    number={feature.number}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    isActive={activeFeature === index}
                    onClick={() =>
                      setActiveFeature(index === activeFeature ? null : index)
                    }
                    color={feature.color}
                  />
                ))}
              </div>

              {/* Scroll indicator */}
              {/* Custom scroll progress indicator */}
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-2 items-center">
                    <div className="h-[3px] w-40 rounded-full bg-gradient-to-r from-transparent via-primary/30 to-transparent overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-primary/30 via-primary to-primary/30 translate-x-[-100%] features-progress"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* App Description Section */}
          <section
            id="app-description"
            ref={descriptionRef}
            className="py-32 relative overflow-hidden bg-background"
          >
            <AppDescription />
          </section>

          {/* Testimonials Section */}
          <section id="testimonials">
            <TestimonialsSection />
          </section>
          {/* App Screenshots Section - Optimized for Mobile and Enhanced for Desktop */}
          <section
            id="screenshots"
            ref={screenshotsRef}
            className="py-20 md:py-40 relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20"
          >
            {/* Efectos de fondo tipo Apple */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.04),transparent_70%)]"></div>
            <div className="cinematic-blur absolute inset-0 backdrop-blur-[120px] opacity-0 pointer-events-none"></div>

            {/* Elementos flotantes decorativos - solo visibles en desktop */}
            <div className="hidden md:block">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="floating-element absolute rounded-full bg-gradient-to-br"
                  style={{
                    width: `${Math.floor(Math.random() * 24) + 12}px`,
                    height: `${Math.floor(Math.random() * 24) + 12}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    filter: `blur(${Math.floor(Math.random() * 30) + 20}px)`,
                    background: `linear-gradient(225deg, ${
                      screenshotsData[i % screenshotsData.length].accent
                    }22, transparent)`,
                    opacity: 0,
                  }}
                />
              ))}
            </div>

            {/* Encabezado de sección */}
            <div className="container px-4 mb-10 md:mb-20 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="screenshots-title"
              >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
                  <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                    Beautiful Interface
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
                  Designed for clarity and ease of use, Moneo makes finance
                  management simple.
                </p>
              </motion.div>
            </div>

            <div className="screenshots-carousel relative container px-4">
              <div className="max-w-6xl mx-auto">
                {/* Carrusel Optimizado para Móviles y Mejorado para Desktop */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-12 lg:gap-20">
                  {/* Área de visualización principal */}
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
                    {/* Fondo de color que cambia con cada captura */}
                    <motion.div
                      className="absolute inset-0 -z-10 transform-gpu rounded-3xl opacity-40"
                      animate={{
                        background: `radial-gradient(circle at center, ${screenshotsData[currentScreenshot].accent}33, transparent 70%)`,
                      }}
                      transition={{ duration: 1.2 }}
                    />

                    {/* iPhone Frame Principal - Centrado y optimizado */}
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
                          {/* Marco del iPhone */}
                          <div className="relative w-full h-[520px] sm:h-[540px] md:h-[580px] rounded-[38px] overflow-hidden border-[12px] border-black/90 dark:border-[#222] bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_10px_40px_-10px_rgba(0,0,0,0.5),0_2px_20px_-5px_rgba(0,0,0,0.2),0_-2px_10px_rgba(255,255,255,0.05)_inset] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_10px_60px_-10px_rgba(0,0,0,0.3),0_2px_30px_-5px_rgba(0,0,0,0.2),0_-2px_10px_rgba(255,255,255,0.02)_inset]">
                            {/* Notch del iPhone */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[26px] bg-black dark:bg-black z-10 rounded-b-3xl flex justify-center items-end pb-1">
                              <div className="w-[25%] h-[4px] rounded-full bg-zinc-700 dark:bg-zinc-600"></div>
                            </div>

                            {/* Pantalla */}
                            <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-black">
                              <Image
                                src={screenshotsData[currentScreenshot].image}
                                alt={screenshotsData[currentScreenshot].title}
                                width={300}
                                height={650}
                                className="w-full h-full object-cover"
                                priority={currentScreenshot === 0}
                                quality={95}
                              />

                              {/* Reflejo en pantalla estilo Apple */}
                              <div className="reflection absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transform -translate-x-full"></div>

                              {/* Gradiente sutil superior e inferior */}
                              <div className="absolute top-0 left-0 right-0 h-[60px] bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
                              <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                            </div>
                          </div>

                          {/* Feedback visual premium para arrastre en dispositivos táctiles */}
                          {isDragging && (
                            <motion.div
                              className="absolute inset-0 border-2 rounded-[38px] z-20 pointer-events-none"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.5 }}
                              style={{
                                borderColor:
                                  screenshotsData[currentScreenshot].accent,
                              }}
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Brillo del iPhone - premium */}
                      <div className="absolute -inset-[50px] bg-gradient-to-br from-transparent via-primary/5 to-transparent rounded-full filter blur-2xl opacity-60 animate-pulse-slow transform-gpu"></div>

                      {/* Efecto de sombra premium */}
                      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[70%] h-[20px] bg-black/20 dark:bg-black/40 rounded-full blur-xl"></div>
                    </div>

                    {/* Controles de navegación - Versión Ultra Premium Profesional */}
                    <div className="absolute left-0 md:-left-10 top-1/2 -translate-y-1/2 z-20">
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                        whileHover={{
                          scale: 1.08,
                          boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevScreenshot}
                        className="navigation-arrow relative group flex"
                        aria-label="Previous screenshot"
                      >
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center">
                          {/* Fondo base de cristal con múltiples capas para mayor profundidad */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_4px_30px_rgba(0,0,0,0.15)] overflow-hidden transform transition-all duration-300">
                            {/* Primer capa de efecto de vidrio */}
                            <div className="absolute inset-[3px] rounded-full bg-white/5 dark:bg-black/40 backdrop-blur-md border border-white/10 dark:border-white/5 shadow-inner overflow-hidden"></div>

                            {/* Efecto de movimiento interno de luz */}
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                              style={{
                                background: `radial-gradient(circle at 30% center, ${screenshotsData[currentScreenshot].accent}10, transparent 70%)`,
                              }}
                            ></div>

                            {/* Efecto de iluminación de borde */}
                            <div
                              className="absolute inset-px rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                              style={{
                                boxShadow: `inset 0 0 15px ${screenshotsData[currentScreenshot].accent}40`,
                              }}
                            ></div>

                            {/* Efecto de reflejo que se mueve */}
                            <div className="absolute h-[200%] w-[200%] top-[-50%] left-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rotate-[35deg] transform-gpu opacity-0 group-hover:opacity-40 group-hover:animate-shine"></div>
                          </div>

                          {/* Resplandor exterior que sigue el color del tema */}
                          <div
                            className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 z-0"
                            style={{
                              background: `radial-gradient(circle at center, ${screenshotsData[currentScreenshot].accent}50 0%, transparent 70%)`,
                            }}
                          ></div>

                          {/* Contenedor del icono de flecha con fondo premium */}
                          <div className="relative z-10 flex items-center justify-center w-full h-full">
                            {/* Pequeño círculo de fondo para el icono */}
                            <div className="absolute inset-[28%] rounded-full bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Icono de flecha con estilo sofisticado */}
                            <ChevronLeft
                              className="w-5 h-5 md:w-6 md:h-6 text-white/80 dark:text-white/70 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] group-hover:-translate-x-0.5 transition-all duration-200"
                              style={{
                                filter:
                                  "drop-shadow(0 0 1px rgba(0, 0, 0, 0.3))",
                              }}
                            />
                          </div>
                        </div>
                      </motion.button>
                    </div>

                    <div className="absolute right-0 md:-right-10 top-1/2 -translate-y-1/2 z-20">
                      <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                        whileHover={{
                          scale: 1.08,
                          boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextScreenshot}
                        className="navigation-arrow relative group flex"
                        aria-label="Next screenshot"
                      >
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center">
                          {/* Fondo base de cristal con múltiples capas para mayor profundidad */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-white/10 via-white/5 to-transparent backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_4px_30px_rgba(0,0,0,0.15)] overflow-hidden transform transition-all duration-300">
                            {/* Primer capa de efecto de vidrio */}
                            <div className="absolute inset-[3px] rounded-full bg-white/5 dark:bg-black/40 backdrop-blur-md border border-white/10 dark:border-white/5 shadow-inner overflow-hidden"></div>

                            {/* Efecto de movimiento interno de luz */}
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                              style={{
                                background: `radial-gradient(circle at 70% center, ${screenshotsData[currentScreenshot].accent}10, transparent 70%)`,
                              }}
                            ></div>

                            {/* Efecto de iluminación de borde */}
                            <div
                              className="absolute inset-px rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                              style={{
                                boxShadow: `inset 0 0 15px ${screenshotsData[currentScreenshot].accent}40`,
                              }}
                            ></div>

                            {/* Efecto de reflejo que se mueve */}
                            <div className="absolute h-[200%] w-[200%] top-[-50%] right-0 bg-gradient-to-bl from-white/20 via-transparent to-transparent rotate-[-35deg] transform-gpu opacity-0 group-hover:opacity-40 group-hover:animate-shine-reverse"></div>
                          </div>

                          {/* Resplandor exterior que sigue el color del tema */}
                          <div
                            className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 z-0"
                            style={{
                              background: `radial-gradient(circle at center, ${screenshotsData[currentScreenshot].accent}50 0%, transparent 70%)`,
                            }}
                          ></div>

                          {/* Contenedor del icono de flecha con fondo premium */}
                          <div className="relative z-10 flex items-center justify-center w-full h-full">
                            {/* Pequeño círculo de fondo para el icono */}
                            <div className="absolute inset-[28%] rounded-full bg-gradient-to-bl from-white/10 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Icono de flecha con estilo sofisticado */}
                            <ChevronRight
                              className="w-5 h-5 md:w-6 md:h-6 text-white/80 dark:text-white/70 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] group-hover:translate-x-0.5 transition-all duration-200"
                              style={{
                                filter:
                                  "drop-shadow(0 0 1px rgba(0, 0, 0, 0.3))",
                              }}
                            />
                          </div>
                        </div>
                      </motion.button>
                    </div>

                    {/* Indicador de arrastre (mostrado solo en mobile) */}
                    <div className="absolute -bottom-8 md:hidden left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground flex items-center gap-1 opacity-50">
                      <MoveHorizontal className="w-3 h-3" />
                      <span>Desliza para navegar</span>
                    </div>
                  </div>

                  {/* Información de la captura actual - Posicionada al lado en desktop */}
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
                          style={{
                            color: screenshotsData[currentScreenshot].accent,
                          }}
                        >
                          {`${currentScreenshot + 1}/${screenshotsData.length}`}
                        </motion.span>
                        <h3
                          className="text-xl sm:text-2xl md:text-3xl font-medium mb-3 md:mb-4"
                          style={{
                            color: screenshotsData[currentScreenshot].accent,
                            textShadow: "0 2px 10px rgba(0,0,0,0.05)",
                          }}
                        >
                          {screenshotsData[currentScreenshot].title}
                        </h3>
                        <p className="text-muted-foreground mb-6 md:mb-8 text-base md:text-lg">
                          {screenshotsData[currentScreenshot].description}
                        </p>

                        {/* Indicadores de posición mejorados */}
                        <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-4 md:gap-6 mt-2 md:mt-0">
                          <div className="flex gap-2 items-center">
                            {screenshotsData.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setCurrentScreenshot(idx);
                                  resetAutoplayTimer();
                                }}
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
                                      ? screenshotsData[idx].accent
                                      : "rgba(var(--muted-foreground), 0.3)",
                                }}
                              />
                            ))}
                          </div>

                          {/* Toggle de autoplay - Diseño premium */}
                          <button
                            onClick={() => setIsAutoplay(!isAutoplay)}
                            className={cn(
                              "flex items-center gap-2 text-xs sm:text-sm backdrop-blur-md rounded-full px-4 py-1.5 transition-all",
                              isAutoplay
                                ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(var(--primary-rgb),0.2)]"
                                : "bg-white/5 text-muted-foreground border border-white/10 hover:border-primary/20 hover:text-primary hover:bg-primary/5"
                            )}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isAutoplay
                                  ? "bg-primary"
                                  : "bg-muted-foreground"
                              }`}
                            ></span>
                            {isAutoplay ? "Autoplay On" : "Autoplay Off"}
                          </button>
                        </div>

                        {/* Decoración premium */}
                        <div className="hidden md:block h-[1px] w-24 bg-gradient-to-r from-transparent via-primary/20 to-transparent mt-8 mb-6"></div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Download Section */}
          <section
            id="download"
            ref={downloadRef}
            className="py-32 bg-gradient-to-b from-background to-primary/20"
          >
            <div className="container px-4 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Ready to Take Control?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Download Moneo today and start your journey to financial
                freedom.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <PhoneIcon className="h-5 w-5" />
                  Download for iOS
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <PhoneIcon className="h-5 w-5" />
                  Download for Android
                </Button>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-muted py-12">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Moneo</span>
              </div>
              <nav className="flex flex-wrap justify-center gap-6">
                <a
                  href="#features"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Features
                </a>
                <a
                  href="#app-description"
                  className="text-sm hover:text-primary transition-colors"
                >
                  App
                </a>
                <a
                  href="#testimonials"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Testimonials
                </a>
                <a
                  href="#pricing"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Terms
                </a>
              </nav>
            </div>
            <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Moneo Finance App. All rights
              reserved.
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
