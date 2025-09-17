"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

function Auth({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const setUser = useAppStore((s) => s.setUser);

  useEffect(() => {
    if (session.status === "authenticated") {
      setUser(session.data.user);
    } else {
      setUser(null);
    }
  }, [session, setUser]);

  return <main>{children}</main>;
}

export default function Providers({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) {
  return (
    <SessionProvider>
      <ThemeProvider {...props}>
        <Auth>{children}</Auth>
      </ThemeProvider>
    </SessionProvider>
  );
}
