// frontend/lib/services-api.ts
// Fetches live price/description data from Django and merges with static content

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ApiService {
  id: number;
  slug: string;
  name: string;
  short_desc: string;
  description: string;
  price_range: string;
  category: string;
  order: number;
}

export async function fetchServices(): Promise<ApiService[]> {
  try {
    const res = await fetch(`${API}/api/services/`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export function mergeServiceData(
  staticServices: readonly { slug: string; [key: string]: unknown }[],
  apiServices: ApiService[]
) {
  const apiMap = new Map(apiServices.map(s => [s.slug, s]));
  return staticServices.map(s => ({
    ...s,
    price_range: apiMap.get(s.slug)?.price_range ?? null,
    short_desc_api: apiMap.get(s.slug)?.short_desc ?? null,
  }));
}