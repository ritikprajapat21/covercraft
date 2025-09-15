"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { useAppStore } from "@/lib/store";

function Auth({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const setUser = useAppStore((s) => s.setUser);

  if (session.status === "authenticated") {
    setUser(session.data.user);
  }

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
