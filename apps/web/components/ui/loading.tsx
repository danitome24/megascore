"use client";

import { motion } from "framer-motion";

interface LoadingProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export function Loading({ className = "", title, subtitle }: LoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {/* Title */}
      {title && <p className="text-lg font-semibold text-foreground">{title}</p>}

      {/* Loading spinner dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="h-3 w-3 rounded-full bg-mega-coral"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* Subtitle */}
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
