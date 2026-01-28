import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("🟢 Conectado a PostgreSQL");
});

pool.on("error", (err) => {
  console.error("🔴 Error inesperado en PostgreSQL", err);
});

export const query = (text: string, params?: any[]) =>
  pool.query(text, params);