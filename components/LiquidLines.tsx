"use client";

import { motion } from "framer-motion";

export default function LiquidLines() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Pencil texture filter */}
          <filter id="liquidPencilTexture">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated "sewna" text - Writing animation effect - ONE BIG */}
        
        {/* Single HUGE sewna - ONE LINE ONLY - WRITING effect - FILLED */}
        <motion.text
          x="50%"
          y="50%"
          fontSize="clamp(180px, 35vw, 800px)"
          fontFamily="'Allura', 'Dancing Script', 'Great Vibes', 'Pacifico', cursive"
          fontStyle="italic"
          fontWeight="400"
          fill="rgba(0, 182, 127, 0.5)"
          stroke="rgba(0, 182, 127, 0.7)"
          strokeWidth="2"
          filter="url(#liquidPencilTexture)"
          textAnchor="middle"
          dominantBaseline="middle"
          letterSpacing="0.1em"
          initial={{ 
            strokeDasharray: "5000",
            strokeDashoffset: "5000",
            opacity: 0
          }}
          animate={{ 
            strokeDashoffset: [5000, 0, 0, 5000],
            opacity: [0, 0.9, 0.9, 0]
          }}
          transition={{
            strokeDashoffset: {
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.4, 0.7, 1]
            },
            opacity: {
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.2, 0.8, 1]
            }
          }}
        >
          sewna
        </motion.text>

        {/* Decorative flowing accent lines */}
        <motion.path
          d="M 400 600 Q 500 580, 600 600"
          stroke="rgba(0, 182, 127, 0.35)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          filter="url(#liquidPencilTexture)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        <motion.path
          d="M 1200 250 Q 1300 230, 1400 250"
          stroke="rgba(0, 182, 127, 0.3)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          filter="url(#liquidPencilTexture)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </svg>
    </div>
  );
}
