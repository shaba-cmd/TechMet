import type { Category, Manufacturer, Product, TabId } from "../data/catalog";

export type SortOrder = "default" | "price-asc" | "price-desc" | "title";

export const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "default", label: "Сортировать" },
  { value: "price-asc", label: "Сначала дешевле" },
  { value: "price-desc", label: "Сначала дороже" },
  { value: "title", label: "По названию" },
];

export interface Filters {
  search: string;
  price: [number, number];
  categories: Category[];
  manufacturers: Manufacturer[];
}

export function filterProducts(
  products: Product[],
  tab: TabId,
  filters: Filters,
): Product[] {
  const query = filters.search.trim().toLowerCase();
  const [min, max] = filters.price;

  return products.filter(
    (p) =>
      p.tab === tab &&
      (query === "" ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)) &&
      p.pricePerHour >= min &&
      p.pricePerHour <= max &&
      (filters.categories.length === 0 ||
        filters.categories.includes(p.category)) &&
      (filters.manufacturers.length === 0 ||
        filters.manufacturers.includes(p.manufacturer)),
  );
}

export function sortProducts(products: Product[], order: SortOrder): Product[] {
  const sorted = [...products];
  switch (order) {
    case "price-asc":
      return sorted.sort((a, b) => a.pricePerHour - b.pricePerHour);
    case "price-desc":
      return sorted.sort((a, b) => b.pricePerHour - a.pricePerHour);
    case "title":
      return sorted.sort((a, b) => a.title.localeCompare(b.title, "ru"));
    default:
      return sorted;
  }
}

export interface Page<T> {
  items: T[];
  page: number;
  pageCount: number;
  from: number;
  to: number;
}

export function paginate<T>(list: T[], page: number, perPage: number): Page<T> {
  const pageCount = Math.max(1, Math.ceil(list.length / perPage));
  const current = Math.min(Math.max(1, page), pageCount);
  const start = (current - 1) * perPage;
  const items = list.slice(start, start + perPage);
  return {
    items,
    page: current,
    pageCount,
    from: items.length ? start + 1 : 0,
    to: start + items.length,
  };
}

export function pageNumbers(
  current: number,
  total: number,
  window = 9,
): (number | "…")[] {
  if (total <= window) return Array.from({ length: total }, (_, i) => i + 1);

  const inner = window - 2;
  let start = Math.max(2, current - Math.floor(inner / 2));
  const end = Math.min(total - 1, start + inner - 1);
  start = Math.max(2, end - inner + 1);

  const result: (number | "…")[] = [1];
  if (start > 2) result.push("…");
  for (let i = start; i <= end; i++) result.push(i);
  if (end < total - 1) result.push("…");
  result.push(total);
  return result;
}

export function formatPrice(value: number): string {
  return value.toLocaleString("ru-RU").replace(/\u00a0/g, " ");
}
