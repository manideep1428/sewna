"use client"

import { motion } from "framer-motion"

interface LiquidBlobProps {
  color: "emerald" | "sage"
  position: "top-left" | "bottom-right" | "top-right" | "bottom-left"
}

export default function LiquidBlob({ color, position }: LiquidBlobProps) {
  const colorMap = {
    emerald: "from-emerald/20 to-emerald/10",
    sage: "from-sage/20 to-sage/10",
  }

  const positionMap = {
    "top-left": "-top-40 -left-40",
    "bottom-right": "-bottom-40 -right-40",
    "top-right": "-top-40 -right-40",
    "bottom-left": "-bottom-40 -left-40",
  }

  return (
    <motion.div
      animate={{
        y: [0, 30, 0],
        x: [0, 20, 0],
      }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className={`absolute ${positionMap[position]} w-96 h-96 rounded-full bg-gradient-to-br ${colorMap[color]} blur-3xl`}
    />
  )
}
