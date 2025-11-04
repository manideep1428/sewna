"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const scrollToJoin = () => {
    const dualJourneySection = document.getElementById('dual-journey');
    if (dualJourneySection) {
      dualJourneySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 1000);
    
    scrollToJoin();
  };
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed h-[10px] top-0 left-0 right-0 z-50 px-6 py-1 md:px-12 md:py-1.5 bg-[#f0fdf9]/90 backdrop-blur-sm border-b border-[#00b67f]/10"
    >
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Join Button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ backgroundColor: "#00a070", scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="relative flex items-center gap-2 px-6 py-2 rounded-full text-white font-medium shadow-lg hover:shadow-xl overflow-hidden"
          style={{ backgroundColor: "#00b67f" }}
        >
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute rounded-full"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: "20px",
                  height: "20px",
                  backgroundColor: "rgba(0, 255, 150, 0.5)",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                  filter: "blur(4px)"
                }}
              />
            ))}
          </AnimatePresence>
          <span className="relative z-10">Join</span>
          <ArrowRight className="w-4 h-4 relative z-10" />
        </motion.button>
      </div>
    </motion.header>
  );
}
