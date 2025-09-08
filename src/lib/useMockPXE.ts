"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

export type PxeStatus =
  | "connected"
  | "encrypting"
  | "proving"
  | "submitting"
  | "confirmed"
  | "error";

export type MockNote = {
  id: string;
  amount: number;
  timestamp: string;
};

const MOCK_NOTES: MockNote[] = [
  { id: "note_1", amount: 0.1, timestamp: "2 minutes ago" },
  { id: "note_2", amount: 0.05, timestamp: "1 hour ago" },
  { id: "note_3", amount: 0.25, timestamp: "3 hours ago" },
];

export function useMockPXE() {
  const [status, setStatus] = useState<PxeStatus>("connected");
  const [notes, setNotes] = useState<MockNote[]>([]);
  const [privateTotal, setPrivateTotal] = useState(0);

  const scanNotes = useCallback(() => {
    setStatus("submitting");
    return new Promise<MockNote[]>((resolve) => {
      setTimeout(() => {
        setNotes(MOCK_NOTES);
        setStatus("connected");
        toast("Notes scanned successfully", {
          icon: <CheckCircle className="text-success" />,
        });
        resolve(MOCK_NOTES);
      }, 1500);
    });
  }, []);

  const getPrivateTotal = useCallback(() => {
    const total = notes.reduce((sum, note) => sum + note.amount, 0);
    setPrivateTotal(total);
    return total;
  }, [notes]);

  useEffect(() => {
    getPrivateTotal();
  }, [notes, getPrivateTotal]);

  const tip = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      const steps: PxeStatus[] = ["encrypting", "proving", "submitting"];
      let currentStep = 0;

      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          setStatus(steps[currentStep]);
          currentStep++;
        } else {
          clearInterval(interval);
          setStatus("confirmed");
          toast("Tip sent privately!", {
            icon: <CheckCircle className="text-success" />,
          });
          setTimeout(() => setStatus("connected"), 2000);
          resolve();
        }
      }, 1200);
    });
  }, []);

  const withdrawPublic = useCallback(() => {
    setStatus("submitting");
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setStatus("connected");
        toast("Public withdrawal successful", {
          icon: <CheckCircle className="text-success" />,
        });
        resolve();
      }, 2000);
    });
  }, []);

  const withdrawPrivate = useCallback(() => {
    setStatus("submitting");
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setStatus("connected");
        toast("Private withdrawal successful", {
          icon: <CheckCircle className="text-success" />,
        });
        resolve();
      }, 2000);
    });
  }, []);

  return {
    status,
    notes,
    privateTotal,
    scanNotes,
    getPrivateTotal,
    tip,
    withdrawPublic,
    withdrawPrivate,
  };
}