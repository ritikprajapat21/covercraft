import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    isPro?: boolean;
  }
  interface Session {
    user: {
      isPro?: boolean;
    } & DefaultSession["user"];
  }
}
