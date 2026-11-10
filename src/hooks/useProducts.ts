import { useEffect, useState } from "react";
import { api } from "../api/client";
import { SEED_PRODUCTS, type Product } from "../data/catalog";

export function useProducts(): Product[] {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;
    api
      .products()
      .catch(() => SEED_PRODUCTS)
      .then((list) => {
        if (!cancelled) setProducts(list);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return products;
}
