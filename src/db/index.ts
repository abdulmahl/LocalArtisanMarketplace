import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });

//define sql connection string...
const sql = neon(`${process.env.DATABASE_URL}`);

//define and export database...
// const db = drizzle(sql, { logger: true });
const db = drizzle(sql);

export { db };
