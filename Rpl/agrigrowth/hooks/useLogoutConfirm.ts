"use client";

import { useState } from "react";
import { clearUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

const clearSupabaseBrowserSession = () => {
  Object.keys(window.localStorage).forEach((key) => {
    if (key.startsWith("sb-") && key.endsWith("-auth-token")) {
      window.localStorage.removeItem(key);
    }
  });
  Object.keys(window.sessionStorage).forEach((key) => {
    if (key.startsWith("sb-") && key.endsWith("-auth-token")) {
      window.sessionStorage.removeItem(key);
    }
  });
};

export function useLogoutConfirm() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    if (isLoggingOut) return;

    const confirmed = window.confirm("Yakin ingin logout dari AgriGrowth Monitor?");
    if (!confirmed) return;

    setIsLoggingOut(true);
    try {
      clearUser();
      await supabase.auth.signOut({ scope: "local" });
    } catch (error) {
      console.error("Failed to logout:", error);
    } finally {
      clearUser();
      clearSupabaseBrowserSession();
      window.location.replace("/");
    }
  };

  return { logout, isLoggingOut };
}
