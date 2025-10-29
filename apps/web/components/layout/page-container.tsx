import React from "react";
import { Header } from "@/components/layout/header";

export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pb-8 pt-8">{children}</div>
    </>
  );
}
