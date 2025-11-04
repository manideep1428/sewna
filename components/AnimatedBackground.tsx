"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const words = ["sewna", "sewna"];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated cursive text lines */}
      <div className="absolute inset-0">
        {words.map((word, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 0.4, x: 0 }}
            transition={{ 
              duration: 2, 
              delay: index * 0.4,
              ease: "easeOut"
            }}
            className="absolute"
            style={{
              top: `${15 + index * 18}%`,
              left: `${-5 + (index % 2) * 10}%`,
              transform: `rotate(${-2 + (index % 2) * 2}deg)`,
            }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.5, delay: index * 0.3 }}
              className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-serif italic whitespace-nowrap select-none"
              style={{
                fontFamily: "'Brush Script MT', cursive",
                color: "rgba(0, 182, 127, 0.35)",
                WebkitTextStroke: "1.5px rgba(0, 182, 127, 0.25)",
              }}
            >
              {word}
            </motion.p>
          </motion.div>
        ))}
      </div>

      {/* Pencil stroke SVG animations */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="pencilTexture">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {/* Curved pencil strokes */}
        {[0, 1, 2, 3].map((i) => (
          <motion.path
            key={`stroke-${i}`}
            d={`M ${50 + i * 200} ${100 + i * 150} Q ${150 + i * 200} ${150 + i * 150}, ${250 + i * 200} ${120 + i * 150}`}
            stroke="rgba(0, 182, 127, 0.15)"
            strokeWidth="4"
            fill="none"
            filter="url(#pencilTexture)"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{
              pathLength: { delay: i * 0.3, duration: 2.5 },
              opacity: { delay: i * 0.3, duration: 0.3 },
            }}
          />
        ))}

        {/* Additional decorative strokes */}
        {[0, 1, 2].map((i) => (
          <motion.path
            key={`curve-${i}`}
            d={`M ${100 + i * 300} ${200 + i * 100} C ${200 + i * 300} ${180 + i * 100}, ${300 + i * 300} ${250 + i * 100}, ${400 + i * 300} ${220 + i * 100}`}
            stroke="rgba(0, 182, 127, 0.12)"
            strokeWidth="3"
            fill="none"
            filter="url(#pencilTexture)"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.15 }}
            transition={{
              pathLength: { delay: (i + 1) * 0.3, duration: 2.5 },
              opacity: { delay: (i + 1) * 0.3, duration: 0.3 },
            }}
          />
        ))}
      </svg>

      {/* Floating cursive sewna text with different positions */}
      <div className="absolute bottom-[10%] left-[10%]">
        <motion.p
          initial={{ opacity: 0, rotate: 8, scale: 0.8 }}
          animate={{ opacity: 0.35, rotate: 5, scale: 1 }}
          transition={{ duration: 3, delay: 2 }}
          className="text-[9rem] md:text-[13rem] font-serif italic select-none"
          style={{
            fontFamily: "'Brush Script MT', cursive",
            color: "rgba(0, 182, 127, 0.35)",
          }}
        >
          sewna
        </motion.p>
      </div>
    </div>
  );
}
