"use client";

const heroBackground =
  "https://www.figma.com/api/mcp/asset/4a0a5fcd-125f-467e-8551-e507b578c5f6";
const logoMark =
  "https://www.figma.com/api/mcp/asset/813046f5-6a05-4c55-88ef-71991801e0c3";

import { useState, useEffect } from "react";
import HeaderWithModal from "@/components/HeaderWithModal";
import SignUpModal from "@/components/SignUpModal";
import { useUser } from "@/hooks/useUser";


const navItems = ["Home", "About", "Features"];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isLoading } = useUser();

  // Auto-open modal jika user belum login
  useEffect(() => {
    if (!isLoading && !user) {
      setIsModalOpen(true);
    }
  }, [user, isLoading]);
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

        <section className="mt-20 w-full max-w-[860px] sm:mt-32 lg:mt-56">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Simplifying Agricultural
            <br />
            Analysis Through Digital
            <br />
            Technology.
          </h1>

          <p className="mt-6 max-w-[840px] text-lg leading-relaxed text-white/90 sm:text-xl lg:text-2xl">
            A digital platform that helps researcher and students record, monitor, and analyze crop data in one place. From growth tracking and cost management to harvest predictions and insights, everything is designed to support smarter and more efficient agricultural decisions.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-base font-semibold text-black shadow-lg transition duration-200 hover:bg-gray-100 hover:shadow-xl sm:gap-4 sm:px-8 sm:py-4 sm:text-lg"
            type="button"
          >
            <span>Get Started</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3b300] font-bold text-[#1a1a1a] sm:h-11 sm:w-11">
              ›
            </span>
          </button>
        </section>
      </div>
    </main>
  );
}

