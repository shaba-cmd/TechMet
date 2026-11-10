import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const PORT = Number(process.env.PORT) || 3001;

export const ADMIN_LOGIN = process.env.ADMIN_LOGIN || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "igr2007";

export const DB_FILE = path.join(root, "server", "data", "db.json");
export const UPLOADS_DIR = path.join(root, "server", "uploads");
export const SEED_FILE = path.join(root, "src", "data", "products.json");
export const DICTIONARIES_FILE = path.join(
  root,
  "src",
  "data",
  "dictionaries.json",
);
export const DIST_DIR = path.join(root, "dist");
