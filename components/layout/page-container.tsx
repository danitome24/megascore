import React from "react";

export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background pt-16 pb-8">{children}</div>
  );
}
