"use client";

import { useRef, useEffect, useCallback } from "react";
import { useAppData } from "@/contexts/app-data-context";
import { useHydration } from "@/hooks/use-hydration";

export function useAutoplay(intervalMs = 4000) {
  const { isAutoplay, nextScreenshot } = useAppData();
  const isMounted = useHydration();
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Función para reiniciar el temporizador de autoplay
  const resetAutoplayTimer = useCallback(() => {
    // Limpiar el temporizador existente
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }

    // Si el autoplay está activado y el componente está montado, crear un nuevo temporizador
    if (isAutoplay && isMounted) {
      autoplayTimerRef.current = setTimeout(() => {
        nextScreenshot();
      }, intervalMs);
    }
  }, [isAutoplay, isMounted, nextScreenshot, intervalMs]);

  // Configurar el autoplay y limpiar al desmontar
  useEffect(() => {
    if (!isMounted) return;
    
    // Iniciar autoplay
    resetAutoplayTimer();
    
    // Limpiar al desmontar
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [isMounted, resetAutoplayTimer]);

  return { resetAutoplayTimer };
}
