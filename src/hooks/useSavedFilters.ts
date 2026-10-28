import { useState } from "react";
import {
  CATEGORIES,
  MANUFACTURERS,
  PRICE_MAX,
  PRICE_MIN,
} from "../data/catalog";
import type { Filters } from "../utils/filter";

const KEY = "techmet:filters";

export const DEFAULT_FILTERS: Filters = {
  search: "",
  price: [PRICE_MIN, PRICE_MAX],
  categories: [],
  manufacturers: [],
};

export function loadFilters(raw: string | null): Filters {
  if (!raw) return DEFAULT_FILTERS;
  try {
    const data = JSON.parse(raw) as Partial<Filters>;
    const [min, max] = Array.isArray(data.price) ? data.price.map(Number) : [];
    const priceOk =
      Number.isFinite(min) &&
      Number.isFinite(max) &&
      PRICE_MIN <= min &&
      min <= max &&
      max <= PRICE_MAX;
    return {
      search: typeof data.search === "string" ? data.search : "",
      price: priceOk ? [min, max] : DEFAULT_FILTERS.price,
      categories: (data.categories ?? []).filter((c) => CATEGORIES.includes(c)),
      manufacturers: (data.manufacturers ?? []).filter((m) =>
        MANUFACTURERS.includes(m),
      ),
    };
  } catch {
    return DEFAULT_FILTERS;
  }
}

function read(): Filters {
  try {
    return loadFilters(localStorage.getItem(KEY));
  } catch {
    return DEFAULT_FILTERS;
  }
}

export function useSavedFilters() {
  const [filters, setFilters] = useState<Filters>(read);

  const save = (next: Filters) => {
    setFilters(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      //
    }
  };

  return [filters, save] as const;
}
