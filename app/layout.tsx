import type React from "react";
import "./globals.css";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { Web3Provider } from "@/components/providers/web3-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MegaScore - MegaETH Reputation System",
  description: "Track your on-chain reputation and engagement on MegaETH",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-background font-mono text-foreground`}>
        <Web3Provider>
          <SidebarNavigation />
          <main className="ml-16">{children}</main>
          <Toaster />
        </Web3Provider>
      </body>
    </html>
  );
}
