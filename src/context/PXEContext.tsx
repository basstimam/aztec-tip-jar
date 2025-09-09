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
import { aztecClient, type TipJarNote, type AztecStatus } from "@/lib/aztec";

export type PxeStatus = AztecStatus;

interface PXEContextType {
  status: PxeStatus;
  notes: TipJarNote[];
  privateTotal: number;
  isConnected: boolean;
  address: string | null;
  scanNotes: () => Promise<TipJarNote[]>;
  getPrivateTotal: () => number;
  tip: (amount: number) => Promise<void>;
  withdrawPublic: (to: string, amount: number) => Promise<void>;
  withdrawPrivate: (toPrivate: string) => Promise<void>;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const PXEContext = createContext<PXEContextType | undefined>(undefined);

export const PXEProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<PxeStatus>("disconnected");
  const [notes, setNotes] = useState<TipJarNote[]>([]);
  const [privateTotal, setPrivateTotal] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connect = async () => {
    try {
      setStatus("submitting");
      const { address: walletAddress } = await aztecClient.connect();
      setIsConnected(true);
      setAddress(walletAddress);
      setStatus("connected");
      toast("Aztec Wallet Connected", {
        icon: <CheckCircle className="text-success" />,
      });
    } catch (error) {
      setStatus("error");
      toast("Failed to connect to Aztec", {
        description: "Make sure PXE is running and accessible",
      });
      console.error("Connection error:", error);
    }
  };

  const disconnect = async () => {
    try {
      await aztecClient.disconnect();
      setIsConnected(false);
      setAddress(null);
      setStatus("disconnected");
      setNotes([]);
      setPrivateTotal(0);
      toast("Aztec Wallet Disconnected");
    } catch (error) {
      console.error("Disconnect error:", error);
    }
  };

  const scanNotes = useCallback(async () => {
    try {
      setStatus("submitting");
      const scannedNotes = await aztecClient.scanNotes();
      setNotes(scannedNotes);
      setStatus("connected");
      toast("Notes scanned successfully", {
        icon: <CheckCircle className="text-success" />,
      });
      return scannedNotes;
    } catch (error) {
      setStatus("error");
      toast("Failed to scan notes", {
        description: "Check your connection to PXE",
      });
      console.error("Scan error:", error);
      return [];
    }
  }, []);

  const getPrivateTotal = useCallback(() => {
    const total = notes.reduce((sum, note) => sum + note.amount, 0);
    setPrivateTotal(total);
    return total;
  }, [notes]);

  useEffect(() => {
    getPrivateTotal();
  }, [notes, getPrivateTotal]);

  const tip = useCallback(async (amount: number) => {
    try {
      // Simulate the Aztec transaction flow with status updates
      setStatus("encrypting");
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setStatus("proving");
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setStatus("submitting");
      const amountInWei = BigInt(Math.floor(amount * 1e18)); // Convert to wei
      const txHash = await aztecClient.sendTip(amountInWei);
      
      setStatus("confirmed");
      toast("Tip sent privately!", {
        icon: <CheckCircle className="text-success" />,
        description: `Transaction: ${txHash.slice(0, 10)}...`,
      });
      
      setTimeout(() => setStatus("connected"), 2000);
    } catch (error) {
      setStatus("error");
      toast("Failed to send tip", {
        description: "Transaction failed or was rejected",
      });
      console.error("Tip error:", error);
      setTimeout(() => setStatus("connected"), 2000);
    }
  }, []);

  const withdrawPublic = useCallback(async (to: string, amount: number) => {
    try {
      setStatus("submitting");
      const amountInWei = BigInt(Math.floor(amount * 1e18));
      const txHash = await aztecClient.withdrawPublic(to, amountInWei);
      setStatus("connected");
      toast("Public withdrawal successful", {
        icon: <CheckCircle className="text-success" />,
        description: `Transaction: ${txHash.slice(0, 10)}...`,
      });
    } catch (error) {
      setStatus("error");
      toast("Failed to withdraw publicly", {
        description: "Check recipient address and amount",
      });
      console.error("Withdraw public error:", error);
      setTimeout(() => setStatus("connected"), 2000);
    }
  }, []);

  const withdrawPrivate = useCallback(async (toPrivate: string) => {
    try {
      setStatus("submitting");
      const txHash = await aztecClient.withdrawPrivate(toPrivate);
      setStatus("connected");
      toast("Private withdrawal successful", {
        icon: <CheckCircle className="text-success" />,
        description: `Transaction: ${txHash.slice(0, 10)}...`,
      });
    } catch (error) {
      setStatus("error");
      toast("Failed to withdraw privately", {
        description: "Check recipient address and available notes",
      });
      console.error("Withdraw private error:", error);
      setTimeout(() => setStatus("connected"), 2000);
    }
  }, []);

  const value = {
    status,
    notes,
    privateTotal,
    isConnected,
    address,
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