"use client";

import { usePXE } from "../context/PXEContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const WithdrawPublicCard = () => {
  const { withdrawPublic, status, isConnected } = usePXE();
  const isLoading = status === "submitting";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !isConnected) return;
    withdrawPublic();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border-[3px] border-stroke bg-card p-6 shadow"
    >
      <h3 className="text-xl font-bold">Withdraw (public)</h3>
      <p className="mb-4 text-xs text-ink/70">Amount becomes visible.</p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="public-amount" className="text-sm font-bold">
            Amount
          </Label>
          <Input
            id="public-amount"
            type="number"
            placeholder="0.0"
            className="mt-1 border-[3px] bg-card"
          />
        </div>
        <div>
          <Label htmlFor="public-address" className="text-sm font-bold">
            To (public address)
          </Label>
          <Input
            id="public-address"
            type="text"
            placeholder="0x..."
            className="mt-1 border-[3px] bg-card"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !isConnected}
          className="w-full rounded-md border-[3px] border-stroke bg-primary py-3 text-base font-bold text-primary-ink shadow-[0_4px_0_0_hsl(var(--stroke))] transition-transform active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {isLoading ? "Withdrawing..." : "Withdraw"}
        </Button>
      </div>
    </form>
  );
};