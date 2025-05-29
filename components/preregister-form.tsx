"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, User, Check, Sparkles } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

export default function PreregisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { trackForm, trackButtonClick } = useAnalytics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track form submission start
    trackForm("preregister", "start");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.moneo-web.com/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Error en el envío del formulario");
      }

      // Track successful submission
      trackForm("preregister", "submit");
      setIsLoading(false);
      setIsSubmitted(true);
    } catch (error) {
      // Track form error
      trackForm("preregister", "error");
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto text-center"
      >
        <div className="relative">
          {/* Success animation background */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="absolute -inset-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl"
          />

          <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl border border-green-200 dark:border-green-800 shadow-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
            >
              <Check className="h-8 w-8 text-white" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
            >
              You're In!
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-gray-600 dark:text-gray-300 mb-6"
            >
              Welcome to the exclusive Moneo waitlist! You'll be among the first
              to know when we launch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400"
            >
              <Sparkles className="h-4 w-4" />
              <span>Early access guaranteed</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form header with gradient text */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full border border-primary/20 mb-4"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Early Access
            </span>
          </motion.div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Join the Waitlist
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Be the first to experience the future of finance management
          </p>
        </div>

        {/* Input fields with enhanced styling */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative group"
          >
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleInputChange}
              className="pl-12 h-14 text-base bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary focus:ring-0 transition-all duration-200 placeholder:text-gray-400"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative group"
          >
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <Input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="pl-12 h-14 text-base bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary focus:ring-0 transition-all duration-200 placeholder:text-gray-400"
              required
            />
          </motion.div>
        </div>

        {/* Submit button with loading state */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {" "}
          <Button
            type="submit"
            disabled={isLoading || !formData.name || !formData.email}
            onClick={() =>
              trackButtonClick("preregister_submit", "preregister_form")
            }
            className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 border-0 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Joining waitlist...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Secure My Spot</span>
              </div>
            )}
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center space-y-3"
        >
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>Early access guaranteed</span>
            </div>
          </div>
        </motion.div>
      </form>

      {/* Background decoration */}
      <div className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-3xl blur-3xl -z-10" />
    </motion.div>
  );
}
