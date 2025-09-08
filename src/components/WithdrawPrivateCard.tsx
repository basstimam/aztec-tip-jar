"use client";

import { usePXE } from "../context/PXEContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const WithdrawPrivateCard = () => {
  const { withdrawPrivate, status, isConnected } = usePXE();
  const isLoading = status === "submitting";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !isConnected) return;
    withdrawPrivate();
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
          <Label htmlFor="private-account" className="text-sm font-bold">
            To (private account)
          </Label>
          <Select>
            <SelectTrigger
              id="private-account"
              className="mt-1 border-[3px] bg-card"
            >
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent className="border-[3px] bg-card">
              <SelectItem value="mock1">Mock Account 1</SelectItem>
              <SelectItem value="mock2">Mock Account 2</SelectItem>
            </SelectContent>
          </Select>
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