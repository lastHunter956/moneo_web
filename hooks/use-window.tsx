"use client";

import { useState, useEffect } from "react";

// Hook para manejar la disponibilidad del objeto window
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

// Hook para manejar el redimensionamiento de la ventana de manera segura
export function useWindowResize(callback: () => void) {
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;

    // Ejecutar callback inicial
    callback();

    // Configurar listener
    window.addEventListener("resize", callback);

    // Limpiar listener
    return () => {
      window.removeEventListener("resize", callback);
    };
  }, [isClient, callback]);
}

// Hook para obtener las dimensiones de la ventana de manera segura
export function useWindowSize() {
  const isClient = useIsClient();
  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : 1024,
    height: isClient ? window.innerHeight : 768,
  });

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Configurar para el tamaño inicial
    handleResize();

    // Añadir listener para cambios
    window.addEventListener("resize", handleResize);

    // Limpiar listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  return windowSize;
}

// Función utilitaria para acceder de forma segura a window
export function safeWindow<T>(callback: (w: Window) => T, fallback: T): T {
  if (typeof window !== "undefined") {
    return callback(window);
  }
  return fallback;
}
