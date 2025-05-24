"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "lucide-react";
import TestimonialsSection from "@/components/testimonials-section";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import AppDescription from "@/components/app-description";
import PreregisterForm from "@/components/preregister-form";
import ScreenshotsCarousel from "@/components/screenshots-carousel";

export default function Home() {
  // Refs for sections
  const downloadRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Scroll animation
  const { scrollYProgress } = useScroll();
  // Scroll functions
  const scrollToPreregister = () => {
    if (downloadRef.current) {
      downloadRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="relative">
      <Header />

      <main>
        {/* Hero Section */}{" "}
        <HeroSection
          scrollProgress={scrollYProgress}
          scrollToDownload={scrollToPreregister}
          scrollToFeatures={scrollToFeatures}
        />
        {/* Features Section */}
        <section id="features" ref={featuresRef}>
          <FeaturesSection />
        </section>
        {/* App Description Section */}
        <section
          id="app-description"
          className="py-32 relative overflow-hidden bg-background"
        >
          <AppDescription />
        </section>
        {/* Testimonials Section */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        {/* App Screenshots Section */}
        <section
          id="screenshots"
          className="py-20 md:py-40 relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.04),transparent_70%)]"></div>

          {/* Section header */}
          <div className="container px-4 mb-10 md:mb-20 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
                <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                  Beautiful Interface
                </span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
                Designed for clarity and ease of use, Moneo makes finance
                management simple.
              </p>
            </motion.div>
          </div>

          <ScreenshotsCarousel />
        </section>{" "}
        {/* Pre-registration Section */}
        <section
          id="preregister"
          ref={downloadRef}
          className="py-32 relative overflow-hidden"
        >
          {/* Background with gradient and effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(var(--primary-rgb),0.1),transparent_70%)]" />

          <div className="container px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Section header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                  <span className="text-foreground">Ready to Take</span>{" "}
                  <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                    Control?
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                  Join the exclusive waitlist and be among the first to
                  experience the future of personal finance management.
                </p>
              </motion.div>

              {/* Pre-register form */}
              <PreregisterForm />
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-40" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse opacity-30"
            style={{ animationDelay: "2s" }}
          />
        </section>
      </main>

      <footer className="bg-muted py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <img
                src="/icono.png"
                alt="Moneo Logo"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-lg font-bold">Moneo</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-6">
              <a
                href="#features"
                className="text-sm hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#app-description"
                className="text-sm hover:text-primary transition-colors"
              >
                App
              </a>
              <a
                href="#testimonials"
                className="text-sm hover:text-primary transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#screenshots"
                className="text-sm hover:text-primary transition-colors"
              >
                Screenshots
              </a>
              <a
                href="#"
                className="text-sm hover:text-primary transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm hover:text-primary transition-colors"
              >
                Terms
              </a>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Moneo Finance App. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
