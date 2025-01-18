import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <main className="min-h-screen w-full bg-black">{children}</main>;
}
