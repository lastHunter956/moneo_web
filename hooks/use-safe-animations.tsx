"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

// Hook para animaciones seguras que evita errores de hidratación
export function useSafeGSAPAnimation() {
  const [isMounted, setIsMounted] = useState(false);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    setIsMounted(true);

    // Limpieza de la animación al desmontar
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  // Función segura para crear animaciones solo en el cliente
  const createAnimation = (
    callback: (timeline: gsap.core.Timeline) => void
  ) => {
    if (!isMounted) return;

    // Crear una nueva timeline de GSAP
    const tl = gsap.timeline();
    animationRef.current = tl;

    // Ejecutar el callback con la timeline
    callback(tl);

    return tl;
  };

  // Función para obtener un valor determinista para SSR y luego aleatorio en cliente
  const getSafeRandomValue = (
    min: number,
    max: number,
    index: number,
    seed: number = 123
  ): number => {
    if (!isMounted) {
      // Valor determinista para SSR basado en índice
      return min + ((index * seed) % (max - min));
    }

    // Valor aleatorio en el cliente
    return min + Math.random() * (max - min);
  };

  // Configurar elementos flotantes de manera segura
  const setupFloatingElements = (
    elements: NodeListOf<Element> | Element[],
    options = { intensity: 1, duration: 1 }
  ) => {
    if (!isMounted || elements.length === 0) return;

    Array.from(elements).forEach((el, i) => {
      // Valores seguros iniciales
      const initialX = getSafeRandomValue(-50, 50, i) * options.intensity;
      const initialY = getSafeRandomValue(-50, 50, i + 10) * options.intensity;
      const initialScale = getSafeRandomValue(0.8, 1.2, i + 20);
      const initialRotation = getSafeRandomValue(0, 360, i + 30);
      const animDuration =
        getSafeRandomValue(15, 30, i + 40) * options.duration;

      gsap.set(el, {
        x: initialX,
        y: initialY,
        scale: initialScale,
        rotation: initialRotation,
        opacity: 0.6,
      });

      gsap.to(el, {
        x: initialX * -1, // Movimiento en dirección opuesta
        y: initialY * -1,
        rotation: initialRotation + 180,
        duration: animDuration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  };

  return {
    isMounted,
    createAnimation,
    getSafeRandomValue,
    setupFloatingElements,
  };
}
