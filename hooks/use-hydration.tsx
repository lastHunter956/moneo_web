"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Hook central para manejar la hidratación
 * Unifica la lógica de varios hooks en uno solo para evitar redundancias
 */
export function useHydration() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Verificar que estamos en el cliente y que el DOM está listo
    if (typeof window !== "undefined") {
      // Usar requestAnimationFrame para asegurar que el DOM está completamente renderizado
      const raf = requestAnimationFrame(() => {
        setIsMounted(true);
      });

      return () => {
        cancelAnimationFrame(raf);
        setIsMounted(false);
      };
    }
  }, []);

  return isMounted;
}

/**
 * Hook para manejar valores seguros en SSR
 * @param serverValue Valor a mostrar durante SSR
 * @param clientValue Valor a mostrar en el cliente
 */
export function useHydrationSafeValue<T>(serverValue: T, clientValue: T): T {
  const isMounted = useHydration();
  return isMounted ? clientValue : serverValue;
}

/**
 * Hook para obtener las dimensiones de la ventana de manera segura
 * Maneja dimensiones de ventana con valores predeterminados para SSR
 */
export function useWindowSize() {
  const isMounted = useHydration();
  const [windowSize, setWindowSize] = useState({
    width: 1024, // valor predeterminado para SSR
    height: 768, // valor predeterminado para SSR
  });

  useEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Configurar dimensiones iniciales
    handleResize();

    // Suscribirse a cambios de tamaño
    window.addEventListener("resize", handleResize);

    // Limpiar suscripción
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMounted]);

  return windowSize;
}

/**
 * Hook para manejar media queries de forma segura con SSR
 * @param query Media query a comprobar (por ejemplo: '(max-width: 768px)')
 * @param defaultValue Valor predeterminado para SSR
 */
export function useMediaQuery(query: string, defaultValue = false) {
  const isMounted = useHydration();
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    if (!isMounted) return;

    const mediaQuery = window.matchMedia(query);
    const handleMediaQueryChange = () => {
      setMatches(mediaQuery.matches);
    };

    // Configurar valor inicial
    handleMediaQueryChange();

    // Algunos navegadores usan 'addListener' y 'removeListener'
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaQueryChange);
      return () =>
        mediaQuery.removeEventListener("change", handleMediaQueryChange);
    } else {
      // Navegadores antiguos (IE)
      mediaQuery.addListener(handleMediaQueryChange);
      return () => mediaQuery.removeListener(handleMediaQueryChange);
    }
  }, [query, isMounted]);

  return matches;
}

/**
 * Hook para ejecutar código solo en el cliente
 * @param callback Función a ejecutar solo en el cliente
 */
export function useClientEffect(
  callback: () => (() => void) | void,
  deps: any[] = []
) {
  const isMounted = useHydration();

  useEffect(() => {
    if (!isMounted) return;
    return callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, ...deps]);
}
