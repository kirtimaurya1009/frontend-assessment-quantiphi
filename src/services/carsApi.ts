import type { Car, CarFilters, SortOption } from "@/types/car";

export interface CarsListResponse {
  data: Car[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function buildQuery(
  filters: CarFilters,
  sort: SortOption,
  page: number,
  limit: number,
): string {
  const params = new URLSearchParams();
  // empty make/fuel = "all"; price/year bounds always go on the query string
  if (filters.search) params.set("search", filters.search);
  if (filters.make) params.set("make", filters.make);
  params.set("minPrice", String(filters.minPrice));
  params.set("maxPrice", String(filters.maxPrice));
  params.set("minYear", String(filters.minYear));
  params.set("maxYear", String(filters.maxYear));
  if (filters.fuelType) params.set("fuelType", filters.fuelType);
  if (filters.transmission) params.set("transmission", filters.transmission);
  params.set("sort", sort);
  params.set("page", String(page));
  params.set("limit", String(limit));
  return params.toString();
}

export async function fetchCars(
  filters: CarFilters,
  sort: SortOption,
  page: number,
  limit: number,
): Promise<CarsListResponse> {
  const query = buildQuery(filters, sort, page, limit);
  const res = await fetch(`/api/cars?${query}`);
  if (!res.ok) {
    throw new Error("Failed to load vehicles");
  }
  return res.json() as Promise<CarsListResponse>;
}

export async function fetchCarById(id: string): Promise<Car> {
  const res = await fetch(`/api/cars/${id}`);
  if (!res.ok) {
    throw new Error("Vehicle not found");
  }
  return res.json() as Promise<Car>;
}
