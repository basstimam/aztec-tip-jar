"use client";

import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

export type PxeStatus =
  | "connected"
  | "encrypting"
  | "proving"
  | "submitting"
  | "confirmed"
  | "error"
  | "disconnected";

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

interface PXEContextType {
  status: PxeStatus;
  notes: MockNote[];
  privateTotal: number;
  isConnected: boolean;
  mockAddress: string | null;
  scanNotes: () => Promise<MockNote[]>;
  getPrivateTotal: () => number;
  tip: () => Promise<void>;
  withdrawPublic: () => Promise<void>;
  withdrawPrivate: () => Promise<void>;
  connect: () => void;
  disconnect: () => void;
}

const PXEContext = createContext<PXEContextType | undefined>(undefined);

export const PXEProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<PxeStatus>("disconnected");
  const [notes, setNotes] = useState<MockNote[]>([]);
  const [privateTotal, setPrivateTotal] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [mockAddress, setMockAddress] = useState<string | null>(null);

  const connect = () => {
    setIsConnected(true);
    setMockAddress("0x1234...abcd");
    setStatus("connected");
    toast("Wallet Connected", {
      icon: <CheckCircle className="text-success" />,
    });
  };

  const disconnect = () => {
    setIsConnected(false);
    setMockAddress(null);
    setStatus("disconnected");
    setNotes([]);
    toast("Wallet Disconnected");
  };

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
    return new Promise<void>((resolve) => {
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

  const value = {
    status,
    notes,
    privateTotal,
    isConnected,
    mockAddress,
    scanNotes,
    getPrivateTotal,
    tip,
    withdrawPublic,
    withdrawPrivate,
    connect,
    disconnect,
  };

  return <PXEContext.Provider value={value}>{children}</PXEContext.Provider>;
};

export const usePXE = () => {
  const context = useContext(PXEContext);
  if (context === undefined) {
    throw new Error("usePXE must be used within a PXEProvider");
  }
  return context;
};