const heroBackground =
  "https://www.figma.com/api/mcp/asset/4a0a5fcd-125f-467e-8551-e507b578c5f6";
const logoMark =
  "https://www.figma.com/api/mcp/asset/813046f5-6a05-4c55-88ef-71991801e0c3";

const navItems = ["Home", "About", "Features"];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081018] text-white">
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
        <header className="flex items-center justify-between gap-6 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 backdrop-blur-sm lg:rounded-none lg:border-none lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
          <div className="flex items-center gap-3">
            <img alt="Agrigrowth Monitor logo" className="h-11 w-12" src={logoMark} />
            <p className="font-[family-name:var(--font-geist-sans)] text-xl font-semibold tracking-[-0.02em]">
              Agrigrowth Monitor
            </p>
          </div>

          <nav className="hidden items-center gap-16 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                className="font-[family-name:var(--font-geist-sans)] text-[1.35rem] font-semibold text-white/95 transition hover:text-[#ffd772]"
                href="#"
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            className="inline-flex items-center gap-3 rounded-full bg-[#365a1acc] px-6 py-2 text-lg font-medium text-white shadow-[-2px_2px_4px_rgba(0,0,0,0.25)] transition hover:bg-[#446f22]"
            type="button"
          >
            <span>Sign Up</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f3b300] text-base font-bold text-[#17280e]">
              ›
            </span>
          </button>
        </header>

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
            className="mt-10 inline-flex items-center gap-4 rounded-full bg-[rgba(255,255,255,0.82)] px-6 py-2.5 text-[1.65rem] font-medium text-black shadow-[-2px_2px_4px_rgba(0,0,0,0.25)] transition hover:bg-white"
            type="button"
          >
            <span>Get Started</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f3b300] text-lg font-bold text-[#17280e]">
              ›
            </span>
          </button>
        </section>
      </div>
    </main>
  );
}

