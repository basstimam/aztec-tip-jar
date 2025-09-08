"use client";

import { usePXE } from "../context/PXEContext";
import { Button } from "@/components/ui/button";

export const PrivateTotalCard = () => {
  const { privateTotal, scanNotes, status, isConnected } = usePXE();
  const isLoading = status === "submitting";

  return (
    <div className="rounded-lg border-[3px] border-stroke bg-card p-6 shadow">
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div>
          <h2 className="text-sm font-bold text-ink/70">
            Private balance (local view)
          </h2>
          <p className="font-mono text-5xl font-bold">
            {privateTotal.toFixed(2)} <span className="text-3xl">ETH</span>
          </p>
        </div>
        <Button
          onClick={scanNotes}
          disabled={isLoading || !isConnected}
          className="mt-4 rounded-md border-[3px] border-stroke bg-accent py-3 text-base font-bold text-white shadow-[0_4px_0_0_hsl(var(--stroke))] transition-transform active:translate-y-1 active:shadow-none sm:mt-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {isLoading ? "Scanning..." : "Scan Notes"}
        </Button>
      </div>
    </div>
  );
};