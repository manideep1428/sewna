"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AnimatedDiagonalLine from "./AnimatedDiagonalLine";

export default function DualJourney() {
  const router = useRouter();
  const [designerRipples, setDesignerRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [customerRipples, setCustomerRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleDesignerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setDesignerRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setDesignerRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 1200);
    
    // Navigate to designer registration page
    setTimeout(() => {
      router.push("/designer/register");
    }, 300);
  };

  const handleCustomerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setCustomerRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setCustomerRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 1200);
    
    // Show toast notification
    toast.success("🚧 Feature Not Built Yet", {
      description: "We're working hard to bring this feature to you. Stay tuned!",
      duration: 4000,
    });
  };

  const designerImages = [
    "/images/10.jpg",
    "/images/11.jpg",
    "/images/12.jpg",
    "/images/13.jpg",
    "/images/14.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg",
  ];

  return (
    <section id="dual-journey" className="min-h-screen relative z-10 grid grid-cols-1 lg:grid-cols-2">
      <AnimatedDiagonalLine />
      {/* Left Side - I am a designer */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-12 group cursor-pointer overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/7.jpg"
            alt="Designer at work"
            fill
            className="object-cover"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        {/* Hanging lights decoration */}
        <div className="absolute top-0 left-0 right-0 flex justify-around p-8 opacity-60">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="w-2 h-12 bg-gradient-to-b from-[#00b67f]/40 to-transparent"
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-8 tracking-wide"
          >
            I am a designer
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-md mx-auto"
          >
            Showcase your creativity and connect with clients who value independent fashion
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDesignerClick}
            className="relative group/btn px-8 py-4 rounded-full bg-white text-black font-medium flex items-center gap-3 mx-auto overflow-hidden transition-all duration-300 hover:bg-[#00b67f] hover:text-white hover:shadow-xl hover:shadow-[#00b67f]/30 cursor-pointer"
          >
            <AnimatePresence>
              {designerRipples.map((ripple) => (
                <motion.span
                  key={ripple.id}
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ 
                    scale: 4, 
                    opacity: 0
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute rounded-full"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: "40px",
                    height: "40px",
                    background: "radial-gradient(circle, rgba(0, 182, 127, 0.4) 0%, rgba(0, 182, 127, 0.2) 50%, transparent 70%)",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none"
                  }}
                />
              ))}
            </AnimatePresence>
            <span className="relative z-10 font-semibold">Join as Designer</span>
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-all duration-300 relative z-10" />
          </motion.button>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-[#00b67f]/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Right Side - I need a designer */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative min-h-screen bg-gradient-to-br from-[#e6f9f3] via-[#f0fdf9] to-[#d4f4e8] flex items-center justify-center p-12 group cursor-pointer overflow-hidden"
      >
        {/* Masonry Grid of Images */}
        <div className="absolute inset-0 p-8 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
          <div className="grid grid-cols-3 gap-3 h-full">
            {designerImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-lg overflow-hidden ${
                  idx % 3 === 0 ? "row-span-2" : "row-span-1"
                }`}
              >
                <Image
                  src={img}
                  alt={`Fashion ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif text-black mb-8 tracking-wide"
          >
            I need a designer
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-700 mb-12 max-w-md mx-auto"
          >
            Discover talented independent designers and create custom outfits that reflect your style
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCustomerClick}
            className="relative group/btn px-8 py-4 rounded-full bg-black text-white font-medium flex items-center gap-3 mx-auto overflow-hidden transition-all duration-300 hover:bg-[#00b67f] hover:shadow-xl hover:shadow-[#00b67f]/30 cursor-pointer"
          >
            <AnimatePresence>
              {customerRipples.map((ripple) => (
                <motion.span
                  key={ripple.id}
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ 
                    scale: 4, 
                    opacity: 0
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute rounded-full"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: "40px",
                    height: "40px",
                    background: "radial-gradient(circle, rgba(0, 182, 127, 0.4) 0%, rgba(0, 182, 127, 0.2) 50%, transparent 70%)",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none"
                  }}
                />
              ))}
            </AnimatePresence>
            <span className="relative z-10 font-semibold">Find a Designer</span>
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-all duration-300 relative z-10" />
          </motion.button>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 rounded-full bg-[#00b67f]/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>
    </section>
  );
}
