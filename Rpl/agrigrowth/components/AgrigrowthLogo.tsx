type AgrigrowthLogoProps = {
  className?: string;
  showText?: boolean;
  textClassName?: string;
  tone?: "dark" | "light";
};

export default function AgrigrowthLogo({
  className = "h-9 w-9",
  showText = true,
  textClassName = "text-xl font-bold text-white",
  tone = "dark",
}: AgrigrowthLogoProps) {
  const shellClassName =
    tone === "light"
      ? "border-sky-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.08)]"
      : "border-sky-200/80 bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]";

  return (
    <div className="flex items-center gap-3">
      <div
        aria-hidden
        className={`relative inline-flex items-center justify-center rounded-sm border ${shellClassName} ${className}`}
      >
        <svg viewBox="0 0 24 24" className="h-[68%] w-[68%]" fill="none" aria-hidden>
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="#79a9d6" strokeWidth="1.7" />
          <path
            d="M12 6.75L8.25 12h2.2v5.25h3.1V12h2.2L12 6.75Z"
            fill="#79a9d6"
            opacity="0.95"
          />
          <circle cx="15.4" cy="8.4" r="1.1" fill="#f3b300" />
        </svg>
      </div>

      {showText ? <div className={textClassName}>Agrigrowth Monitor</div> : null}
    </div>
  );
}