"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import AnimatedDiagonalLine from "./AnimatedDiagonalLine";

export default function ImageCarousel() {
  const images = [
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg",
    "/images/7.jpg",
    "/images/8.jpg",
    "/images/9.jpg",
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when reaching halfway point (since we duplicate images)
      if (scrollPosition >= scrollContainer.scrollHeight / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollTop = scrollPosition;
      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="w-full py-20 overflow-hidden relative z-10">
      {/* Theme background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf9] via-[#e6f9f3] to-[#d4f4e8]" />
      <AnimatedDiagonalLine />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-4">
          Our Gallery
        </h2>
        <p className="text-lg text-black/60">Discover the beauty within</p>
      </motion.div>

      {/* Diagonal scattered gallery with 3D perspective */}
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        <div 
          ref={scrollRef}
          className="relative w-full h-full overflow-hidden"
          style={{ perspective: '1500px' }}
        >
          <div className="relative w-full">
            {/* Duplicate images for infinite scroll */}
            {[...images, ...images].map((img, idx) => {
              // Scattered diagonal positions like the reference
              const positions = [
                { top: 0, left: '5%', width: 200, height: 280, rotate: -8 },
                { top: 50, left: '25%', width: 180, height: 260, rotate: 5 },
                { top: 100, left: '50%', width: 220, height: 300, rotate: -3 },
                { top: 150, left: '70%', width: 190, height: 270, rotate: 7 },
                { top: 250, left: '10%', width: 210, height: 290, rotate: -5 },
                { top: 300, left: '35%', width: 200, height: 280, rotate: 4 },
                { top: 350, left: '60%', width: 180, height: 260, rotate: -6 },
                { top: 450, left: '15%', width: 220, height: 300, rotate: 3 },
              ];
              
              const position = positions[idx % positions.length];
              const offsetTop = Math.floor(idx / positions.length) * 550;
              
              return (
                <div
                  key={idx}
                  className="absolute transition-transform duration-300 hover:scale-105"
                  style={{
                    top: `${position.top + offsetTop}px`,
                    left: position.left,
                    transform: `rotate(${position.rotate}deg) rotateY(${position.rotate * 0.5}deg)`,
                    transformStyle: 'preserve-3d',
                    zIndex: 20 - (idx % positions.length),
                  }}
                >
                  <div 
                    className="relative rounded-lg overflow-hidden shadow-2xl bg-white p-2"
                    style={{
                      width: `${position.width}px`,
                      height: `${position.height}px`,
                    }}
                  >
                    <div className="relative w-full h-full rounded-md overflow-hidden">
                      <Image
                        src={img}
                        alt={`Gallery ${idx}`}
                        fill
                        className="object-cover"
                        sizes="250px"
                        priority={idx < 4}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
