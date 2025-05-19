"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ReactLenis } from "lenis/dist/lenis-react.mjs";

// Registramos los plugins de GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AppDescription() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const featureListRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  // Configuración del smooth scroll con Lenis
  const lenisOptions = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
  };

  useEffect(() => {
    // No ejecutamos animaciones durante SSR
    if (!sectionRef.current) return;

    // Dividimos el título en caracteres para animar cada uno
    // Verificamos que titleRef.current no sea null antes de usarlo
    if (!titleRef.current) return;

    const splitTitle = new SplitType(titleRef.current, { types: "chars" });
    const chars = splitTitle.chars;

    // Timeline principal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom-=100",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    });

    // Animamos la etiqueta destacada
    tl.fromTo(
      tagRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0
    );

    // Animamos los caracteres del título
    tl.fromTo(
      chars,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "power3.out",
      },
      0.2
    );

    // Animamos la descripción
    tl.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.6
    );

    // Animamos cada elemento de la lista
    if (featureListRef.current) {
      gsap.fromTo(
        featureListRef.current.children,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featureListRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Animamos el botón CTA
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      0.8
    );

    // Animación del teléfono
    gsap.fromTo(
      phoneRef.current,
      {
        opacity: 0,
        y: 60,
        rotationY: -15,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      }
    );

    // Efecto parallax para el teléfono
    gsap.to(phoneRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Limpieza de ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <ReactLenis root options={lenisOptions}>
      <section
        ref={sectionRef}
        className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      >
        {/* Fondo mejorado con degradados múltiples */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.08),transparent_70%)]" />

        {/* Patrón sutil de fondo */}
        <div className="absolute inset-0 bg-[url(/grain.svg)] opacity-[0.02] mix-blend-overlay" />

        {/* Elementos decorativos flotantes - rediseñados para mejor distribución */}
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-primary/5 blur-[100px] opacity-80 animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-[5%] w-80 h-80 rounded-full bg-primary/8 blur-[120px] opacity-60 animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 right-[15%] w-20 h-20 rounded-full bg-primary/5 blur-xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
            {/* Columna de contenido - ajustada para mejor flujo de lectura */}
            <div className="w-full lg:w-1/2 space-y-8">
              {/* Etiqueta destacada - mejorada visualmente */}
              <div
                ref={tagRef}
                className="inline-flex items-center px-5 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm text-sm text-primary font-medium shadow-sm"
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                New Financial Experience
              </div>

              {/* Título principal - corregido para que sea visible */}
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
                <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                  Simplify your financial life
                </span>
              </h2>

              {/* Descripción - mejor espaciado y límite de ancho */}
              <p
                ref={descriptionRef}
                className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed"
              >
                Moneo helps you manage your finances with intuitive tools to
                manage expenses, savings, and investments all in one place,
                transforming the way you handle your money.
              </p>

              {/* Lista de características - añadida para mejor distribución visual */}
              <ul
                ref={featureListRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm"
              >
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  <span>Expense control</span>
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  <span>Report generator</span>
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  <span>Advanced statistics</span>
                </li>
              </ul>
            </div>

            {/* Columna del banner - reemplazando el teléfono */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-center">
              <div className="relative w-full mt-10 lg:mt-0" ref={phoneRef}>
                {/* Elementos decorativos alrededor del banner */}
                <div className="absolute -top-12 -right-6 w-24 h-24 rounded-full bg-primary/10 blur-xl animate-pulse-slow" />
                <div
                  className="absolute bottom-20 -left-10 w-16 h-16 rounded-full bg-primary/10 blur-xl animate-pulse-slow"
                  style={{ animationDelay: "1.5s" }}
                />

                {/* Efecto de luz ambiental mejorado */}
                <div className="absolute -inset-10 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 blur-3xl opacity-50 rounded-full" />

                {/* Banner con sombra y efectos */}
                <div className="relative w-full overflow-hidden rounded-xl shadow-xl transform hover:scale-[1.02] transition-all duration-700 ease-out">
                  {/* Borde con brillo */}
                  <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none z-10" />

                  {/* Imagen del banner */}
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src="/moneo_banner.jpg" /* Asegúrate de tener esta imagen en la carpeta public */
                      alt="Moneo App Banner"
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                      priority
                      quality={100}
                    />

                    {/* Efectos visuales sobre la imagen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-white/10 to-transparent opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[url('/grain.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

                    {/* Capa de información sobre la imagen */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-white text-sm md:text-base font-medium mb-2">
                        Stop using spreadsheets
                      </p>
                      <h3 className="text-white text-lg md:text-xl font-bold">
                        Your finances at your fingertips
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Efecto de resplandor inferior */}
                <div className="absolute -bottom-4 left-1/2 w-[80%] h-6 bg-primary/20 blur-xl rounded-full -translate-x-1/2" />
              </div>
            </div>
          </div>
        </div>
        {/* Círculos decorativos en la parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-12 flex justify-center space-x-3 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              style={{
                animationDelay: `${i * 0.2}s`,
                animation: "bounce 2s infinite",
              }}
            />
          ))}
        </div>
        {/* Estilos para las animaciones */}
        <style jsx global>{`
          @keyframes bounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes pulse-slow {
            0%,
            100% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 0.2;
              transform: scale(1.05);
            }
          }

          .animate-pulse-slow {
            animation: pulse-slow 6s ease-in-out infinite;
          }

          .perspective-1000 {
            perspective: 1000px;
          }
        `}</style>
      </section>
    </ReactLenis>
  );
}
