"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

// Tipos para las features
export interface Feature {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

// Tipos para las screenshots
export interface Screenshot {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
  accent: string;
}

type AppDataContextType = {
  // Datos estáticos
  features: Feature[];
  screenshots: Screenshot[];

  // Estado para screenshots
  currentScreenshot: number;
  setCurrentScreenshot: (index: number) => void;
  nextScreenshot: () => void;
  prevScreenshot: () => void;
  prevIndex: number;
  nextIndex: number;

  // Estado para autoplay
  isAutoplay: boolean;
  toggleAutoplay: () => void;

  // Estado para features
  activeFeature: number | null;
  setActiveFeature: (index: number | null) => void;
};

// Crear el contexto
const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

// Definir datos de características
const FEATURES_DATA: Feature[] = [
  {
    number: "01",
    title: "Expense Tracking",
    description:
      "Automatically categorize and track your expenses to understand where your money goes.",
    icon: React.createElement("div"), // Placeholder, se reemplazará al renderizar
    color: "from-blue-500 to-purple-500",
  },
  {
    number: "02",
    title: "Budget Planning",
    description:
      "Create custom budgets and get alerts when you're approaching your limits.",
    icon: React.createElement("div"), // Placeholder, se reemplazará al renderizar
    color: "from-green-500 to-teal-500",
  },
  {
    number: "03",
    title: "Bill Reminders",
    description:
      "Never miss a payment with automated bill reminders and scheduling.",
    icon: React.createElement("div"), // Placeholder, se reemplazará al renderizar
    color: "from-amber-500 to-orange-500",
  },
  {
    number: "04",
    title: "Secure Banking",
    description:
      "Bank-level encryption keeps your financial data safe and secure.",
    icon: React.createElement("div"), // Placeholder, se reemplazará al renderizar
    color: "from-red-500 to-pink-500",
  },
  {
    number: "05",
    title: "Investment Tracking",
    description:
      "Monitor your investments and track your portfolio performance in real-time.",
    icon: React.createElement("div"), // Placeholder, se reemplazará al renderizar
    color: "from-indigo-500 to-violet-500",
  },
];

// Definir datos de capturas de pantalla
const SCREENSHOTS_DATA: Screenshot[] = [
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
    color: "from-amber-500/20 to-orange-500/20",
    accent: "#F59E0B",
  },
  {
    id: 4,
    title: "Category management",
    description:
      "Categories help to organize income sources clearly and personalized.",
    image: "/4.jpg",
    color: "from-blue-500/20 to-cyan-500/20",
    accent: "#0EA5E9",
  },
  {
    id: 5,
    title: "Visualization of historical data",
    description: "Compare with previous months and make strategic decisions.",
    image: "/5.jpg",
    color: "from-red-500/20 to-pink-500/20",
    accent: "#E11D48",
  },
  {
    id: 6,
    title: "Editing existing records",
    description: "Fix or delete the records",
    image: "/6.jpg",
    color: "from-indigo-500/20 to-violet-500/20",
    accent: "#6366F1",
  },
];

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  // Estados para las capturas
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Estado para features
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  // Memoizado para optimizar los cálculos
  const prevIndex = useMemo(
    () =>
      (currentScreenshot - 1 + SCREENSHOTS_DATA.length) %
      SCREENSHOTS_DATA.length,
    [currentScreenshot]
  );

  const nextIndex = useMemo(
    () => (currentScreenshot + 1) % SCREENSHOTS_DATA.length,
    [currentScreenshot]
  );

  // Funciones optimizadas
  const nextScreenshot = useCallback(() => {
    setCurrentScreenshot((prev) =>
      prev === SCREENSHOTS_DATA.length - 1 ? 0 : prev + 1
    );
  }, []);

  const prevScreenshot = useCallback(() => {
    setCurrentScreenshot((prev) =>
      prev === 0 ? SCREENSHOTS_DATA.length - 1 : prev - 1
    );
  }, []);

  const toggleAutoplay = useCallback(() => {
    setIsAutoplay((prev) => !prev);
  }, []);

  // Valor del contexto
  const contextValue: AppDataContextType = {
    features: FEATURES_DATA,
    screenshots: SCREENSHOTS_DATA,
    currentScreenshot,
    setCurrentScreenshot,
    nextScreenshot,
    prevScreenshot,
    prevIndex,
    nextIndex,
    isAutoplay,
    toggleAutoplay,
    activeFeature,
    setActiveFeature,
  };

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
}

// Hook para usar el contexto
export function useAppData() {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }

  return context;
}
