"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "mega-coral" | "mega-green" | "mega-blue";
  delay: number;
}

export function FeatureCard({ icon: Icon, title, description, color, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Card className="group relative h-full overflow-hidden border-2 border-foreground/20 bg-background shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
        <div className={`absolute left-0 top-0 h-1 w-full bg-${color} transition-all duration-300 group-hover:h-2`} />
        <CardContent className="flex h-full flex-col p-8">
          <div
            className={`h-16 w-16 bg-${color} mb-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
          >
            <Icon className="h-8 w-8 text-white" />
          </div>
          <div className="flex-grow space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-[0.1em] text-foreground transition-colors duration-300 group-hover:text-mega-coral">
              {title}
            </h3>
            <p className="font-light leading-relaxed text-foreground/70">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
