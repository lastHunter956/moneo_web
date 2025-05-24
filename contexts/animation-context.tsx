"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "@studio-freight/lenis";

// Registrar plugins de GSAP solo en el cliente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

type AnimationContextType = {
  lenis: Lenis | null;
  scrollTo: (target: HTMLElement | string, options?: any) => void;
  isReady: boolean;
  isMounted: boolean;
};

const AnimationContext = createContext<AnimationContextType>({
  lenis: null,
  scrollTo: () => {},
  isReady: false,
  isMounted: false,
});

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const providerGsapCtx = useRef<gsap.Context | null>(null);

  // Efecto para marcar como montado
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Inicializar Lenis y configurar animaciones
  useEffect(() => {
    if (!isMounted) {
      return;
    }

    providerGsapCtx.current?.revert();

    providerGsapCtx.current = gsap.context(() => {
      let lenisInstance: Lenis | null = null;
      try {
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          touchMultiplier: 1.5,
          wheelMultiplier: 1.0,
        });
        setLenis(lenisInstance);

        const raf = (time: number) => {
          lenisInstance?.raf(time);
          requestAnimationFrame(raf);
        };
        const rafId = requestAnimationFrame(raf);

        setIsReady(true);

        return () => {
          cancelAnimationFrame(rafId);
          lenisInstance?.destroy();
        };
      } catch (error) {
        console.warn("Error initializing Lenis in AnimationProvider:", error);
        lenisInstance?.destroy();
        setLenis(null);
        setIsReady(false);
        return;
      }
    });

    return () => {
      providerGsapCtx.current?.revert();
      setLenis(null);
      setIsReady(false);
    };
  }, [isMounted]);

  const scrollTo = useCallback(
    (target: HTMLElement | string, options?: any) => {
      if (lenis && isReady) {
        lenis.scrollTo(target, options);
      } else if (typeof window !== "undefined") {
        const element =
          typeof target === "string" ? document.querySelector(target) : target;
        if (element instanceof HTMLElement) {
          element.scrollIntoView({ behavior: "smooth", ...options });
        }
      }
    },
    [lenis, isReady]
  );

  const contextValue = useMemo(
    () => ({
      lenis,
      scrollTo,
      isReady,
      isMounted,
    }),
    [lenis, scrollTo, isReady, isMounted]
  );

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
}

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
