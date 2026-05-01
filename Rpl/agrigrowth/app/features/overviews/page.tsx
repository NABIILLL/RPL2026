"use client";

import Link from "next/link";

const imgOverviewImage = "https://www.figma.com/api/mcp/asset/c54148b2-7c65-4659-a5fa-527677b9aead";
const imgLogo = "https://www.figma.com/api/mcp/asset/90530aab-9c02-498f-97a0-e57018497d3e";
const imgProfile = "https://www.figma.com/api/mcp/asset/03caec6e-0209-4de6-a510-5e7ebeb6fffd";

// Mock overview data
const overviewData = [
  {
    id: 1,
    location: "Sawah Belakang Kampus",
    crop: "Padi",
    area: "2 hektar",
    totalObservations: 15,
    lastObservation: "1 Mei 2024",
    status: "Baik",
    height: "45 cm",
    image: "https://www.figma.com/api/mcp/asset/c54148b2-7c65-4659-a5fa-527677b9aead",
  },
  {
    id: 2,
    location: "Ladang Jagung Rezon",
    crop: "Jagung",
    area: "1.5 hektar",
    totalObservations: 12,
    lastObservation: "30 April 2024",
    status: "Baik",
    height: "120 cm",
    image: "https://www.figma.com/api/mcp/asset/6d79e7b3-a514-42ab-9341-11e7bb3be8e1",
  },
  {
    id: 3,
    location: "Kebun Bawang Merah",
    crop: "Bawang Merah",
    area: "0.5 hektar",
    totalObservations: 8,
    lastObservation: "28 April 2024",
    status: "Perhatian",
    height: "25 cm",
    image: "https://www.figma.com/api/mcp/asset/0f007e12-4c18-46b6-ad68-a156ab1be51b",
  },
];

export default function Overviews() {
  return (
    <main className="min-h-screen bg-[#f4f4f4] text-[#365a1a]">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-6 sm:px-10 lg:px-14">
        <Link href="/dashboard" className="flex items-center gap-2.5 hover:opacity-80 transition">
          <img alt="Agrigrowth logo" className="h-[51px] w-[59px] object-contain" src={imgLogo} />
          <b className="text-[20px] leading-none sm:text-[21px]">Agrigrowth Monitor</b>
        </Link>

        <nav className="hidden items-center gap-10 text-[21px] font-bold lg:flex">
          <Link href="/dashboard" className="hover:opacity-80 transition">
            Home
          </Link>
          <Link href="/about" className="hover:opacity-80 transition">
            About
          </Link>
          <Link href="/wireframe4" className="hover:opacity-80 transition">
            Features
          </Link>
        </nav>

        <div className="flex items-center gap-2 rounded-full bg-[rgba(54,90,26,0.75)] px-3 py-2 text-[16px] font-medium text-[#d7e4cd] shadow-[-2px_2px_4px_rgba(0,0,0,0.25)] sm:text-[18px]">
          <span>nabil rezon</span>
          <img alt="Profile" className="h-8 w-8 object-contain" src={imgProfile} />
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 pb-12 pt-6 sm:px-10 lg:px-14 lg:pt-8">
        {/* Hero Section */}
        <article className="rounded-[30px] bg-white p-5 shadow-[6px_-6px_15px_0px_rgba(0,0,0,0.2),-6px_6px_15px_0px_rgba(0,0,0,0.2)] sm:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
            <div className="h-[190px] w-full overflow-hidden rounded-[20px] md:h-[273px] md:max-w-[605px]">
              <img alt="Overviews" className="h-full w-full object-cover" src={imgOverviewImage} />
            </div>

            <div className="w-full md:max-w-[578px]">
              <h1 className="text-[42px] font-extrabold leading-[1.05] text-[#365a1a] lg:text-[60px]">
                Overviews
              </h1>
              <p className="mt-3 text-[15px] font-medium leading-[1.35] text-[#365a1a] lg:text-[18px]">
                Menyediakan gambaran menyeluruh untuk setiap aktivitas pengamatan pada sawah, ladang, maupun tanaman yang sedang dibudidayakan, sehingga pengguna dapat memantau kondisi secara lebih terstruktur dan terorganisir.
              </p>
            </div>
          </div>
        </article>

        {/* Overview Cards */}
        <div className="rounded-[30px] bg-white p-6 shadow-[6px_-6px_15px_0px_rgba(0,0,0,0.2),-6px_6px_15px_0px_rgba(0,0,0,0.2)] sm:p-8">
          <h2 className="text-[32px] font-bold sm:text-[40px]">Ringkasan Lahan Anda</h2>

          <div className="mt-6 space-y-6">
            {overviewData.map((overview) => (
              <div
                key={overview.id}
                className="flex flex-col gap-5 rounded-[25px] border-2 border-[#365a1a] p-5 md:flex-row md:items-center md:gap-6 lg:p-6"
              >
                {/* Image */}
                <div className="h-[150px] w-full overflow-hidden rounded-[20px] md:h-[180px] md:w-[240px] md:flex-shrink-0">
                  <img
                    alt={overview.location}
                    className="h-full w-full object-cover"
                    src={overview.image}
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-[24px] font-bold text-[#365a1a] sm:text-[28px]">
                    {overview.location}
                  </h3>
                  <p className="mt-1 text-[14px] text-[#365a1a]/70">Jenis tanaman: {overview.crop}</p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-[13px] font-semibold text-[#365a1a]/60">Luas Lahan</p>
                      <p className="text-[16px] font-bold text-[#365a1a]">{overview.area}</p>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#365a1a]/60">Total Pengamatan</p>
                      <p className="text-[16px] font-bold text-[#365a1a]">{overview.totalObservations} hari</p>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#365a1a]/60">Pengamatan Terakhir</p>
                      <p className="text-[16px] font-bold text-[#365a1a]">{overview.lastObservation}</p>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#365a1a]/60">Status</p>
                      <p className={`text-[16px] font-bold ${overview.status === "Baik" ? "text-green-600" : "text-yellow-600"}`}>
                        {overview.status}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-[14px] font-semibold text-[#365a1a]">
                      Tinggi tanaman: <span className="font-bold">{overview.height}</span>
                    </p>
                    <Link
                      href={`/observation/${overview.id}`}
                      className="rounded-full bg-[#365a1a] px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-[#2d4915]"
                    >
                      Lihat Detail →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <Link
          href="/wireframe4"
          className="inline-block rounded-full bg-[#365a1a] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#2d4915]"
        >
          ← Kembali ke Features
        </Link>
      </section>
    </main>
  );
}
