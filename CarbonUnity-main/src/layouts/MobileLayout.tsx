import { BottomNav } from "@/components/BottomNav";
import { MobileHeader } from "@/components/MobileHeader";
import { PropsWithChildren } from "react";

export default function MobileLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen w-full bg-background font-sans">
      <MobileHeader />
      <main className="pb-16 px-4 pt-4 container mx-auto animate-fade-in">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
