"use client";

import { useState } from "react";
import Link from "next/link";

const imgRice2 = "https://www.figma.com/api/mcp/asset/2d7af9f5-776e-41f7-851d-32ef06f4449b";
const imgDownload41 = "https://www.figma.com/api/mcp/asset/d97cf4c8-1d28-42b7-b2d3-6398d7fe15a0";
const imgPadiPraktikum = "https://www.figma.com/api/mcp/asset/f5e4867b-98ce-4c79-8726-44f31b684eb1";
const imgLogo = "https://www.figma.com/api/mcp/asset/7e2c08f9-50c1-4c82-9fb4-6c4e4d40b86f";
const imgProfile = "https://www.figma.com/api/mcp/asset/10282dce-8830-42b5-a166-2be852d48ad8";

const cropCards = [
  {
    id: 1,
    title: "Sawah belakang kampus",
    image: imgRice2,
  },
  {
    id: 2,
    title: "Jagung rezon",
    image: imgDownload41,
  },
  {
    id: 3,
    title: "Padi praktikum",
    image: imgPadiPraktikum,
  },
];

export default function Dashboard() {
  const [trackerTitle, setTrackerTitle] = useState("");
  const [isPlantMenuOpen, setIsPlantMenuOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);
  const userName = "nabil rezon";

  const handleCreateTracker = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackerTitle.trim()) {
      setIsPlantMenuOpen(true);
    }
  };

  const handleContinue = () => {
    if (!selectedPlant) return;

    // TODO: persist trackerTitle + selectedPlant via API
    console.log("Creating tracker:", trackerTitle, selectedPlant);
    setTrackerTitle("");
    setSelectedPlant(null);
    setIsPlantMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#f4f4f4] text-[#365a1a]">
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-6 sm:px-10 lg:px-14">
        <div className="flex items-center gap-2.5">
          <img alt="Agrigrowth logo" className="h-[51px] w-[59px] object-contain" src={imgLogo} />
          <b className="text-[20px] leading-none sm:text-[21px]">Agrigrowth Monitor</b>
        </div>

        <nav className="hidden items-center gap-10 text-[21px] font-bold lg:flex">
          <Link href="/dashboard" className="border-b-2 border-[#365a1a]">
            Home
          </Link>
          <a href="#" className="transition hover:opacity-80">
            About
          </a>
          <Link href="/wireframe4" className="transition hover:opacity-80">
            Features
          </Link>
        </nav>

        <div className="flex items-center gap-2 rounded-full bg-[rgba(54,90,26,0.75)] px-3 py-2 text-[16px] font-medium text-[#d7e4cd] shadow-[-2px_2px_4px_rgba(0,0,0,0.25)] sm:text-[18px]">
          <span>{userName}</span>
          <img alt="Profile" className="h-8 w-8 object-contain" src={imgProfile} />
        </div>
      </header>

      <section className="bg-[#365a1a] py-14 text-white">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 sm:px-10 lg:grid-cols-[290px_1fr] lg:items-center lg:gap-9 lg:px-14">
          <div>
            <h1 className="text-5xl font-extrabold leading-[0.95] sm:text-[75px]">Growth Tracker</h1>
            <p className="mt-1.5 text-[25px] font-semibold">Your history</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
            {cropCards.map((card) => (
              <article
                key={card.id}
                className="relative h-[360px] overflow-hidden rounded-[16px] shadow-[-6px_6px_12px_rgba(0,0,0,0.3)] sm:h-[396px]"
              >
                <img alt={card.title} className="h-full w-full object-cover" src={card.image} />
                <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-[#365a1a] to-transparent" />
                <p className="absolute inset-x-0 bottom-3 text-center text-[18px] font-extrabold text-white">
                  {card.title}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-10 lg:px-14">
        <div className="mx-auto w-full max-w-[1295px] rounded-[30px] bg-white p-5 shadow-[6px_-6px_15px_0px_rgba(0,0,0,0.25),-6px_6px_15px_0px_rgba(0,0,0,0.25)] sm:rounded-[40px] sm:p-8">
          <h2 className="text-center text-[34px] font-extrabold text-[#365a1a] sm:text-[40px]">
            Create new growth tracker
          </h2>

          <form onSubmit={handleCreateTracker} className="mt-6 flex flex-col gap-5">
            <input
              id="tracker-title"
              type="text"
              placeholder="Enter tracker title..."
              value={trackerTitle}
              onChange={(e) => setTrackerTitle(e.target.value)}
              className="h-[68px] w-full rounded-[34px] border-2 border-[rgba(54,90,26,0.45)] px-8 text-center text-[20px] text-[rgba(54,90,26,0.7)] outline-none placeholder:text-[rgba(54,90,26,0.5)] sm:h-[85px] sm:rounded-[40px] sm:text-[25px]"
            />

            <button
              type="submit"
              className="h-[68px] w-full rounded-[34px] bg-[#365a1a] text-[20px] font-semibold text-white/55 transition hover:bg-[#2d4915] sm:h-[85px] sm:rounded-[40px] sm:text-[25px]"
            >
              Let&apos;s go
            </button>
          </form>
        </div>
      </section>

      {isPlantMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[3px]">
          <div className="relative w-full max-w-[300px] rounded-[26px] bg-white px-5 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] sm:max-w-[320px]">
            <button
              type="button"
              onClick={() => setIsPlantMenuOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#365a1a] text-sm font-bold text-white"
              aria-label="Close plant menu"
            >
              ×
            </button>

            <div className="pt-3 text-center">
              <h3 className="text-[18px] font-semibold leading-tight text-[#365a1a] sm:text-[20px]">
                Pilih jenis tanaman
              </h3>
              <p className="mt-1 text-[12px] font-light text-[#365a1a]">
                untuk ‘{trackerTitle}’
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { key: "padi", label: "Padi", icon: "🌾" },
                { key: "jagung", label: "Jagung", icon: "🌽" },
                { key: "bawang", label: "Bawang\nMerah", icon: "🧅" },
              ].map((item) => {
                const active = selectedPlant === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedPlant(item.key)}
                    className={
                      "flex h-[62px] flex-col items-center justify-center rounded-[18px] border px-1 text-center transition " +
                      (active ? "border-[#61ae25] bg-[#f7fbf3]" : "border-[#cbd9bf] bg-white")
                    }
                  >
                    <span className="text-[18px] leading-none">{item.icon}</span>
                    <span className="mt-1 whitespace-pre-line text-[10px] leading-tight text-[#365a1a]">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleContinue}
              disabled={!selectedPlant}
              className="mt-5 h-[30px] w-full rounded-full bg-[#365a1a] text-[14px] font-semibold text-white transition hover:bg-[#2d4915] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Lanjut →
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
