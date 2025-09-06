import { drizzle } from "drizzle-orm/postgres-js";
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from "./schema";

const db = drizzle(process.env.DATABASE_URL || "");

export { db, users, accounts, sessions, verificationTokens, authenticators };
