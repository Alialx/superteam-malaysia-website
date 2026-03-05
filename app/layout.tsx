import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Superteam Malaysia",
  description:
    "Official community platform for Superteam Malaysia: members, events, and more.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-50">
        {children}
      </body>
    </html>
  );
}

