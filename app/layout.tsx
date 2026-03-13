import type { ReactNode } from "react";
import { Inter, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ShellLayout from "@/components/ShellLayout";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Superteam Malaysia",
  description: "Official community platform for Superteam Malaysia: members, events, and more.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body className={`${inter.className} min-h-screen text-neutral-50 flex flex-col`}>
        <ShellLayout>{children}</ShellLayout>
      </body>
    </html>
  );
}