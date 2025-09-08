"use client";

import { useState } from "react";
import { usePXE, MockNote } from "../context/PXEContext";
import { Button } from "./ui/button";

export const NotesList = () => {
  const { notes, isConnected } = usePXE();
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  if (!isConnected) {
    return (
      <div className="rounded-lg border-[3px] border-stroke bg-card p-6 text-center shadow">
        <p className="font-bold">Connect your wallet</p>
        <p className="text-sm text-ink/70">
          Connect your wallet to view your private notes.
        </p>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="rounded-lg border-[3px] border-stroke bg-card p-6 text-center shadow">
        <p className="font-bold">No notes found.</p>
        <p className="text-sm text-ink/70">
          Click "Scan Notes" to find your private tips.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border-[3px] border-stroke bg-card p-6 shadow">
      <h3 className="mb-4 text-xl font-bold">Private Notes</h3>
      <div className="space-y-2">
        {notes.map((note: MockNote) => (
          <div
            key={note.id}
            className="flex items-center justify-between rounded-md border-[2.5px] border-stroke bg-card p-3"
          >
            <div>
              <p className="font-mono font-bold">
                {revealed[note.id] ? `${note.amount} ETH` : "???.?? ETH"}
              </p>
              <p className="text-xs text-ink/70">{note.timestamp}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-md border-[2.5px] border-stroke bg-card px-3 text-xs font-bold"
              onClick={() =>
                setRevealed((prev) => ({ ...prev, [note.id]: !prev[note.id] }))
              }
            >
              {revealed[note.id] ? "Hide" : "Reveal locally"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};