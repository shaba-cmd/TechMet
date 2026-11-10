import crypto from "node:crypto";
import { ADMIN_LOGIN, ADMIN_PASSWORD } from "./config.js";

const SESSION_HOURS = 8;
const sessions = new Map();

function same(a, b) {
  const x = crypto.createHash("sha256").update(String(a)).digest();
  const y = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
}

export function login(loginName, password) {
  const loginOk = same(loginName, ADMIN_LOGIN);
  const passwordOk = same(password, ADMIN_PASSWORD);
  if (!loginOk || !passwordOk) return null;
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, Date.now() + SESSION_HOURS * 3600 * 1000);
  return token;
}

function tokenOf(req) {
  const header = req.headers.authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7) : "";
}

export function logout(req) {
  sessions.delete(tokenOf(req));
}

export function requireAdmin(req, res, next) {
  const token = tokenOf(req);
  const expires = sessions.get(token);
  if (!expires || expires < Date.now()) {
    sessions.delete(token);
    return res.status(401).json({ error: "Требуется вход" });
  }
  next();
}
