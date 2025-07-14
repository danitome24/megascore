import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { SidebarNavigation } from "@/components/sidebar-navigation";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "MegaScore - MegaETH Reputation System",
  description: "Track your on-chain reputation and engagement on MegaETH",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-mono bg-background text-foreground min-h-screen`}>
        <SidebarNavigation />
        <main className="ml-16">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
