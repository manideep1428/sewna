"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import AnimatedDiagonalLine from "./AnimatedDiagonalLine";

export default function Hero() {
  const sectionRef = useRef(null);
  
  // Track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Image transformations - zoom, fade, move up
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.8, 2.5]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.6, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  
  // Left text transformations - slide and fade
  const leftTextX = useTransform(scrollYProgress, [0, 0.8], [0, -150]);
  const leftTextOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const leftTextRotate = useTransform(scrollYProgress, [0, 1], [0, -10]);
  
  // Right text transformations - slide and fade
  const rightTextX = useTransform(scrollYProgress, [0, 0.8], [0, 150]);
  const rightTextOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const rightTextRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  
  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-24 relative z-10 bg-gradient-to-br from-[#f0fdf9] via-[#e6f9f3] to-[#d4f4e8]">
      <AnimatedDiagonalLine />
      <div className="max-w-[1800px] w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left Text - with scroll animations */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            x: leftTextX,
            opacity: leftTextOpacity,
            rotate: leftTextRotate
          }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-2"
        >
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-black tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            THE BEST
          </motion.h2>
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-black tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            VERSION
          </motion.h2>
        </motion.div>

        {/* Center Image - with intense scroll zoom, fade, and rotate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ 
            scale: imageScale,
            opacity: imageOpacity,
            y: imageY,
            rotate: imageRotate
          }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative aspect-[3/4] max-w-md mx-auto w-full rounded-2xl overflow-hidden shadow-2xl"
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.5])
            }}
          />
          <Image
            src="/images/1.jpg"
            alt="Hero"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>

        {/* Right Text - with scroll animations */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            x: rightTextX,
            opacity: rightTextOpacity,
            rotate: rightTextRotate
          }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2"
        >
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-black tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            OF
          </motion.h2>
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-black tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            YOURSELF
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
}
