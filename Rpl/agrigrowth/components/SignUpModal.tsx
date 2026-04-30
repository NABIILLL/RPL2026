"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const imgGroup2 = "https://www.figma.com/api/mcp/asset/53ed4b6a-3620-47a5-954d-05c77858f9f7";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const [email, setEmail] = useState("nabilrezonicalmira@apps.ipb.ac.id");
  const [password, setPassword] = useState("xxxxxxxxxx");
  const router = useRouter();

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with actual login API
    router.push("/dashboard");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-12 top-12 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white"
      >
        ✕
      </button>

      {/* Modal card */}
      <div className="relative w-full max-w-[525px] rounded-[25px] bg-white px-[42px] py-[37px] pb-[38px]">
        {/* Logo */}
        <div className="mb-[116px] flex justify-center">
          <img alt="Logo" className="h-[51px] w-[59px]" src={imgGroup2} />
        </div>

        {/* Title and subtitle */}
        <div className="mb-[18px] text-center">
          <h2 className="font-['Plus_Jakarta_Sans:Medium'] text-[18px] font-medium text-black">
            Enter your email address
          </h2>
          <p className="text-[10px] font-medium text-black/60">Sign up or log in</p>
        </div>

        {/* Form */}
        <form onSubmit={handleNext} className="mb-[116px] space-y-[18px]">
          {/* Email input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full rounded-[15px] border border-black/50 bg-transparent px-[17px] py-[24px] font-['Plus_Jakarta_Sans:Medium'] text-[18px] font-medium text-black placeholder-black/50 focus:outline-none"
          />

          {/* Password input */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-[15px] border border-black/50 bg-transparent px-[17px] py-[24px] font-['Plus_Jakarta_Sans:Medium'] text-[18px] font-medium text-black placeholder-black/50 focus:outline-none"
          />

          {/* Next button */}
          <button
            type="submit"
            className="w-full rounded-[42px] bg-black py-[25px] font-['Plus_Jakarta_Sans:Medium'] text-[18px] font-medium text-white transition hover:bg-black/80"
          >
            Next
          </button>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="font-['Plus_Jakarta_Sans:Bold'] text-[21px] font-bold text-black">
            Agrigrowth Monitor
          </p>
        </div>
      </div>
    </div>
  );
}
