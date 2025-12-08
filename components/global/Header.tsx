"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../theme/ModeToggle";
import { SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Authenticated, Unauthenticated } from "convex/react";
import { BarLoader } from "react-spinners";
import { useStoreUserEffect } from "@/hooks/convex/useStoreUserEffect";
import { useState } from "react";
import { Building, Plus, Ticket } from "lucide-react";

export default function Header() {
  const { isLoading } = useStoreUserEffect();

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

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
            style={{ width: "auto", height: "auto" }}
            className="rounded-xl object-contain"
          />

          {/* Pro Badge */}
        </Link>

        {/* Search & Location - Desktop Only */}

        {/* Right Side Actions */}
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

          {/* Upgrade */}
          <Button
            variant="ghost"
            className="cursor-pointer"
            size="sm"
            onClick={() => {
              setShowUpgradeModal(true);
            }}
          >
            Pricing
          </Button>

          {/* Explore */}
          <Button variant="ghost" className="cursor-pointer" size="sm">
            <Link href="/explore">Explore</Link>
          </Button>

          <Authenticated>
            {/* Create Event */}
            <Button
              variant="default"
              className="cursor-pointer hover:scale-103 duration-300 transition-all"
              size="sm"
              onClick={() => setShowUpgradeModal}
            >
              <Link
                href="/create-event"
                className="flex item items-center gap-1"
              >
                <Plus className="size-4" />
                <span className="hidden sm:inline">Create Event</span>
              </Link>
            </Button>

            {/* Custom User Button Options */}
            <UserButton>
              <UserButton.MenuItems>
                {/* Link 1: My Tickets */}
                <UserButton.Link
                  label="My Tickets"
                  labelIcon={<Ticket className="size-4" />}
                  href="/my-tickets"
                />

                {/* Link 2: My Events */}
                <UserButton.Link
                  label="My Events"
                  labelIcon={<Building className="size-4" />}
                  href="/my-events"
                />

                {/* Manage Account */}
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
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
