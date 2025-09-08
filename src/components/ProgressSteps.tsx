"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PxeStatus } from "../context/PXEContext";

const steps = ["encrypting", "proving", "submitting", "confirmed"];
const stepLabels = ["Encrypting", "Proving", "Submitting", "Confirmed"];

export const ProgressSteps = ({ currentStep }: { currentStep: PxeStatus }) => {
  const activeIndex = steps.indexOf(currentStep);

  return (
    <div
      className="flex w-full items-center justify-between"
      aria-live="polite"
    >
      {stepLabels.map((label, index) => (
        <div key={label} className="flex flex-col items-center text-center">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <motion.div
              className={cn(
                "h-3 w-3 rounded-full border-[2.5px] border-stroke",
                index <= activeIndex ? "bg-primary" : "bg-card"
              )}
              animate={{ scale: index === activeIndex ? 1.5 : 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
          <span
            className={cn(
              "mt-2 text-xs font-bold",
              index <= activeIndex ? "text-ink" : "text-ink/50"
            )}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};