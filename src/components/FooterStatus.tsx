"use client";

import { useMockPXE } from "@/lib/useMockPXE";
import { AnimatePresence, motion } from "framer-motion";

const statusText: { [key: string]: string } = {
  connected: "Connected",
  encrypting: "Encrypting...",
  proving: "Proving...",
  submitting: "Submitting...",
  confirmed: "Confirmed!",
  error: "Error",
};

export const FooterStatus = () => {
  const { status } = useMockPXE();

  return (
    <footer className="fixed bottom-0 left-0 right-0 flex justify-center p-4">
      <div className="rounded-full border-[2.5px] border-stroke bg-card px-4 py-1.5 text-xs font-bold shadow">
        <AnimatePresence mode="wait">
          <motion.span
            key={status}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="block"
          >
            PXE Status: {statusText[status]}
          </motion.span>
        </AnimatePresence>
      </div>
    </footer>
  );
};