import type { Product } from "../data/catalog";

const TOKEN_KEY = "techmet:admin-token";

export type ProductData = Omit<Product, "id">;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) =>
  sessionStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => sessionStorage.removeItem(TOKEN_KEY);

async function request<T>(
  path: string,
  method = "GET",
  body?: unknown,
): Promise<T> {
  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";

  let response: Response;
  try {
    response = await fetch(`/api${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(
      0,
      "Сервер недоступен. Запустите его командой npm run server",
    );
  }

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  if (!isJson)
    throw new ApiError(
      response.status,
      "Сервер недоступен. Запустите его командой npm run server",
    );

  const data = await response.json();
  if (!response.ok)
    throw new ApiError(response.status, data.error ?? "Ошибка сервера");
  return data as T;
}

export const api = {
  products: () => request<Product[]>("/products"),
  login: (login: string, password: string) =>
    request<{ token: string }>("/login", "POST", { login, password }),
  logout: () => request<{ ok: true }>("/logout", "POST"),
  me: () => request<{ ok: true }>("/me"),
  create: (data: ProductData) => request<Product>("/products", "POST", data),
  update: (id: number, data: ProductData) =>
    request<Product>(`/products/${id}`, "PUT", data),
  remove: (id: number) => request<{ ok: true }>(`/products/${id}`, "DELETE"),
  upload: (dataUrl: string) =>
    request<{ url: string }>("/upload", "POST", { dataUrl }),
};
