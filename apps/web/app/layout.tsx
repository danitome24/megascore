import type React from "react";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { Web3Provider } from "@/components/providers/web3-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MegaReputation - MegaETH Reputation System",
  description: "Track your on-chain reputation and engagement on MegaETH",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-background font-mono text-foreground`}>
        <Web3Provider>
          <div className="flex min-h-screen">
            <SidebarNavigation />
            <div className="ml-16 flex flex-1 flex-col">
              <Header />
              <main className="flex-1 space-y-8 pb-8">{children}</main>
              <Footer />
            </div>
          </div>
          <Toaster />
        </Web3Provider>
      </body>
    </html>
  );
}
