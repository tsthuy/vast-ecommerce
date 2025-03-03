import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "~/stores/auth.store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  console.log(router.pathname);
  const { user, setCallbackUrl } = useAuthStore();

  useEffect(() => {
    if (!user?.uid) {
      setCallbackUrl(router.asPath);
      router.push("/login");
    }
  }, [user?.uid, setCallbackUrl]);

  if (!user?.uid) {
    return null;
  }

  return <>{children}</>;
}
