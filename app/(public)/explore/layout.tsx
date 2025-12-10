"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isMainExplorePage = pathname === "/explore";

  return (
    <div className="min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {!isMainExplorePage && (
          <div className="pb-5">
            <Button
              variant="outline"
              onClick={() => router.push("/explore")}
              className="gap-2 -ml-5 hover:scale-103 duration-300 transition-all cursor-pointer"
            >
              <ArrowLeft className="size-4" />
              Back to Explore
            </Button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
