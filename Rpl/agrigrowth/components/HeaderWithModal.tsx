"use client";

const logoMark = "https://www.figma.com/api/mcp/asset/813046f5-6a05-4c55-88ef-71991801e0c3";

interface HeaderWithModalProps {
  onSignUpClick: () => void;
}

export default function HeaderWithModal({ onSignUpClick }: HeaderWithModalProps) {

  return (
    <>
      <div className="absolute inset-x-6 top-4 z-10 mx-auto flex max-w-[1280px] items-center justify-between">
        <div className="flex items-center gap-3">
          <img alt="Agrigrowth Monitor logo" className="h-9 w-9 object-contain" src={logoMark} />
          <div className="text-xl font-bold text-white">Agrigrowth Monitor</div>
        </div>

        <nav className="hidden items-center gap-8 lg:flex opacity-90">
          <a className="text-lg font-semibold text-white/90 hover:text-white transition" href="#">Home</a>
          <a className="text-lg font-semibold text-white/90 hover:text-white transition" href="#">About</a>
          <a className="text-lg font-semibold text-white/90 hover:text-white transition" href="#">Features</a>
        </nav>

        <button
          onClick={onSignUpClick}
          className="inline-flex items-center gap-3 rounded-full bg-[rgba(53,90,26,0.9)] px-4 py-2 shadow-md hover:bg-[rgba(53,90,26,1)] transition text-white"
        >
          <span className="text-lg font-medium">Sign Up</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 font-bold">›</span>
        </button>
      </div>
    </>
  );
}
