"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

// Public fallback images (replace with local `/public/images/...` for production)
const imgGroup2 = "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80";

// Mock data - in production, this would come from an API
const observationData = {
    "1": {
    cropName: "Jagung",
    day: 1,
      // Use a public image; replace with `/images/observation-1.jpg` in /public for offline/local use
      imageUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1400&q=80",
    growth: {
      height: "25 cm",
      leaves: "6 helai",
      branches: "2 cabang",
      analysis: "Pertumbuhan tanaman dalam kondisi normal, tinggi dan jumlah daun sesuai dengan standar pertumbuhan jagung di hari pertama.",
    },
    environment: {
      phSoil: "6.5",
      light: "Cerah penuh 12 jam",
      plantCondition: "Sehat, tidak ada hama",
    },
    fertilizer: {
      type: "NPK 16:16:16",
      landArea: "100 m²",
      analysis: "Berdasarkan luas lahan 100 m², direkomendasikan menggunakan 5 kg pupuk NPK 16:16:16 untuk fase pertumbuhan awal.",
    },
    review: "Pada hari pertama, tanaman jagung Anda menunjukkan pertumbuhan yang baik. Tinggi tanaman mencapai 25 cm dengan 6 helai daun yang telah berkembang. Kondisi lingkungan sangat mendukung dengan pH tanah 6.5 dan penyinaran matahari yang optimal selama 12 jam per hari. Tanaman bebas dari serangan hama atau penyakit. Rekomendasi pupuk NPK 16:16:16 dengan dosis 5 kg untuk luas lahan 100 m² sudah sesuai untuk mendukung fase pertumbuhan tanaman.",
  },
};

export default function ObservationDetail() {
  const params = useParams();
  const id = params.id as string;
  const data = observationData[id as keyof typeof observationData] || observationData["1"];

  return (
    <main className="min-h-screen bg-[#b8b8b8] text-[#365a1a]">
      <div className="mx-auto min-h-screen w-full max-w-[1440px] bg-white px-5 pb-10 pt-6 sm:px-10 lg:px-14">
        {/* Header */}
        <header className="flex items-center justify-between gap-4">
          <Link href="/dashboard" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <img alt="Agrigrowth logo" className="h-[51px] w-[59px] object-contain" src={imgGroup2} />
            <b className="text-[16px] leading-none sm:text-[18px] lg:text-[21px]">Agrigrowth Monitor</b>
          </Link>

          <nav className="hidden items-center gap-10 text-[16px] font-bold lg:flex xl:text-[21px]">
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

          <div className="flex items-center gap-2 rounded-full bg-[rgba(54,90,26,0.75)] px-3 py-2 text-[14px] font-medium text-[#d7e4cd] shadow-[-2px_2px_4px_rgba(0,0,0,0.25)] sm:text-[16px] lg:text-[18px]">
            <span>Nabil Rezon</span>
          </div>
        </header>

        {/* Title */}
        <h1 className="mt-6 text-center text-[32px] font-extrabold leading-tight sm:text-[40px] lg:text-[56px]">
          Detail Pengamatan {data.cropName}
        </h1>

        {/* Crop Info and Image */}
        <section className="mt-6 grid gap-4 lg:grid-cols-[383px_1fr] lg:items-start lg:gap-5">
          <div className="rounded-[28px] border-[3px] border-[rgba(54,90,26,0.75)] p-4 sm:rounded-[35px] sm:p-5">
            <div className="text-center text-[22px] font-bold sm:text-[26px]">Jenis tanaman</div>
            <div className="mt-2 flex justify-center">
              <div className="text-[64px]">🌾</div>
            </div>
            <div className="text-center text-[22px] font-bold sm:text-[26px]">{data.cropName}</div>
          </div>

          <div className="overflow-hidden rounded-[28px] sm:rounded-[35px]">
            <img alt={data.cropName} className="h-[170px] w-full object-cover sm:h-[190px] lg:h-[212px]" src={data.imageUrl} />
          </div>
        </section>

        {/* Observation Data */}
        <section className="mt-5 rounded-[30px] border-[3px] border-[rgba(54,90,26,0.75)] px-5 py-5 sm:mt-6 sm:px-7 sm:py-6 lg:px-10 lg:py-8">
          <div className="text-[20px] font-bold sm:text-[24px]">Hari ke : {data.day}</div>

          <div className="mt-4 space-y-5 text-[16px] font-bold leading-tight sm:text-[18px] lg:text-[22px]">
            {/* Growth Section */}
            <div>
              <p className="mb-2">1. Pertumbuhan</p>
              <div className="space-y-1 font-medium text-[14px] sm:text-[16px] lg:text-[18px] text-[#365a1a]/90 ml-4">
                <p>Tinggi: <span className="font-semibold">{data.growth.height}</span></p>
                <p>Jumlah daun: <span className="font-semibold">{data.growth.leaves}</span></p>
                <p>Jumlah cabang: <span className="font-semibold">{data.growth.branches}</span></p>
                <p>Hasil analisa dan rekomendasi:</p>
                <p className="italic text-[13px] sm:text-[15px] lg:text-[17px]">{data.growth.analysis}</p>
              </div>
            </div>

            {/* Environment Section */}
            <div>
              <p className="mb-2">2. Kondisi lingkungan</p>
              <div className="space-y-1 font-medium text-[14px] sm:text-[16px] lg:text-[18px] text-[#365a1a]/90 ml-4">
                <p>pH tanah: <span className="font-semibold">{data.environment.phSoil}</span></p>
                <p>Cahaya: <span className="font-semibold">{data.environment.light}</span></p>
                <p>Kondisi tanaman: <span className="font-semibold">{data.environment.plantCondition}</span></p>
              </div>
            </div>

            {/* Fertilizer Section */}
            <div>
              <p className="mb-2">3. Kebutuhan pupuk</p>
              <div className="space-y-1 font-medium text-[14px] sm:text-[16px] lg:text-[18px] text-[#365a1a]/90 ml-4">
                <p>Jenis pupuk: <span className="font-semibold">{data.fertilizer.type}</span></p>
                <p>Luas lahan: <span className="font-semibold">{data.fertilizer.landArea}</span></p>
                <p>Hasil analisa dan rekomendasi:</p>
                <p className="italic text-[13px] sm:text-[15px] lg:text-[17px]">{data.fertilizer.analysis}</p>
              </div>
            </div>

            {/* Review Section */}
            <div>
              <p className="mb-2">Review:</p>
              <p className="max-w-[1170px] font-medium leading-[1.25] text-[13px] sm:text-[15px] lg:text-[17px]">
                {data.review}
              </p>
            </div>
          </div>
        </section>

        {/* History Button */}
        <Link
          href={`/observation/${id}/history`}
          className="mt-6 flex h-[36px] w-full items-center justify-center rounded-full bg-[#365a1a] text-[14px] font-semibold text-white transition hover:bg-[#2d4915] sm:h-[38px] sm:text-[16px] lg:h-[44px] lg:text-[18px]"
        >
          Lihat histori pengamatan ini
        </Link>
      </div>
    </main>
  );
}
