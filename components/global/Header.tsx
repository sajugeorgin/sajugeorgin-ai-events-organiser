"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../theme/ModeToggle";
import { SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Authenticated, Unauthenticated } from "convex/react";
import { BarLoader } from "react-spinners";
import { useStoreUserEffect } from "@/hooks/convex/useStoreUserEffect";

export default function Header() {
  const { isLoading } = useStoreUserEffect();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background border-white/10 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/">
          <Image
            src="/logo.png"
            width={120}
            height={120}
            alt="Logo"
            priority
            className="rounded-xl object-contain"
          />

          {/* Pro Badge */}
        </Link>

        {/* Search & Location - Desktop Only */}

        {/* Right Side Actions -  */}
        <div className="flex items-center gap-3">
          <Unauthenticated>
            <SignUpButton mode="modal">
              <Button
                variant="default"
                size="sm"
                className="cursor-pointer hover:scale-105 duration-300 transition-all"
              >
                Get Started
              </Button>
            </SignUpButton>
          </Unauthenticated>

          <Authenticated>
            {/* Create Event */}
            <UserButton />
          </Authenticated>

          {/* Modals */}
          <ModeToggle />
        </div>
      </div>

      {/* In the process of authenticating, display a <BarLoader/> */}
      {isLoading && (
        <div>
          <BarLoader width="100%" color="#a855f7" />
        </div>
      )}
    </nav>
  );
}
