const normalizeUrl = (url) => {
  if (!url) return null;
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

export const API_BASE_URL =
  normalizeUrl(import.meta.env.VITE_API_URL) ?? "http://localhost:3001";

export const apiPath = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
