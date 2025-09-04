import { Database } from "bun:sqlite";

const bunDb = new Database("./db.sqlite", { create: true });
