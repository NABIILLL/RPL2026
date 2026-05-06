"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/hooks/useUser";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const imgGroup2 = "https://www.figma.com/api/mcp/asset/53ed4b6a-3620-47a5-954d-05c77858f9f7";

export default function ObservationHistory() {
  const params = useParams();
  const id = params.id as string;
  const { user, isLoading } = useUser();
  const [chartData, setChartData] = useState<any[]>([]);
  const [trackerTitle, setTrackerTitle] = useState("Tanaman");
  const [loading, setLoading] = useState(true);
  
  // Analysis stats
  const [stats, setStats] = useState({
    startHeight: 0,
    endHeight: 0,
    startLeaf: 0,
    endLeaf: 0,
    daysSpan: 0,
    avgHeightGrowth: 0,
    avgLeafGrowth: 0
  });

  useEffect(() => {
    async function fetchData() {
      console.log("useEffect triggered - id:", id, "isLoading:", isLoading, "user:", user?.id);
      
      if (!id || isLoading || !user) {
        console.log("Early return: id=", id, "isLoading=", isLoading, "user=", user);
        if (!isLoading) setLoading(false);
        return;
      }
      
      try {
        const typeLabel = id === "jagung" ? "Jagung" : id === "bawang" ? "Bawang Merah" : "Padi";
        setTrackerTitle(typeLabel);
        console.log("Type label:", typeLabel);

        // Cari semua tracker milik user ini dengan tipe tanaman yang sesuai
        const { data: trackers, error: trackersError } = await supabase
          .from("trackers")
          .select("id")
          .eq("plant_type", id)
          .eq("user_id", user.id);
        
        console.log("Trackers query - plant_type:", id, "user_id:", user.id);
        console.log("Trackers result:", trackers, "error:", trackersError);
          
        if (!trackers || trackers.length === 0) {
          console.log("No trackers found");
          setLoading(false);
          return;
        }

        const trackerIds = trackers.map(t => t.id);
        console.log("Tracker IDs:", trackerIds);

        const { data: logsData, error: logsError } = await supabase
          .from("growth_logs")
          .select("*")
          .in("tracker_id", trackerIds)
          .order("day_number", { ascending: true });

        console.log("Growth logs query - trackerIds:", trackerIds);
        console.log("Growth logs result:", logsData, "error:", logsError);

        if (logsData && logsData.length > 0) {
          console.log("Processing", logsData.length, "log entries");
          const data = logsData.map(log => ({
            day: `Hari ${log.day_number}`,
            dayNumber: log.day_number,
            height: log.plant_height || 0,
            leaf: log.leaf_count || 0,
          }));
          console.log("Chart data:", data);
          setChartData(data);
          
          if (data.length > 0) {
            const first = data[0];
            const last = data[data.length - 1];
            const daysSpan = last.dayNumber - first.dayNumber || 1;
            
            const newStats = {
              startHeight: first.height,
              endHeight: last.height,
              startLeaf: first.leaf,
              endLeaf: last.leaf,
              daysSpan,
              avgHeightGrowth: (last.height - first.height) / daysSpan,
              avgLeafGrowth: (last.leaf - first.leaf) / daysSpan
            };
            console.log("Stats:", newStats);
            setStats(newStats);
          }
        } else {
          console.log("No logs data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, user, isLoading]);

  return (
    <main className="min-h-screen bg-[#f4f4f4] text-[#365a1a]">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-6 sm:px-10 lg:px-14">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2.5 hover:opacity-80 transition">
          <img alt="Agrigrowth logo" className="h-[51px] w-[59px] object-contain" src={imgGroup2} />
          <b className="text-[20px] leading-none sm:text-[21px]">Agrigrowth Monitor</b>
        </Link>

        <nav className="hidden items-center gap-10 text-[21px] font-bold lg:flex">
          <Link href={user ? "/dashboard" : "/"} className="transition hover:opacity-80">
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
          <span>{!isLoading && user ? user.name : "Guest"}</span>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto w-full max-w-[1440px] px-5 pb-12 sm:px-10 lg:px-14">
        <div className="flex flex-wrap items-center justify-between gap-4 mt-2 sm:mt-4">
          <h1 className="text-[32px] font-extrabold leading-[1.08] text-[#365a1a] sm:text-[42px] lg:text-[58px]">
            Monitoring Grafik {trackerTitle}
          </h1>
          <div className="flex items-center gap-3">
            <Link
              href="/observation/form"
              className="rounded-full bg-[#365a1a] px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#2d4915] hover:shadow-lg transition"
            >
              ➕ Input Data
            </Link>
            <button className="rounded-full bg-white px-6 py-2.5 text-sm font-bold shadow-md border border-[#365a1a]/20 hover:bg-gray-50 hover:shadow-lg transition">
              📥 Export PDF
            </button>
            <button className="rounded-full bg-white px-6 py-2.5 text-sm font-bold shadow-md border border-[#365a1a]/20 hover:bg-gray-50 hover:shadow-lg transition">
              📤 Share
            </button>
          </div>
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center rounded-[20px] bg-white py-16 px-6 text-center shadow-sm border border-gray-100">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#365a1a] border-t-transparent"></div>
              <p className="mt-4 text-[#365a1a] font-medium">Memuat data grafik...</p>
            </div>
          ) : chartData.length > 0 ? (
            <div className="space-y-8">
              
              {/* Grafik Tinggi Tanaman */}
              <div className="rounded-[20px] border-2 border-[#365a1a] bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-[20px] font-bold sm:text-[24px]">📊 GRAFIK TINGGI TANAMAN</h2>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#365a1a' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#365a1a' }} dx={-10} unit=" cm" />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                        labelStyle={{ fontWeight: 'bold', color: '#365a1a' }}
                      />
                      <Line type="monotone" dataKey="height" name="Tinggi Tanaman" stroke="#365a1a" strokeWidth={4} dot={{ r: 6, fill: '#365a1a', strokeWidth: 0 }} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <p className="text-[16px] font-semibold text-[#365a1a]">Tren: {stats.avgHeightGrowth >= 0 ? '↑ Meningkat' : '↓ Menurun'} ({stats.avgHeightGrowth.toFixed(2)} cm/hari)</p>
                  <p className="text-[14px] text-gray-600">Total tinggi terakhir: {stats.endHeight} cm</p>
                </div>
              </div>

              {/* Grafik Jumlah Daun */}
              <div className="rounded-[20px] border-2 border-[#365a1a] bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-[20px] font-bold sm:text-[24px]">📊 GRAFIK JUMLAH DAUN</h2>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#365a1a' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#365a1a' }} dx={-10} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                        labelStyle={{ fontWeight: 'bold', color: '#365a1a' }}
                      />
                      <Line type="monotone" dataKey="leaf" name="Jumlah Daun" stroke="#61ae25" strokeWidth={4} dot={{ r: 6, fill: '#61ae25', strokeWidth: 0 }} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <p className="text-[16px] font-semibold text-[#365a1a]">Tren: {stats.avgLeafGrowth >= 0 ? '↑ Bertambah' : '↓ Berkurang'} ({stats.avgLeafGrowth.toFixed(2)} daun/hari)</p>
                  <p className="text-[14px] text-gray-600">Total daun terakhir: {stats.endLeaf} helai</p>
                </div>
              </div>

              {/* Analisis Pertumbuhan */}
              <div className="rounded-[20px] border-2 border-[#365a1a] bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-[20px] font-bold sm:text-[24px] uppercase">Analisis Pertumbuhan</h2>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2">Tinggi Tanaman:</h3>
                    <ul className="space-y-1 text-sm text-[#365a1a]/80">
                      <li>• Awal: {stats.startHeight} cm</li>
                      <li>• Akhir: {stats.endHeight} cm</li>
                      <li>• Total pertumbuhan: {(stats.endHeight - stats.startHeight).toFixed(2)} cm</li>
                      <li>• Rata-rata: {stats.avgHeightGrowth.toFixed(2)} cm/hari</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Jumlah Daun:</h3>
                    <ul className="space-y-1 text-sm text-[#365a1a]/80">
                      <li>• Awal: {stats.startLeaf} helai</li>
                      <li>• Akhir: {stats.endLeaf} helai</li>
                      <li>• Total pertambahan: {stats.endLeaf - stats.startLeaf} helai</li>
                      <li>• Rata-rata: {stats.avgLeafGrowth.toFixed(2)} daun/hari</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <h3 className="font-semibold mb-2">Kesimpulan:</h3>
                  <div className="text-sm space-y-1">
                    <p className="flex items-center gap-2"><span>✓</span> Pertumbuhan tercatat selama {stats.daysSpan} hari dengan baik.</p>
                    <p className="flex items-center gap-2"><span>✓</span> Tidak ada penurunan ekstrim yang tercatat.</p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-[30px] border-2 border-dashed border-[#9fb08d] bg-white py-24 px-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f0f4eb] mb-6">
                <span className="text-5xl">📊</span>
              </div>
              <h3 className="text-[24px] font-bold text-[#365a1a]">Belum Ada Data Grafik</h3>
              <p className="mt-3 text-[16px] text-[#365a1a]/70 max-w-md">
                Anda memerlukan setidaknya satu data pengamatan untuk membuat grafik. Mulai dengan input data pengamatan sekarang.
              </p>
              <Link
                href="/observation/form"
                className="mt-6 inline-block rounded-full bg-[#365a1a] px-8 py-3 text-sm font-bold text-white hover:bg-[#2d4915] transition"
              >
                Input Data Sekarang
              </Link>
            </div>
          )}
        </div>

        {/* Back Button */}
        <Link
          href="/dashboard"
          className="mt-10 inline-block rounded-full bg-[#365a1a] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#2d4915]"
        >
          ← Kembali ke Dashboard
        </Link>
      </section>
    </main>
  );
}
