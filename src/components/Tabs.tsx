"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "Tip", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
];

export function Tabs() {
  const pathname = usePathname();

  return (
    <nav className="relative z-0 flex justify-center">
      <div className="flex space-x-2 rounded-full border-[3px] border-stroke bg-card p-1 shadow">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "relative rounded-full px-6 py-2 text-sm font-bold text-ink transition",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            )}
          >
            {pathname === tab.href && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-10 bg-primary/10"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-20">{tab.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}