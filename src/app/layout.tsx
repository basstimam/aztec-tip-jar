import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TopBar } from "@/components/TopBar";
import { Tabs } from "@/components/Tabs";
import { FooterStatus } from "@/components/FooterStatus";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { inter, jetbrains_mono, poppins } from "./fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Aztec Private Tip Jar",
  description: "Send a private tip. Amount and sender stay hidden.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased",
          inter.variable,
          jetbrains_mono.variable,
          poppins.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col pb-20">
          <TopBar />
          <main className="flex-1">
            <div className="container py-8">
              <Tabs />
              <div className="mt-8">{children}</div>
            </div>
          </main>
          <FooterStatus />
          <div className="absolute bottom-4 right-4">
            <MadeWithDyad />
          </div>
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "hsl(var(--card))",
              color: "hsl(var(--ink))",
              border: "3px solid hsl(var(--stroke))",
              borderRadius: "14px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            },
          }}
        />
      </body>
    </html>
  );
}