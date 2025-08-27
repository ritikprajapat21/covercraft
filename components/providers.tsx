"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export default function Providers({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) {
  return (
    <SessionProvider>
      <ThemeProvider {...props}>{children}</ThemeProvider>
    </SessionProvider>
  );
}
