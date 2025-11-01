import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background overflow-hidden">
      <div className="flex flex-col items-center gap-8 text-center px-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Maggam Works</h1>
          <p className="text-muted-foreground text-lg">Time & Cost Calculator</p>
        </div>
        
        <Link href="/dashboard">
          <Button size="lg" className="text-lg px-8 py-6">
            Open Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
