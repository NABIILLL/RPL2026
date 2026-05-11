"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Cek jika ada parameter code di URL (untuk flow PKCE)
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
          // Tukar code menjadi session jika menggunakan flow PKCE
          // Di client-side, Supabase-js sebenarnya bisa menangani ini secara otomatis,
          // tapi melakukan exchange secara eksplisit memastikan keamanan & kepastian.
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        }

        // Tunggu sebentar agar hook useUser (onAuthStateChange) memproses event SIGNED_IN
        setTimeout(() => {
          router.replace("/dashboard");
        }, 500);
        
      } catch (err: any) {
        console.error("Auth callback error:", err);
        setError(err.message || "Terjadi kesalahan saat memproses login Google.");
        setTimeout(() => {
          router.replace("/");
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        {error ? (
          <p className="text-red-500 font-medium">{error}</p>
        ) : (
          <p className="text-green-600 font-medium">Memproses login, mohon tunggu...</p>
        )}
      </div>
    </div>
  );
}
