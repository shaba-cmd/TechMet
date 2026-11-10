import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import express from "express";
import { login, logout, requireAdmin } from "./auth.js";
import { DIST_DIR, PORT, UPLOADS_DIR } from "./config.js";
import * as db from "./db.js";

const app = express();
app.use(express.json({ limit: "8mb" }));
const attempts = new Map();
function loginLimit(req, res, next) {
  const now = Date.now();
  const recent = (attempts.get(req.ip) || []).filter(
    (t) => now - t < 10 * 60 * 1000,
  );
  if (recent.length >= 10)
    return res
      .status(429)
      .json({ error: "Слишком много попыток, попробуйте позже" });
  attempts.set(req.ip, [...recent, now]);
  next();
}

app.post("/api/login", loginLimit, (req, res) => {
  const token = login(req.body?.login, req.body?.password);
  if (!token)
    return res.status(401).json({ error: "Неверный логин или пароль" });
  res.json({ token });
});

app.post("/api/logout", (req, res) => {
  logout(req);
  res.json({ ok: true });
});

app.get("/api/me", requireAdmin, (_req, res) => res.json({ ok: true }));

app.get("/api/products", (_req, res) => res.json(db.getAll()));

app.post("/api/products", requireAdmin, (req, res) => {
  const { product, error } = db.validate(req.body || {});
  if (error) return res.status(400).json({ error });
  res.status(201).json(db.create(product));
});

app.put("/api/products/:id", requireAdmin, (req, res) => {
  const { product, error } = db.validate(req.body || {});
  if (error) return res.status(400).json({ error });
  const saved = db.update(Number(req.params.id), product);
  if (!saved) return res.status(404).json({ error: "Карточка не найдена" });
  res.json(saved);
});

app.delete("/api/products/:id", requireAdmin, (req, res) => {
  if (!db.remove(Number(req.params.id)))
    return res.status(404).json({ error: "Карточка не найдена" });
  res.json({ ok: true });
});

const IMAGE_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

app.post("/api/upload", requireAdmin, (req, res) => {
  const match = /^data:(image\/[a-z]+);base64,([A-Za-z0-9+/=]+)$/.exec(
    req.body?.dataUrl || "",
  );
  const ext = match && IMAGE_TYPES[match[1]];
  if (!ext)
    return res.status(400).json({ error: "Нужен файл JPG, PNG или WebP" });
  const data = Buffer.from(match[2], "base64");
  if (data.length > 5 * 1024 * 1024)
    return res.status(400).json({ error: "Файл больше 5 МБ" });

  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  const name = `${crypto.randomBytes(8).toString("hex")}.${ext}`;
  fs.writeFileSync(path.join(UPLOADS_DIR, name), data);
  res.status(201).json({ url: `/uploads/${name}` });
});

app.use("/uploads", express.static(UPLOADS_DIR));

app.use(express.static(DIST_DIR));

app.use("/api", (_req, res) => res.status(404).json({ error: "Не найдено" }));

app.use((err, _req, res, _next) => {
  if (err.type === "entity.too.large")
    return res.status(413).json({ error: "Файл слишком большой" });
  if (err.type === "entity.parse.failed")
    return res.status(400).json({ error: "Некорректный запрос" });
  console.error(err);
  res.status(500).json({ error: "Ошибка сервера" });
});

app.listen(PORT, () => {
  console.log(`Сервер ТехМЕТ: http://localhost:${PORT}`);
  console.log(`Админ-панель:  http://localhost:${PORT}/#/admin`);
});
