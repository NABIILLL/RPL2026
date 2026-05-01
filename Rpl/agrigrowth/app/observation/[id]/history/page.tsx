"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const imgGroup2 = "https://www.figma.com/api/mcp/asset/53ed4b6a-3620-47a5-954d-05c77858f9f7";
const imgRice2 = "https://www.figma.com/api/mcp/asset/2d7af9f5-776e-41f7-851d-32ef06f4449b";

// Mock data - observations history
const observationHistory = [
  {
    day: 1,
    date: "1 Mei 2024",
    image: imgRice2,
    height: "25 cm",
    status: "Sehat",
  },
  {
    day: 2,
    date: "2 Mei 2024",
    image: imgRice2,
    height: "28 cm",
    status: "Sehat",
  },
  {
    day: 3,
    date: "3 Mei 2024",
    image: imgRice2,
    height: "32 cm",
    status: "Sehat",
  },
  {
    day: 4,
    date: "4 Mei 2024",
    image: imgRice2,
    height: "35 cm",
    status: "Sehat",
  },
  {
    day: 5,
    date: "5 Mei 2024",
    image: imgRice2,
    height: "38 cm",
    status: "Sehat",
  },
];

export default function ObservationHistory() {
  const params = useParams();
  const id = params.id as string;

  return (
    <main className="min-h-screen bg-[#f4f4f4] text-[#365a1a]">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-6 sm:px-10 lg:px-14">
        <Link href="/dashboard" className="flex items-center gap-2.5 hover:opacity-80 transition">
          <img alt="Agrigrowth logo" className="h-[51px] w-[59px] object-contain" src={imgGroup2} />
          <b className="text-[20px] leading-none sm:text-[21px]">Agrigrowth Monitor</b>
        </Link>

        <nav className="hidden items-center gap-10 text-[21px] font-bold lg:flex">
          <Link href="/dashboard" className="transition hover:opacity-80">
            Home
          </Link>
          <Link href="/about" className="transition hover:opacity-80">
            About
          </Link>
          <Link href="/wireframe4" className="transition hover:opacity-80">
            Features
          </Link>
        </nav>

        <div className="flex items-center gap-2 rounded-full bg-[rgba(54,90,26,0.75)] px-3 py-2 text-[16px] font-medium text-[#d7e4cd] shadow-[-2px_2px_4px_rgba(0,0,0,0.25)] sm:text-[18px]">
          <span>Nabil Rezon</span>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto w-full max-w-[1440px] px-5 pb-12 sm:px-10 lg:px-14">
        <h1 className="mt-2 text-[32px] font-extrabold leading-[1.08] text-[#365a1a] sm:mt-4 sm:text-[42px] lg:text-[58px]">
          Histori Pengamatan Jagung
        </h1>

        {/* Timeline */}
        <div className="mt-10 space-y-6">
          {observationHistory.map((observation) => (
            <Link
              key={observation.day}
              href={`/observation/${id}`}
              className="group block rounded-[20px] border-2 border-[#365a1a] bg-white p-5 transition hover:bg-[#f9faf7] hover:shadow-md sm:p-6 lg:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
                {/* Image */}
                <div className="overflow-hidden rounded-[15px]">
                  <img
                    alt={`Hari ke ${observation.day}`}
                    className="h-[150px] w-full object-cover transition group-hover:scale-105 sm:h-[160px] lg:h-[180px]"
                    src={observation.image}
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-[18px] font-bold sm:text-[20px] lg:text-[24px]">
                      Hari ke {observation.day}
                    </h3>
                    <p className="text-[14px] text-[#365a1a]/70 sm:text-[16px]">
                      {observation.date}
                    </p>
                  </div>

                  <div className="mt-3 space-y-2 text-[14px] sm:text-[16px]">
                    <p>
                      <span className="font-semibold">Tinggi:</span> {observation.height}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>
                      <span className={observation.status === "Sehat" ? "text-green-600" : "text-red-600"}>
                        {" " + observation.status}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 inline-block rounded-full bg-[#365a1a] px-4 py-2 text-[12px] font-semibold text-white transition group-hover:bg-[#2d4915]">
                    Lihat Detail →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back Button */}
        <Link
          href={`/observation/${id}`}
          className="mt-10 inline-block rounded-full bg-[#365a1a] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#2d4915]"
        >
          ← Kembali
        </Link>
      </section>
    </main>
  );
}
