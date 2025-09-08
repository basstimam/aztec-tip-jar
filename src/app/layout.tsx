import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TopBar } from "@/components/TopBar";
import { Tabs } from "@/components/Tabs";
import { FooterStatus } from "@/components/FooterStatus";
import { MadeWithDyad } from "@/components/made-with-dyad";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;700&family=Poppins:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
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