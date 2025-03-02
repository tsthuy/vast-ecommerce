"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import type React from "react";

import { useAuthStore } from "~/stores/auth.store";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  return user ? <>{children}</> : null;
}
