"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  quote: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Small Business Owner",
    company: "Craft & Co.",
    quote:
      "Moneo has completely transformed how I manage my business finances. The expense tracking and budget planning features have saved me hours of work each month.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    company: "TechVision",
    quote:
      "As someone who loves data, I appreciate how Moneo visualizes my spending patterns. The investment tracking feature has helped me make smarter decisions with my portfolio.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Freelance Designer",
    company: "Studio AP",
    quote:
      "The bill reminder feature has saved me from late payments countless times. Moneo gives me peace of mind knowing my finances are organized in one secure place.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Marketing Director",
    company: "Brand Forward",
    quote:
      "I've tried many finance apps, but Moneo stands out with its intuitive interface and powerful features. It's helped me save more and spend smarter.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const progressAnimationRef = useRef<gsap.core.Tween | null>(null)

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  // Reset progress bar when testimonial changes
  useEffect(() => {
    if (progressRef.current && progressAnimationRef.current) {
      progressAnimationRef.current.kill()
      gsap.set(progressRef.current, { width: "0%" })
      progressAnimationRef.current = gsap.to(progressRef.current, {
        width: "100%",
        duration: 8,
        ease: "none",
      })
    }
  }, [currentIndex])

  // GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )
    }

    // Animate progress bar
    if (progressRef.current) {
      progressAnimationRef.current = gsap.to(progressRef.current, {
        width: "100%",
        duration: 8,
        ease: "none",
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      if (progressAnimationRef.current) {
        progressAnimationRef.current.kill()
      }
    }
  }, [])

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section className="py-32 relative overflow-hidden bg-[#f8f5f5] dark:bg-[#0f0f0f]">
      <div className="container px-4 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-black dark:text-white">What Our Users</span>{" "}
          <span className="text-gray-400">Are Saying</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join thousands of satisfied customers who have transformed their financial lives with Moneo.
        </p>
      </div>

      <div ref={containerRef} className="container px-4 relative">
        <div className="relative max-w-4xl mx-auto">
          {/* Large quote icon */}
          <div className="absolute -top-16 -left-8 md:-left-16 text-primary/10 z-0">
            <Quote size={120} strokeWidth={1} />
          </div>

          {/* Testimonial carousel */}
          <div className="relative min-h-[300px] md:min-h-[250px] z-10">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full"
              >
                <div className="bg-white dark:bg-[#111] p-8 md:p-12 rounded-xl shadow-lg">
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 italic">
                    "{testimonials[currentIndex].quote}"
                  </p>

                  <div className="flex items-center">
                    <div className="mr-4 rounded-full overflow-hidden w-16 h-16 border-2 border-primary/20">
                      <Image
                        src={testimonials[currentIndex].image || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-black dark:text-white">{testimonials[currentIndex].name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-between items-center mt-8">
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentIndex ? "bg-primary w-8" : "bg-gray-300 dark:bg-gray-700 hover:bg-primary/50",
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 mt-8 rounded-full overflow-hidden">
            <div ref={progressRef} className="h-full bg-primary" style={{ width: "0%" }}></div>
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-10 w-32 h-32 bg-pink-300/10 rounded-full blur-2xl -z-10"></div>
      </div>
    </section>
  )
}
