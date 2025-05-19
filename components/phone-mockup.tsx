"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface PhoneMockupProps {
  scale?: number;
}

export default function PhoneMockup({ scale = 1 }: PhoneMockupProps) {
  const phoneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: phoneRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 8]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);

  return (
    <motion.div
      ref={phoneRef}
      className="relative mx-auto"
      style={{
        y,
        rotate,
        scale: phoneScale,
        width: `${280 * scale}px`,
        height: `${580 * scale}px`,
      }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      {/* Luz ambiental externa */}
      <div
        className="absolute -inset-6 bg-gradient-to-tr from-primary/20 via-transparent to-purple-500/20 blur-2xl rounded-[48px] opacity-60 -z-10"
        style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
      />

      {/* Sombra del teléfono */}
      <div
        className="absolute -bottom-6 left-1/2 w-2/3 h-6 bg-black/30 blur-2xl rounded-full z-0"
        style={{ transform: "translateX(-50%)" }}
      />

      {/* Cuerpo del teléfono */}
      <div className="absolute inset-0 rounded-[40px] bg-black shadow-xl overflow-hidden border-[3px] border-gray-800 z-10">
        {/* Borde brillante */}
        <div className="absolute inset-0 rounded-[38px] border border-white/10 pointer-events-none z-10" />

        {/* Notch superior */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-black flex justify-center items-end pb-1 z-10">
          <div className="w-[30%] h-[80%] bg-black rounded-b-xl"></div>
        </div>

        {/* Barra inferior */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center z-10">
          <div className="w-[30%] h-1 bg-gray-700 rounded-full"></div>
        </div>

        {/* Pantalla de la app */}
        <div className="absolute inset-0 overflow-hidden pt-6">
          <Image
            src="/placeholder.svg?height=580&width=280&text=Moneo+App"
            alt="Moneo App"
            width={280}
            height={580}
            className="w-full h-full object-cover"
            priority
          />

          {/* Brillo diagonal */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-white/10 to-transparent opacity-60 pointer-events-none" />

          {/* Reflejo con máscara */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-30 transform -skew-y-12 pointer-events-none"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black, transparent)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
