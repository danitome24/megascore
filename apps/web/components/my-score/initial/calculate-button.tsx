"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface CalculateButtonProps {
  onCalculate: () => Promise<void>;
  isLoading?: boolean;
}

export function CalculateButton({ onCalculate, isLoading = false }: CalculateButtonProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
      <Button
        onClick={onCalculate}
        disabled={isLoading}
        size="lg"
        className="h-14 w-full bg-gradient-to-r from-mega-coral to-mega-pink text-base font-semibold shadow-lg transition-shadow hover:from-mega-coral/90 hover:to-mega-pink/90 hover:shadow-xl"
      >
        {isLoading ? (
          <>
            <Zap className="mr-3 h-5 w-5 animate-spin" />
            Analyzing Your Activity...
          </>
        ) : (
          <>
            <Zap className="mr-3 h-5 w-5" />
            Calculate My Score
          </>
        )}
      </Button>
    </motion.div>
  );
}
