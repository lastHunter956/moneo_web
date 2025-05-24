import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimationProvider } from "@/contexts/animation-context";
import { AppDataProvider } from "@/contexts/app-data-context";
import { HydrationProvider } from "@/contexts/hydration-context";
import AnalyticsWrapper from "@/components/analytics/analytics-wrapper";
import GoogleTagManager from "@/components/analytics/google-tag-manager";

const inter = Inter({ subsets: ["latin"] });
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Moneo - Best Personal Finance App 2025 | Budget Tracker & Money Management",
  description:
    "Moneo - The ultimate personal finance app for 2025. Track expenses, manage budgets, and grow your wealth with adaptive interface, automatic balance calculations, and real-time statistics. Features account transfers, expense categorization, interactive charts, and offline local storage.",
  keywords: [
    // Primary Keywords (English)
    "personal finance app",
    "budget tracker app",
    "expense tracker",
    "money management app",
    "financial planning tool",
    "finance tracking software",
    "personal budget planner",
    "expense management app",

    // Long Tail Keywords (English)
    "best personal finance app 2025",
    "free expense tracking app offline",
    "budget app with automatic calculations",
    "money management app local storage",
    "personal finance tracker statistics",
    "expense categorization app charts",
    "financial planning app transfers",
    "adaptive interface finance app",
    "accounting balance calculator app",
    "real time budget tracking app",

    // Primary Keywords (Spanish)
    "app finanzas personales",
    "aplicación control gastos",
    "app gestión dinero",
    "presupuesto personal app",
    "control de gastos",
    "planificación financiera",
    "administración dinero",
    "gestor gastos personal",

    // Long Tail Keywords (Spanish)
    "mejor app finanzas personales 2025",
    "aplicación control gastos gratis",
    "app gestión dinero sin internet",
    "presupuesto automático calculadora",
    "control gastos con estadísticas",
    "app finanzas transferencias cuentas",
    "interfaz adaptable finanzas",
    "balance contable tiempo real",
    "categorizador gastos automático",
    "planificador financiero gráficos",

    // Technical Keywords
    "Next.js finance app",
    "React personal finance dashboard",
    "TypeScript money management",
    "PWA financial tracker",
    "responsive finance interface",
    "GSAP animated finance app",
    "Framer Motion finance UI",
    "shadcn/ui finance components",
    "Tailwind CSS finance app",
    "local storage finance data",

    // Competitive Keywords
    "mint alternative",
    "YNAB alternative",
    "personal capital alternative",
    "quicken alternative",
    "better than mint app",
    "PocketGuard alternative",
    "Goodbudget competitor",
    "Spendee alternative",

    // Feature-based Keywords
    "automatic balance calculation",
    "account transfer tracking",
    "expense income categorization",
    "financial data visualization",
    "offline money tracking",
    "interactive financial charts",
    "budget planning tools",
    "expense reporting software",

    // Action Keywords
    "track expenses online",
    "manage money better",
    "control personal budget",
    "plan financial future",
    "organize finances",
    "save money app",
    "wealth management tool",
    "financial goal tracker",
  ],
  authors: [{ name: "Moneo Team" }],
  creator: "Moneo Finance",
  publisher: "Moneo",
  category: "Finance",
  classification: "Personal Finance Management",

  icons: {
    icon: "/icono.png",
    shortcut: "/icono.png",
    apple: "/icono.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES", "es_MX", "es_AR"],
    url: "https://moneo-web.com",
    title:
      "Moneo - Best Personal Finance App 2025 | Budget Tracker & Money Management",
    description:
      "Take control of your finances with Moneo, the most advanced personal finance app. Features adaptive interface, automatic calculations, statistics, and offline storage.",
    siteName: "Moneo Finance",
    images: [
      {
        url: "/moneo_banner.jpg",
        width: 1200,
        height: 630,
        alt: "Moneo Personal Finance App Dashboard",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@MoneoFinance",
    creator: "@MoneoApp",
    title: "Moneo - Best Personal Finance App 2025",
    description:
      "Advanced money management with adaptive interface, statistics, and offline storage. Track expenses, manage budgets, and grow your wealth.",
    images: ["/moneo_banner.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
      </head>
      <body className={inter.className}>
        <GoogleTagManager noscript />
        <HydrationProvider>
          <ThemeProvider defaultTheme="dark" attribute="class">
            <AppDataProvider>
              <AnimationProvider>
                {children}
                <AnalyticsWrapper />
              </AnimationProvider>
            </AppDataProvider>
          </ThemeProvider>
        </HydrationProvider>
      </body>
    </html>
  );
}
