import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthStore } from "~/stores/auth.store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isLoading, setCallbackUrl } = useAuthStore();

  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isLoading && !user?.uid) {
      setCallbackUrl(router.asPath);
      router.push("/login");
    }
  }, [user?.uid, isLoading]);

  if (!user?.uid) {
    return null;
  }

  return <>{children}</>;
}
