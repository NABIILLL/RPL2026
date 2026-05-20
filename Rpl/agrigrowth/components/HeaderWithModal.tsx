"use client";

import { useState } from "react";
import Link from "next/link";
import { UserCircle2, Menu, X } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useLogoutConfirm } from "@/hooks/useLogoutConfirm";
import AgrigrowthLogo from "@/components/AgrigrowthLogo";

interface HeaderWithModalProps {
  onSignUpClick: () => void;
  onSignInClick?: () => void;
}

export default function HeaderWithModal({ onSignUpClick, onSignInClick }: HeaderWithModalProps) {
  const { user, isLoading } = useUser();
  const { logout: handleLogout, isLoggingOut } = useLogoutConfirm();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="absolute inset-x-4 top-4 z-10 mx-auto flex max-w-[1280px] items-center justify-between px-2">
        <AgrigrowthLogo />

        <nav className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-8 lg:flex opacity-90">
          <Link className="text-lg font-semibold text-white/90 hover:text-white transition" href="/">Home</Link>
          <Link className="text-lg font-semibold text-white/90 hover:text-white transition" href="/about">About</Link>
          <Link className="text-lg font-semibold text-white/90 hover:text-white transition" href="/wireframe4">Features</Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3">
            {!isLoading && (
              user ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-full bg-[rgba(54,90,26,0.9)] px-4 py-2 shadow-md text-white transition hover:bg-[rgba(54,90,26,1)]"
                  >
                    <span className="text-lg font-medium">{user.name}</span>
                    <UserCircle2 className="h-8 w-8 text-white/95" strokeWidth={1.7} />
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="text-sm font-semibold text-white/90 hover:text-white transition"
                  >
                    {isLoggingOut ? "Keluar..." : "Logout"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={onSignInClick || onSignUpClick}
                    className="text-sm font-semibold text-white/85 hover:text-white transition"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={onSignUpClick}
                    className="inline-flex items-center gap-3 rounded-full bg-[#365a1a] px-4 py-2 shadow-lg hover:bg-[#2d4915] transition text-white"
                  >
                    <span className="text-lg font-medium">Sign Up</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3b300] font-bold text-black">›</span>
                  </button>
                </>
              )
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((s) => !s)}
            className="inline-flex items-center justify-center rounded-md p-2 text-white lg:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="lg:hidden absolute right-4 top-16 z-20 w-64 rounded-md bg-[rgba(2,6,23,0.72)] p-4 shadow-lg">
            <nav className="flex flex-col gap-3">
              <Link onClick={() => setMobileOpen(false)} className="text-base font-semibold text-white/95 hover:text-white" href="/">Home</Link>
              <Link onClick={() => setMobileOpen(false)} className="text-base font-semibold text-white/95 hover:text-white" href="/about">About</Link>
              <Link onClick={() => setMobileOpen(false)} className="text-base font-semibold text-white/95 hover:text-white" href="/wireframe4">Features</Link>
            </nav>

            <div className="mt-3 border-t border-white/10 pt-3">
              {!isLoading ? (
                user ? (
                  <div className="flex flex-col gap-2">
                    <Link onClick={() => setMobileOpen(false)} href="/profile" className="flex items-center gap-2 rounded-md px-3 py-2 bg-[rgba(54,90,26,0.9)] text-white">
                      <UserCircle2 className="h-5 w-5" />
                      <span className="font-medium">{user.name}</span>
                    </Link>
                    <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="text-left text-sm font-semibold text-white/90">{isLoggingOut ? 'Keluar...' : 'Logout'}</button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button onClick={() => { setMobileOpen(false); (onSignInClick || onSignUpClick)(); }} className="text-left text-sm font-semibold text-white/90">Sign In</button>
                    <button onClick={() => { setMobileOpen(false); onSignUpClick(); }} className="rounded-md bg-[rgba(54,90,26,0.9)] px-3 py-2 text-white font-medium">Sign Up</button>
                  </div>
                )
              ) : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
