"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMockPXE } from "@/lib/useMockPXE";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressSteps } from "@/components/ProgressSteps";
import { cn } from "@/lib/utils";

export const TipForm = () => {
  const [token, setToken] = useState("ETH");
  const { status, tip } = useMockPXE();
  const isProcessing = status !== "connected" && status !== "confirmed" && status !== "error";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;
    tip();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-lg border-[3px] border-stroke bg-card p-6 shadow"
    >
      <div className="space-y-6">
        {/* Token Selector */}
        <div>
          <div className="flex space-x-2">
            {["ETH", "TOKEN"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setToken(t)}
                className={cn(
                  "rounded-full border-[2.5px] border-stroke px-4 py-1.5 text-sm font-bold transition-colors",
                  token === t ? "bg-primary/20" : "bg-card hover:bg-primary/10"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="relative">
          <Input
            type="number"
            placeholder="0.0"
            step="0.01"
            className="h-20 border-[3px] bg-card pl-6 pr-20 text-4xl font-mono focus-visible:ring-offset-0"
          />
          <Button
            type="button"
            variant="ghost"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md border-[2.5px] border-stroke bg-card px-3 py-1 text-xs font-bold hover:bg-primary/10"
          >
            MAX
          </Button>
        </div>

        {/* Helper Row */}
        <div className="flex justify-between text-xs font-bold text-ink/70">
          <span>Est. fee: 0.001 ETH</span>
          <span>Encrypted tip via Aztec</span>
        </div>

        {/* CTA and Progress */}
        <div className="h-16">
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div
                key="progress"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ProgressSteps currentStep={status} />
              </motion.div>
            ) : (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Button
                  type="submit"
                  className="w-full rounded-md border-[3px] border-stroke bg-primary py-6 text-lg font-bold text-primary-ink shadow-[0_5px_0_0_hsl(var(--stroke))] transition-transform active:translate-y-1 active:shadow-none"
                >
                  Tip Privately
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
};