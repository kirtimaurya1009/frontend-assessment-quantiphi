import { http, HttpResponse } from "msw";
import { MOCK_CARS, getCarById } from "@/mocks/data/cars";
import { filterAndSortCars } from "@/utils/filterCars";
import type { CarFilters, SortOption } from "@/types/car";
import { DEFAULT_CAR_FILTERS } from "@/types/car";

function parseFilters(url: URL): CarFilters {
  return {
    search: url.searchParams.get("search") ?? DEFAULT_CAR_FILTERS.search,
    make: url.searchParams.get("make") ?? DEFAULT_CAR_FILTERS.make,
    minPrice: Number(url.searchParams.get("minPrice") ?? DEFAULT_CAR_FILTERS.minPrice),
    maxPrice: Number(url.searchParams.get("maxPrice") ?? DEFAULT_CAR_FILTERS.maxPrice),
    minYear: Number(url.searchParams.get("minYear") ?? DEFAULT_CAR_FILTERS.minYear),
    maxYear: Number(url.searchParams.get("maxYear") ?? DEFAULT_CAR_FILTERS.maxYear),
    fuelType: url.searchParams.get("fuelType") ?? DEFAULT_CAR_FILTERS.fuelType,
    transmission:
      url.searchParams.get("transmission") ?? DEFAULT_CAR_FILTERS.transmission,
  };
}

export const handlers = [
  http.get("/api/cars", ({ request }) => {
    const url = new URL(request.url);
    const filters = parseFilters(url);
    const sort = (url.searchParams.get("sort") ?? "price-asc") as SortOption;
    const page = Number(url.searchParams.get("page") ?? "1");
    const limit = Number(url.searchParams.get("limit") ?? "6");

    const filtered = filterAndSortCars(MOCK_CARS, filters, sort);
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return HttpResponse.json({
      data,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit) || 1,
    });
  }),

  http.get("/api/cars/:id", ({ params }) => {
    const car = getCarById(String(params.id));
    if (!car) {
      return HttpResponse.json({ message: "Car not found" }, { status: 404 });
    }
    return HttpResponse.json(car);
  }),
];
