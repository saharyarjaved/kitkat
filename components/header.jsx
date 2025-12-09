"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { LayoutDashboard } from "lucide-react";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import { useStoreUser } from "@/hooks/use-store-user";
import { Button } from "./ui/button";

export default function Header() {
  const { isLoading } = useStoreUser();
  const pathname = usePathname();

  if (pathname.includes("/editor")) return null;

  return (
    <header className="fixed top-6 left-1/2 z-50 -translate-x-1/2 text-nowrap">
      <div
        className="
          flex items-center justify-between gap-8
          rounded-full border border-white/20
          bg-white/10 px-8 py-3 backdrop-blur-md
          transition-all duration-300
          hover:bg-white/15
        "
      >
        {/* Logo */}
        <Link href="/" className="mr-10 md:mr-20 focus:outline-none">
          <Image
            src="/logo-text.png"
            alt="Pixxel Logo"
            width={96}
            height={24}
            className="min-w-24 object-cover"
          />
        </Link>

        {/* Navigation */}
        {pathname === "/" && (
          <nav className="hidden md:flex items-center space-x-6">
            {["features", "pricing", "contact"].map((item) => (
              <Link
                key={item}
                href={`#${item}`}
                className="
                  relative font-medium text-white
                  transition-all duration-300
                  hover:text-cyan-400
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-cyan-400/60
                  after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0 after:bg-cyan-400
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </nav>
        )}

        {/* Auth Actions */}
        <div className="ml-10 flex items-center gap-3 md:ml-20">
          <Authenticated>
            <Link href="/dashboard">
              <Button variant="glass" className="hidden sm:flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "w-8 h-8 rounded-lg border border-white/20 focus-visible:ring-2 focus-visible:ring-cyan-400/50",
                  userButtonPopoverCard:
                    "bg-slate-900/90 backdrop-blur-md border border-white/20 shadow-xl",
                  userPreviewMainIdentifier:
                    "text-white font-semibold",
                },
              }}
            />
          </Authenticated>

          <Unauthenticated>
            <SignInButton>
              <Button variant="glass" className="hidden sm:flex">
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton>
              <Button variant="primary">Get Started</Button>
            </SignUpButton>
          </Unauthenticated>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="fixed bottom-0 left-0 z-40 flex w-full justify-center">
            <BarLoader width="95%" color="#06b6d4" />
          </div>
        )}
      </div>
    </header>
  );
}
