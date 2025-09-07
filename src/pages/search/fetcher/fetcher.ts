// fetcher.ts
import { Product, Service } from "../type/type";

export async function searchItems(query: string): Promise<{ products: Product[]; services: Service[] }> {
  const response = await fetch(`http://localhost:8000/api/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error("Search failed");
  const res = await response.json();

  return {
    products: res.data?.products || [],
    services: res.data?.services || [],
  };
}
