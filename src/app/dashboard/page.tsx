import { PrivateTotalCard } from "@/components/PrivateTotalCard";
import { WithdrawPublicCard } from "@/components/WithdrawPublicCard";
import { WithdrawPrivateCard } from "@/components/WithdrawPrivateCard";
import { NotesList } from "@/components/NotesList";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-3">
        <PrivateTotalCard />
      </div>
      <div className="lg:col-span-2">
        <WithdrawPublicCard />
      </div>
      <div>
        <WithdrawPrivateCard />
      </div>
      <div className="lg:col-span-3">
        <NotesList />
      </div>
    </div>
  );
}