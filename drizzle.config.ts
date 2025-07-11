import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config();

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./migrations",
  driver: "pg", 
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
});
