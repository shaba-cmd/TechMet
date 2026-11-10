import fs from "node:fs";
import path from "node:path";
import { DB_FILE, DICTIONARIES_FILE, SEED_FILE } from "./config.js";

const dictionaries = JSON.parse(fs.readFileSync(DICTIONARIES_FILE, "utf8"));
const TAB_IDS = dictionaries.tabs.map((t) => t.id);

function read() {
  if (!fs.existsSync(DB_FILE)) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.copyFileSync(SEED_FILE, DB_FILE);
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function write(products) {
  const tmp = DB_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(products, null, 2) + "\n");
  fs.renameSync(tmp, DB_FILE);
}

export function validate(body) {
  const text = (v) => (typeof v === "string" ? v.trim() : "");
  const title = text(body.title);
  const description = text(body.description);
  const image = text(body.image);
  const pricePerHour = Number(body.pricePerHour);
  const minHours = Number(body.minHours);

  if (!title || title.length > 80)
    return { error: "Укажите название (до 80 символов)" };
  if (!TAB_IDS.includes(body.tab)) return { error: "Неизвестный раздел" };
  if (!dictionaries.categories.includes(body.category))
    return { error: "Неизвестная категория" };
  if (!dictionaries.manufacturers.includes(body.manufacturer))
    return { error: "Неизвестный производитель" };
  if (
    !Number.isInteger(pricePerHour) ||
    pricePerHour < 0 ||
    pricePerHour > 10000
  )
    return { error: "Цена — целое число от 0 до 10 000" };
  if (!Number.isInteger(minHours) || minHours < 1 || minHours > 24)
    return { error: "Минимальный заказ — от 1 до 24 часов" };
  if (!description || description.length > 500)
    return { error: "Укажите описание (до 500 символов)" };
  if (!/^\/(equipment|uploads)\/[\w.-]+$/.test(image))
    return { error: "Загрузите изображение" };

  const specs = {};
  if (
    body.specs &&
    typeof body.specs === "object" &&
    !Array.isArray(body.specs)
  ) {
    for (const [name, value] of Object.entries(body.specs).slice(0, 10)) {
      if (text(name) && text(value))
        specs[text(name).slice(0, 60)] = text(value).slice(0, 60);
    }
  }

  return {
    product: {
      tab: body.tab,
      title,
      image,
      category: body.category,
      manufacturer: body.manufacturer,
      pricePerHour,
      minHours,
      description,
      specs,
    },
  };
}

export const getAll = () => read();

export function create(data) {
  const products = read();
  const id = products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  const product = { id, ...data };
  write([...products, product]);
  return product;
}

export function update(id, data) {
  const products = read();
  if (!products.some((p) => p.id === id)) return null;
  const product = { id, ...data };
  write(products.map((p) => (p.id === id ? product : p)));
  return product;
}

export function remove(id) {
  const products = read();
  if (!products.some((p) => p.id === id)) return false;
  write(products.filter((p) => p.id !== id));
  return true;
}
