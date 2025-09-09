"use client";

import { useState } from "react";
import { usePXE } from "../context/PXEContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const WithdrawPrivateCard = () => {
  const [privateAddress, setPrivateAddress] = useState("");
  const { withdrawPrivate, status, isConnected } = usePXE();
  const isLoading = status === "submitting";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !isConnected || !privateAddress) return;
    
    withdrawPrivate(privateAddress);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full rounded-lg border-[3px] border-stroke bg-card p-6 shadow"
    >
      <h3 className="text-xl font-bold">Withdraw (private)</h3>
      <p className="mb-4 text-xs text-ink/70">Stays private.</p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="private-address" className="text-sm font-bold">
            To (private address)
          </Label>
          <Input
            id="private-address"
            type="text"
            placeholder="0x..."
            value={privateAddress}
            onChange={(e) => setPrivateAddress(e.target.value)}
            className="mt-1 border-[3px] bg-card"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !isConnected || !privateAddress}
          className="w-full rounded-md border-[3px] border-stroke bg-primary py-3 text-base font-bold text-primary-ink shadow-[0_4px_0_0_hsl(var(--stroke))] transition-transform active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {isLoading 
            ? "Withdrawing..." 
            : !isConnected
            ? "Connect Wallet"
            : !privateAddress
            ? "Enter Private Address"
            : "Withdraw Privately"
          }
        </Button>
      </div>
    </form>
  );
};