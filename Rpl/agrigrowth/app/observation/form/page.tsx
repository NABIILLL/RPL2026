"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";

const imgLogo = "https://www.figma.com/api/mcp/asset/90530aab-9c02-498f-97a0-e57018497d3e";

interface FormData {
  trackerSelect: string;
  dayNumber: string;
  plantHeight: string;
  leafCount: string;
  branchCount: string;
  notes: string;
}

interface TrackerData {
  id: string;
  title: string;
  plant_type: string;
  user_id: string;
  created_at: string;
}

export default function ObservationForm() {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  
  const [formData, setFormData] = useState<FormData>({
    trackerSelect: "",
    dayNumber: "",
    plantHeight: "",
    leafCount: "",
    branchCount: "",
    notes: "",
  });

  const [trackers, setTrackers] = useState<TrackerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch user's trackers
  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      console.log("No user found, redirecting...");
      setLoading(false);
      return;
    }

    const fetchTrackers = async () => {
      try {
        console.log("Fetching trackers for user:", user.id);
        const { data, error } = await supabase
          .from("trackers")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
        
        console.log("Trackers fetched:", data);
        setTrackers(data || []);

        // Set first tracker as default
        if (data && data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            trackerSelect: data[0].id,
          }));
        }
      } catch (error) {
        console.error("Error fetching trackers:", error);
        toast.error("Gagal memuat daftar tracker");
      } finally {
        setLoading(false);
      }
    };

    fetchTrackers();
  }, [user, userLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.trackerSelect) {
      toast.error("Pilih tracker terlebih dahulu");
      return;
    }
    if (!formData.dayNumber || parseInt(formData.dayNumber) < 1) {
      toast.error("Masukkan hari pengamatan yang valid");
      return;
    }
    if (!formData.plantHeight || parseFloat(formData.plantHeight) <= 0) {
      toast.error("Masukkan tinggi tanaman yang valid");
      return;
    }
    if (!formData.leafCount || parseInt(formData.leafCount) < 0) {
      toast.error("Masukkan jumlah daun yang valid");
      return;
    }

    setSubmitting(true);

    try {
      const selectedTracker = trackers.find((t) => t.id === formData.trackerSelect);
      if (!selectedTracker) {
        toast.error("Tracker tidak ditemukan");
        setSubmitting(false);
        return;
      }

      console.log("Saving data for tracker:", selectedTracker.id);
      console.log("Data:", {
        tracker_id: formData.trackerSelect,
        day_number: parseInt(formData.dayNumber),
        plant_height: parseFloat(formData.plantHeight),
        leaf_count: parseInt(formData.leafCount),
        branch_count: formData.branchCount ? parseInt(formData.branchCount) : 0,
        notes: formData.notes || null,
      });

      const { error } = await supabase
        .from("growth_logs")
        .insert({
          tracker_id: formData.trackerSelect,
          day_number: parseInt(formData.dayNumber),
          plant_height: parseFloat(formData.plantHeight),
          leaf_count: parseInt(formData.leafCount),
          branch_count: formData.branchCount ? parseInt(formData.branchCount) : 0,
          notes: formData.notes || null,
        });

      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }

      toast.success("Data pengamatan berhasil disimpan!");
      console.log("Redirecting to:", `/observation/${selectedTracker.plant_type}/history`);
      
      // Redirect to history page
      router.push(`/observation/${selectedTracker.plant_type}/history`);
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Gagal menyimpan data pengamatan");
      setSubmitting(false);
    }
  };

  if (userLoading || loading) {
    return (
      <main className="min-h-screen bg-[#f4f4f4]">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#365a1a] mx-auto mb-4"></div>
            <p className="text-[#365a1a] text-lg font-semibold">Memuat data...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#f4f4f4]">
        <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-6 sm:px-10 lg:px-14">
          <Link href="/dashboard" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <img alt="Agrigrowth logo" className="h-[51px] w-[59px] object-contain" src={imgLogo} />
            <b className="text-[20px] leading-none sm:text-[21px] text-[#365a1a]">Agrigrowth Monitor</b>
          </Link>
        </header>
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <div className="text-center">
            <p className="text-[#365a1a] text-lg font-semibold mb-4">Silakan login terlebih dahulu</p>
            <Link href="/" className="inline-block rounded-lg bg-[#365a1a] px-6 py-3 text-white font-bold hover:bg-[#2d4915]">
              Kembali ke Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f4f4]">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-6 sm:px-10 lg:px-14">
        <Link href="/dashboard" className="flex items-center gap-2.5 hover:opacity-80 transition">
          <img alt="Agrigrowth logo" className="h-[51px] w-[59px] object-contain" src={imgLogo} />
          <b className="text-[20px] leading-none sm:text-[21px] text-[#365a1a]">Agrigrowth Monitor</b>
        </Link>

        <nav className="hidden items-center gap-10 text-[21px] font-bold lg:flex text-[#365a1a]">
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
      </header>

      {/* Form Content */}
      <section className="mx-auto w-full max-w-[600px] px-5 pb-12 sm:px-10">
        <div className="rounded-[30px] bg-white p-8 shadow-lg">
          <h1 className="text-[32px] font-extrabold text-[#365a1a] mb-2">Input Data Pengamatan</h1>
          <p className="text-[#365a1a]/70 mb-8">Masukkan data pertumbuhan tanaman Anda</p>

          {trackers.length === 0 ? (
            <div className="rounded-lg bg-yellow-50 border-2 border-yellow-200 p-6 text-center">
              <p className="text-yellow-800 font-semibold mb-2">Belum ada tracker</p>
              <p className="text-yellow-700 text-sm mb-4">
                Buat tracker terlebih dahulu di dashboard sebelum input data pengamatan
              </p>
              <Link 
                href="/dashboard" 
                className="inline-block rounded-lg bg-[#365a1a] px-6 py-3 text-white font-bold hover:bg-[#2d4915]"
              >
                Buat Tracker
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tracker Select */}
            <div>
              <label className="block text-sm font-bold text-[#365a1a] mb-2">
                Pilih Tracker *
              </label>
              <select
                name="trackerSelect"
                value={formData.trackerSelect}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-[#365a1a] px-4 py-3 text-[#365a1a] font-medium focus:outline-none focus:ring-2 focus:ring-[#365a1a] focus:ring-offset-2"
              >
                <option value="">-- Pilih Tracker --</option>
                {trackers.map((tracker) => (
                  <option key={tracker.id} value={tracker.id}>
                    {tracker.title} ({tracker.plant_type})
                  </option>
                ))}
              </select>
              {trackers.length === 0 && (
                <p className="mt-2 text-sm text-red-500">
                  Belum ada tracker. <Link href="/dashboard" className="font-bold underline">Buat tracker di dashboard</Link>
                </p>
              )}
            </div>

            {/* Day Number */}
            <div>
              <label className="block text-sm font-bold text-[#365a1a] mb-2">
                Hari ke- *
              </label>
              <input
                type="number"
                name="dayNumber"
                value={formData.dayNumber}
                onChange={handleChange}
                placeholder="Contoh: 1, 2, 3..."
                min="1"
                className="w-full rounded-lg border-2 border-[#365a1a] px-4 py-3 text-[#365a1a] placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#365a1a] focus:ring-offset-2"
              />
            </div>

            {/* Plant Height */}
            <div>
              <label className="block text-sm font-bold text-[#365a1a] mb-2">
                Tinggi Tanaman (cm) *
              </label>
              <input
                type="number"
                name="plantHeight"
                value={formData.plantHeight}
                onChange={handleChange}
                placeholder="Contoh: 10.5"
                step="0.1"
                min="0"
                className="w-full rounded-lg border-2 border-[#365a1a] px-4 py-3 text-[#365a1a] placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#365a1a] focus:ring-offset-2"
              />
            </div>

            {/* Leaf Count */}
            <div>
              <label className="block text-sm font-bold text-[#365a1a] mb-2">
                Jumlah Daun *
              </label>
              <input
                type="number"
                name="leafCount"
                value={formData.leafCount}
                onChange={handleChange}
                placeholder="Contoh: 5"
                min="0"
                className="w-full rounded-lg border-2 border-[#365a1a] px-4 py-3 text-[#365a1a] placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#365a1a] focus:ring-offset-2"
              />
            </div>

            {/* Branch Count */}
            <div>
              <label className="block text-sm font-bold text-[#365a1a] mb-2">
                Jumlah Cabang
              </label>
              <input
                type="number"
                name="branchCount"
                value={formData.branchCount}
                onChange={handleChange}
                placeholder="Contoh: 2"
                min="0"
                className="w-full rounded-lg border-2 border-[#365a1a] px-4 py-3 text-[#365a1a] placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#365a1a] focus:ring-offset-2"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-bold text-[#365a1a] mb-2">
                Catatan (Opsional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Tambahkan catatan atau pengamatan khusus..."
                rows={4}
                className="w-full rounded-lg border-2 border-[#365a1a] px-4 py-3 text-[#365a1a] placeholder:text-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#365a1a] focus:ring-offset-2"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 rounded-lg border-2 border-[#365a1a] bg-white px-6 py-3 text-[#365a1a] font-bold hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-lg bg-[#365a1a] px-6 py-3 text-white font-bold hover:bg-[#2d4915] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Menyimpan..." : "Simpan Data"}
              </button>
            </div>
          </form>
          )}
        </div>
      </section>
    </main>
  );
}
