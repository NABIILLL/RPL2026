"use client";

import Link from "next/link";
import { useState } from "react";
import { useWeather } from "@/hooks/useWeather";
import { getWeatherEmoji } from "@/lib/weather";
import { useUser } from "@/hooks/useUser";

const imgWeatherImage = "https://www.figma.com/api/mcp/asset/6d79e7b3-a514-42ab-9341-11e7bb3be8e1";
const imgLogo = "https://www.figma.com/api/mcp/asset/90530aab-9c02-498f-97a0-e57018497d3e";
const imgProfile = "https://www.figma.com/api/mcp/asset/03caec6e-0209-4de6-a510-5e7ebeb6fffd";

// Default location: Bogor, Indonesia
const DEFAULT_LAT = -6.5951;
const DEFAULT_LON = 106.8063;
const DEFAULT_LOCATION = "Bogor, Jawa Barat";

export default function WeatherInfo() {
  const { user, isLoading } = useUser();
  const [latitude, setLatitude] = useState(DEFAULT_LAT);
  const [longitude, setLongitude] = useState(DEFAULT_LON);
  const [locationName, setLocationName] = useState(DEFAULT_LOCATION);
  
  const { current, forecast, loading, error, refetch } = useWeather({
    latitude,
    longitude,
    locationName,
  });

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          setLatitude(lat);
          setLongitude(lon);
          // Reverse geocode to get a human readable city/state name
          (async () => {
            try {
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
              );
              if (!res.ok) throw new Error("Reverse geocode failed");
              const json = await res.json();
              const addr = json.address || {};
              const city = addr.city || addr.town || addr.village || addr.hamlet;
              const state = addr.state || addr.county;
              const country = addr.country;
              if (city) {
                setLocationName(`${city}${state ? `, ${state}` : ""}${country ? `, ${country}` : ""}`);
              } else if (state) {
                setLocationName(`${state}${country ? `, ${country}` : ""}`);
              } else {
                setLocationName("Lokasi Anda");
              }
            } catch (err) {
              console.error("Reverse geocode error:", err);
              setLocationName("Lokasi Anda");
            }
          })();
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Tidak dapat mengakses lokasi Anda");
        }
      );
    } else {
      alert("Browser Anda tidak mendukung Geolocation");
    }
  };

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
          <span>{!isLoading && user ? user.name : "Guest"}</span>
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
                Menyediakan informasi kondisi cuaca real-time terkini untuk membantu pengguna memahami situasi lingkungan yang memengaruhi pertumbuhan tanaman. Dengan data ini, pengguna dapat menentukan tindakan yang sebaiknya dilakukan maupun dihindari, sehingga proses budidaya menjadi lebih tepat dan terencana.
              </p>
            </div>
          </div>
        </article>

        {/* Current Weather */}
        <div className="rounded-[30px] bg-white p-6 shadow-[6px_-6px_15px_0px_rgba(0,0,0,0.2),-6px_6px_15px_0px_rgba(0,0,0,0.2)] sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[32px] font-bold sm:text-[40px]">Cuaca Terkini</h2>
              <p className="text-[16px] text-[#365a1a]/70 sm:text-[18px]">{locationName}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleGetLocation}
                className="rounded-full bg-[#365a1a] px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-[#2d4915]"
              >
                📍 Lokasi Saya
              </button>
              <button
                onClick={refetch}
                disabled={loading}
                className="rounded-full bg-[#365a1a] px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-[#2d4915] disabled:opacity-50"
              >
                🔄 Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="mt-6 text-center text-[18px] font-semibold text-[#365a1a]/70">
              Memuat data cuaca...
            </div>
          ) : error ? (
            <div className="mt-6 rounded-[15px] bg-red-100 p-4 text-center text-[18px] font-semibold text-red-700">
              Error: {error}
            </div>
          ) : current ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-[20px] border-2 border-[#365a1a] p-4 text-center">
                <div className="text-[14px] font-semibold text-[#365a1a]/70">Suhu</div>
                <div className="mt-2 text-[40px] font-bold text-[#365a1a]">{current.temperature}°C</div>
                <div className="mt-1 text-[14px] text-[#365a1a]">{current.condition}</div>
              </div>

              <div className="rounded-[20px] border-2 border-[#365a1a] p-4 text-center">
                <div className="text-[14px] font-semibold text-[#365a1a]/70">Kelembaban</div>
                <div className="mt-2 text-[40px] font-bold text-[#365a1a]">{current.humidity}%</div>
              </div>

              <div className="rounded-[20px] border-2 border-[#365a1a] p-4 text-center">
                <div className="text-[14px] font-semibold text-[#365a1a]/70">Kecepatan Angin</div>
                <div className="mt-2 text-[40px] font-bold text-[#365a1a]">{current.windSpeed}</div>
                <div className="mt-1 text-[14px] text-[#365a1a]">km/h</div>
              </div>

              <div className="rounded-[20px] border-2 border-[#365a1a] p-4 text-center">
                <div className="text-[14px] font-semibold text-[#365a1a]/70">Indeks UV</div>
                <div className="mt-2 text-[40px] font-bold text-[#365a1a]">{current.uvIndex}</div>
                <div className="mt-1 text-[14px] text-[#365a1a]">
                  {current.uvIndex <= 2
                    ? "Rendah"
                    : current.uvIndex <= 5
                    ? "Sedang"
                    : current.uvIndex <= 7
                    ? "Tinggi"
                    : "Sangat Tinggi"}
                </div>
              </div>

              <div className="rounded-[20px] border-2 border-[#365a1a] p-4 text-center">
                <div className="text-[14px] font-semibold text-[#365a1a]/70">Tekanan</div>
                <div className="mt-2 text-[40px] font-bold text-[#365a1a]">{Math.round(current.pressure)}</div>
                <div className="mt-1 text-[14px] text-[#365a1a]">mb</div>
              </div>

              <div className="rounded-[20px] border-2 border-[#365a1a] p-4 text-center">
                <div className="text-[14px] font-semibold text-[#365a1a]/70">Visibilitas</div>
                <div className="mt-2 text-[40px] font-bold text-[#365a1a]">{current.visibility}</div>
                <div className="mt-1 text-[14px] text-[#365a1a]">km</div>
              </div>

              <div className="rounded-[20px] border-2 border-[#365a1a] p-4 text-center">
                <div className="text-[14px] font-semibold text-[#365a1a]/70">Arah Angin</div>
                <div className="mt-2 text-[40px] font-bold text-[#365a1a]">{Math.round(current.windDirection)}°</div>
                <div className="mt-1 text-[14px] text-[#365a1a]">
                  {current.windDirection < 90
                    ? "Timur Laut"
                    : current.windDirection < 180
                    ? "Tenggara"
                    : current.windDirection < 270
                    ? "Barat Daya"
                    : "Barat Laut"}
                </div>
              </div>

              <div className="rounded-[20px] border-2 border-[#365a1a] p-4 text-center">
                <div className="text-[14px] font-semibold text-[#365a1a]/70">Update Terakhir</div>
                <div className="mt-2 text-[12px] font-bold text-[#365a1a]">{current.lastUpdated}</div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Forecast */}
        {!loading && forecast.length > 0 && (
          <div className="rounded-[30px] bg-white p-6 shadow-[6px_-6px_15px_0px_rgba(0,0,0,0.2),-6px_6px_15px_0px_rgba(0,0,0,0.2)] sm:p-8">
            <h2 className="text-[32px] font-bold sm:text-[40px]">Prakiraan Cuaca 7 Hari</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {forecast.map((day, index) => (
                <div key={index} className="rounded-[20px] border-2 border-[#365a1a] p-4 text-center">
                  <div className="text-[16px] font-bold text-[#365a1a]">{day.day}</div>
                  <div className="mt-3 text-[40px]">{getWeatherEmoji(day.weatherCode)}</div>
                  <div className="mt-3 space-y-1">
                    <p className="text-[14px] font-semibold text-[#365a1a]">{day.condition}</p>
                    <p className="text-[13px] text-[#365a1a]/70">
                      <span className="font-bold">{day.high}°C</span> / {day.low}°C
                    </p>
                    {day.precipitation > 0 && (
                      <p className="text-[12px] text-blue-600 font-semibold">
                        💧 {day.precipitation.toFixed(1)}mm
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
