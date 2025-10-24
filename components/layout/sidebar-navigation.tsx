"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarConnectButton } from "@/components/layout/sidebar-connect-button";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/my-score", label: "MYSCORE" },
  { href: "/leaderboard", label: "LEADERBOARD" },
  { href: "/about", label: "ABOUT" },
];

export function SidebarNavigation() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <motion.div
        className="fixed left-0 top-0 z-50 h-screen bg-foreground"
        initial={{ width: 64 }}
        animate={{ width: isExpanded ? 280 : 64 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-background/20">
          <motion.div
            className="font-bold text-background"
            animate={{
              fontSize: isExpanded ? "1.25rem" : "0.875rem",
              letterSpacing: isExpanded ? "0.1em" : "0",
            }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded ? "MEGASCORE" : "M"}
          </motion.div>
        </div>

        {/* Navigation Items */}
        <div className="relative h-full pt-8">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            const verticalPosition = 40 + index * 100;

            return (
              <motion.div
                key={item.href}
                className="absolute w-full"
                style={{ top: `${verticalPosition}px` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <div className="group relative flex h-16 w-full cursor-pointer items-center justify-center">
                    {/* Collapsed state - Vertical text */}
                    <AnimatePresence>
                      {!isExpanded && (
                        <motion.div
                          key="vertical"
                          initial={{ opacity: 0, rotate: -90 }}
                          animate={{ opacity: 1, rotate: -90 }}
                          exit={{ opacity: 0, rotate: -90 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute select-none whitespace-nowrap text-xs font-medium tracking-widest transition-colors duration-200 ${
                            isActive ? "text-mega-coral" : "text-background/60 group-hover:text-background/90"
                          } `}
                        >
                          {item.label.length > 8 ? item.label.substring(0, 6) + "..." : item.label}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expanded state - Horizontal text with same style */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          key="horizontal"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="absolute left-0 w-full px-4"
                        >
                          <motion.div
                            className={`relative select-none text-sm font-medium tracking-widest transition-all duration-200 ${
                              isActive ? "text-mega-coral" : "text-background/70 group-hover:text-background"
                            } `}
                            whileHover={{
                              scale: 1.05,
                              x: 8,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.label}

                            {/* Hover underline effect */}
                            <motion.div
                              className="absolute -bottom-1 left-0 h-0.5 bg-mega-coral/50"
                              initial={{ width: 0 }}
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.2 }}
                            />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Active indicator */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute right-0 top-1/2 -translate-y-1/2 transform"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className="w-1 rounded-l-full bg-mega-coral"
                            animate={{
                              height: isExpanded ? 32 : 24,
                              opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                              height: { duration: 0.2 },
                              opacity: { duration: 1.5, repeat: Infinity },
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Connect Wallet Button */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 px-2"
          animate={{
            paddingLeft: isExpanded ? 16 : 8,
            paddingRight: isExpanded ? 16 : 8,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className={`w-full ${isExpanded ? "" : "flex justify-center"}`}>
            <SidebarConnectButton isExpanded={isExpanded} />
          </div>
        </motion.div>
      </motion.div>

      {/* Main content spacer */}
      <div className="w-16" />
    </>
  );
}
