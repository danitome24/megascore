import React from "react";

export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background pb-8 pt-16">{children}</div>;
}
