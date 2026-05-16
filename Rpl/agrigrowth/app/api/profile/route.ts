import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseService } from "../admin/_utils";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const getAccessToken = (request: Request) => {
  const authHeader = request.headers.get("authorization") || "";
  if (!authHeader.toLowerCase().startsWith("bearer ")) return null;
  return authHeader.slice(7);
};

const withTimeout = async <T,>(promise: PromiseLike<T>, message: string, timeoutMs = 6000) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timeoutId!);
  }
};

const normalizeIndonesianPhone = (rawValue?: unknown) => {
  const raw = typeof rawValue === "string" ? rawValue.trim() : "";
  if (!raw) return { value: null, error: "" };

  const compact = raw.replace(/[\s().-]/g, "");
  let normalized = compact;

  if (normalized.startsWith("08")) {
    normalized = `+62${normalized.slice(1)}`;
  } else if (normalized.startsWith("628")) {
    normalized = `+${normalized}`;
  } else if (normalized.startsWith("8")) {
    normalized = `+62${normalized}`;
  } else if (normalized.startsWith("+6208")) {
    normalized = `+62${normalized.slice(4)}`;
  }

  if (!/^\+628\d{8,11}$/.test(normalized)) {
    return {
      value: normalized,
      error: "Format telepon harus nomor HP Indonesia, contoh 081234567890 atau +6281234567890.",
    };
  }

  return { value: normalized, error: "" };
};

const getCurrentUser = async (request: Request) => {
  const token = getAccessToken(request);
  if (!token) {
    return { token: null, user: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const anon = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data, error } = await withTimeout(
    anon.auth.getUser(token),
    "Validasi sesi Supabase terlalu lama. Silakan login ulang atau coba lagi.",
    6000
  );

  if (error || !data?.user) {
    return { token, user: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  return { token, user: data.user, response: null };
};

export async function GET(request: Request) {
  const { user, response } = await getCurrentUser(request);
  if (response) return response;

  try {
    const supabase = getSupabaseService();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load profile";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { user, response } = await getCurrentUser(request);
  if (response) return response;

  const payload = await request.json();
  const name = typeof payload?.name === "string" ? payload.name.trim() : "";
  const phone = normalizeIndonesianPhone(payload?.phone);
  const location = typeof payload?.location === "string" ? payload.location.trim() : "";
  const role = typeof payload?.role === "string" ? payload.role.trim() : "";
  const bio = typeof payload?.bio === "string" ? payload.bio.trim() : "";

  if (!name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  if (phone.error) {
    return NextResponse.json({ error: phone.error }, { status: 400 });
  }

  if (bio && bio.length < 10) {
    return NextResponse.json({ error: "Bio minimal 10 karakter atau kosongkan saja." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseService();
    const { data, error } = await withTimeout(
      supabase
        .from("profiles")
        .upsert(
          {
            id: user.id,
            name,
            phone: phone.value,
            location: location || null,
            role: role || null,
            bio: bio || null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        )
        .select()
        .single(),
      "Supabase profiles tidak merespons. Cek SUPABASE_SERVICE_ROLE_KEY, network, dan policy/GRANT table profiles.",
      6000
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save profile";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
