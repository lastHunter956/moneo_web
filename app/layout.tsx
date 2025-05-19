import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
import "./globals.css"

export const metadata: Metadata = {
  title: "Moneo - Personal Finance App",
  description:
    "Take control of your finances with Moneo, the all-in-one personal finance app that helps you track, save, and grow your money.",
  keywords: ["finance app", "personal finance", "money management", "budget app", "expense tracker"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://moneo-finance.com",
    title: "Moneo - Personal Finance App",
    description: "Take control of your finances with Moneo, the all-in-one personal finance app.",
    siteName: "Moneo Finance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moneo - Personal Finance App",
    description: "Take control of your finances with Moneo, the all-in-one personal finance app.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
