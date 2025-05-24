"use client"

import { useState, useEffect } from 'react';

// Hook para manejar valores seguros para servidor/cliente
export function useClientOnly<T>(serverDefault: T, clientValue: () => T): T {
  const [value, setValue] = useState<T>(serverDefault);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setValue(clientValue());
  }, [clientValue]);

  return hasMounted ? value : serverDefault;
}

// Hook para valores aleatorios seguros
export function useRandomValues(count: number, min: number, max: number): number[] {
  return useClientOnly<number[]>(
    // Valores predeterminados para el renderizado en servidor
    Array(count).fill(min),
    // Valores aleatorios generados sólo en el cliente
    () => Array(count).fill(0).map(() => Math.floor(Math.random() * (max - min)) + min)
  );
}

// Hook para determinar el tamaño de la ventana de forma segura
export function useWindowSize() {
  return useClientOnly(
    { width: 1024, height: 768 }, // Valores predeterminados
    () => ({
      width: window.innerWidth,
      height: window.innerHeight
    })
  );
}
