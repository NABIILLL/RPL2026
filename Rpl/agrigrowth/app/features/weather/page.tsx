"use client";

import Link from "next/link";

const imgWeatherImage = "https://www.figma.com/api/mcp/asset/6d79e7b3-a514-42ab-9341-11e7bb3be8e1";
const imgLogo = "https://www.figma.com/api/mcp/asset/90530aab-9c02-498f-97a0-e57018497d3e";
const imgProfile = "https://www.figma.com/api/mcp/asset/03caec6e-0209-4de6-a510-5e7ebeb6fffd";

// Mock weather data
const weatherData = {
  location: "Bogor, Jawa Barat",
  temperature: 28,
  condition: "Cerah Berawan",
  humidity: 75,
  windSpeed: 12,
  rainfall: 0,
  uvIndex: 7,
  visibility: 10,
  pressure: 1010,
  forecast: [
    { day: "Senin", high: 30, low: 22, condition: "Cerah Berawan" },
    { day: "Selasa", high: 29, low: 21, condition: "Hujan Ringan" },
    { day: "Rabu", high: 28, low: 20, condition: "Mendung" },
    { day: "Kamis", high: 31, low: 23, condition: "Cerah" },
  ],
};

export default function WeatherInfo() {
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
              <img alt="Weather" className="h-full w-full object-cover" src={imgWeatherImage} />
            </div>

            <div className="w-full md:max-w-[578px]">
              <h1 className="text-[42px] font-extrabold leading-[1.05] text-[#365a1a] lg:text-[60px]">
                Weather Info
              </h1>
              <p className="mt-3 text-[15px] font-medium leading-[1.35] text-[#365a1a] lg:text-[18px]">
                Menyediakan informasi kondisi cuaca terkini untuk membantu pengguna memahami situasi lingkungan yang memengaruhi pertumbuhan tanaman. Dengan data ini, pengguna dapat menentukan tindakan yang sebaiknya dilakukan maupun dihindari, sehingga proses budidaya menjadi lebih tepat dan terencana.
              </p>
            </div>
          </div>
        </article>

        {/* Current Weather */}
        <div className="rounded-[30px] bg-white p-6 shadow-[6px_-6px_15px_0px_rgba(0,0,0,0.2),-6px_6px_15px_0px_rgba(0,0,0,0.2)] sm:p-8">
          <h2 className="text-[32px] font-bold sm:text-[40px]">Cuaca Terkini</h2>
          <p className="text-[16px] text-[#365a1a]/70 sm:text-[18px]">{weatherData.location}</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[20px] border-2 border-[#365a1a] p-4 text-center">
              <div className="text-[14px] font-semibold text-[#365a1a]/70">Suhu</div>
              <div className="mt-2 text-[40px] font-bold text-[#365a1a]">{weatherData.temperature}°C</div>
              <div className="mt-1 text-[14px] text-[#365a1a]">{weatherData.condition}</div>
            </div>

            <div className="rounded-[20px] border-2 border-[#365a1a] p-4 text-center">
              <div className="text-[14px] font-semibold text-[#365a1a]/70">Kelembaban</div>
              <div className="mt-2 text-[40px] font-bold text-[#365a1a]">{weatherData.humidity}%</div>
            </div>

            <div className="rounded-[20px] border-2 border-[#365a1a] p-4 text-center">
              <div className="text-[14px] font-semibold text-[#365a1a]/70">Kecepatan Angin</div>
              <div className="mt-2 text-[40px] font-bold text-[#365a1a]">{weatherData.windSpeed}</div>
              <div className="mt-1 text-[14px] text-[#365a1a]">km/h</div>
            </div>

            <div className="rounded-[20px] border-2 border-[#365a1a] p-4 text-center">
              <div className="text-[14px] font-semibold text-[#365a1a]/70">Curah Hujan</div>
              <div className="mt-2 text-[40px] font-bold text-[#365a1a]">{weatherData.rainfall}</div>
              <div className="mt-1 text-[14px] text-[#365a1a]">mm</div>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="rounded-[30px] bg-white p-6 shadow-[6px_-6px_15px_0px_rgba(0,0,0,0.2),-6px_6px_15px_0px_rgba(0,0,0,0.2)] sm:p-8">
          <h2 className="text-[32px] font-bold sm:text-[40px]">Prakiraan Cuaca</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {weatherData.forecast.map((day) => (
              <div key={day.day} className="rounded-[20px] border-2 border-[#365a1a] p-4 text-center">
                <div className="text-[16px] font-bold text-[#365a1a]">{day.day}</div>
                <div className="mt-3 text-[28px]">🌤️</div>
                <div className="mt-3 space-y-1">
                  <p className="text-[14px] font-semibold text-[#365a1a]">{day.condition}</p>
                  <p className="text-[13px] text-[#365a1a]/70">
                    <span className="font-bold">{day.high}°C</span> / {day.low}°C
                  </p>
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
