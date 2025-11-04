"use client";

import { motion } from "framer-motion";
import React, { JSX } from "react";

interface Line {
  id: number;
  path: string;
  strokeWidth: number;
  duration: number;
  delay: number;
  gradient: string;
  opacity: number;
}

export default function FluidBackground(): JSX.Element {
  const [lines, setLines] = React.useState<Line[]>([]);

  React.useEffect(() => {
    let lineIdCounter = 0;
    
    const createNewLine = (): Line => {
      const startY: number = Math.random() * 100;
      const controlY1: number = Math.random() * 100;
      const controlY2: number = Math.random() * 100;
      const endY: number = Math.random() * 100;
      
      const controlX1: number = 25 + Math.random() * 20;
      const controlX2: number = 50 + Math.random() * 20;
      const controlX3: number = 75 + Math.random() * 20;
      
      return {
        id: lineIdCounter++,
        path: `M 0 ${startY} Q ${controlX1} ${controlY1}, ${controlX2} ${controlY2} T ${controlX3} ${endY} T 150 ${startY}`,
        strokeWidth: 2 + Math.random() * 4,
        duration: 3 + Math.random() * 3,
        delay: 0,
        gradient: Math.random() > 0.5 ? 'lineGradient1' : 'lineGradient2',
        opacity: 0.4 + Math.random() * 0.4
      };
    };
    
    const addLine = (): void => {
      const newLine = createNewLine();
      setLines(prev => [...prev, newLine]);
      
      // Remove line after animation completes
      setTimeout(() => {
        setLines(prev => prev.filter(line => line.id !== newLine.id));
      }, (newLine.duration + 0.5) * 1000);
    };
    
    // Add initial lines
    for (let i = 0; i < 3; i++) {
      setTimeout(() => addLine(), i * 800);
    }
    
    // Continuously add new lines
    const interval = setInterval(() => {
      addLine();
    }, 2000 + Math.random() * 2000); // Add a new line every 2-4 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background - lime green waves */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #ffffff 0%, #e8f9f3 20%, #d1f3e5 40%, #b8edd7 60%, #9fe7c9 80%, #ffffff 100%)",
            "linear-gradient(135deg, #ffffff 0%, #b8edd7 20%, #9fe7c9 40%, #86e1bb 60%, #d1f3e5 80%, #ffffff 100%)",
            "linear-gradient(135deg, #ffffff 0%, #d1f3e5 20%, #b8edd7 40%, #9fe7c9 60%, #e8f9f3 80%, #ffffff 100%)",
            "linear-gradient(135deg, #ffffff 0%, #e8f9f3 20%, #d1f3e5 40%, #b8edd7 60%, #9fe7c9 80%, #ffffff 100%)",
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Flowing animated blobs */}
      <motion.div
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#00b67f]/20 to-transparent blur-3xl"
        animate={{
          x: [0, 200, 100, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.3, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-tl from-[#00b67f]/25 to-transparent blur-3xl"
        animate={{
          x: [0, -150, -50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.4, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#00b67f]/15 to-transparent blur-3xl"
        animate={{
          x: [-100, 150, -100],
          y: [50, -80, 50],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Smaller accent blobs */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full top-1/4 right-1/4"
        style={{
          background: "radial-gradient(circle, rgba(0, 182, 127, 0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, 200, -150, 0],
          y: [0, -200, 150, 0],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full top-2/3 left-1/4"
        style={{
          background: "radial-gradient(circle, rgba(0, 182, 127, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, -250, 200, 0],
          y: [0, 200, -150, 0],
          scale: [0.9, 1.4, 1.1, 0.9],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated flowing lines in background */}
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#05da9aff" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#08dd9dff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#09dc84b7" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00b67f" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#03e290a2" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#01d092ff" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Random flowing curved lines */}
        {lines.map((line) => (
          <motion.path
            key={line.id}
            d={line.path}
            stroke={`url(#${line.gradient})`}
            strokeWidth={line.strokeWidth}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, line.opacity, 0],
              y: [0, -5 + Math.random() * 10, 0]
            }}
            transition={{
              duration: line.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: line.delay,
            }}
          />
        ))}
      </svg>
    </div>
  );
}