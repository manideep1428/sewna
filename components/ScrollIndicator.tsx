"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-sm font-medium text-black/60 group-hover:text-[#00b67f] transition-colors">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-black/60 group-hover:text-[#00b67f] transition-colors" />
      </motion.div>
    </motion.div>
  );
}
