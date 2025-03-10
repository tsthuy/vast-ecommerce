import { memo, useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthStore } from "~/stores/auth.store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = memo(function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isLoading && !user?.uid) {
      router.push(`/login?callbackUrl=${encodeURIComponent(router.asPath)}`);
    }
  }, [isLoading, router, user?.uid]);

  if (!user?.uid) {
    return null;
  }

  return <>{children}</>;
});
ProtectedRoute.displayName = "ProtectedRoute";
