"use client";

const heroBackground =
  "https://www.figma.com/api/mcp/asset/4a0a5fcd-125f-467e-8551-e507b578c5f6";
const logoMark =
  "https://www.figma.com/api/mcp/asset/813046f5-6a05-4c55-88ef-71991801e0c3";

import { useState } from "react";
import HeaderWithModal from "@/components/HeaderWithModal";
import SignUpModal from "@/components/SignUpModal";


const navItems = ["Home", "About", "Features"];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081018] text-white">
      <SignUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(100deg, rgba(5, 12, 20, 0.72) 12%, rgba(5, 12, 20, 0.28) 56%, rgba(5, 12, 20, 0.42) 100%), url(${heroBackground})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col px-5 pb-10 pt-6 sm:px-10 lg:px-12 lg:pt-8">
        <HeaderWithModal onSignUpClick={() => setIsModalOpen(true)} />

        <section className="mt-20 w-full max-w-[860px] sm:mt-24 lg:mt-[184px]">
          <h1 className="font-[family-name:var(--font-geist-sans)] text-5xl font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-6xl lg:text-[4.75rem]">
            Simplifying Agricultural
            <br />
            Analysis Through Digital
            <br />
            Technology.
          </h1>

          <p className="mt-7 max-w-[840px] font-[family-name:var(--font-geist-sans)] text-[1.65rem] leading-[1.35] text-white/95 sm:text-[1.85rem] lg:text-[2rem]">
            A digital platform that helps researcher and students record,
            monitor, and analyze crop data in one place. From growth tracking
            and cost management to harvest predictions and insights, everything
            is designed to support smarter and more efficient agricultural
            decisions.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-10 inline-flex w-72 items-center justify-center gap-4 rounded-full bg-[rgba(255,255,255,0.92)] px-8 py-4 text-2xl font-semibold text-black shadow-[-2px_6px_12px_rgba(0,0,0,0.25)] transition hover:bg-white"
            type="button"
          >
            <span>Get Started</span>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f3b300] text-s font-bold text-[#17280e]">
              ›
            </span>
          </button>
        </section>
      </div>
    </main>
  );
}

