import { NextRequest, NextResponse } from "next/server";
import { MOCK_CARS } from "@/mocks/data/cars";
import { filterAndSortCars } from "@/utils/filterCars";
import type { CarFilters, SortOption } from "@/types/car";
import { DEFAULT_CAR_FILTERS } from "@/types/car";

function parseFilters(searchParams: URLSearchParams): CarFilters {
  return {
    search: searchParams.get("search") ?? DEFAULT_CAR_FILTERS.search,
    make: searchParams.get("make") ?? DEFAULT_CAR_FILTERS.make,
    minPrice: Number(searchParams.get("minPrice") ?? DEFAULT_CAR_FILTERS.minPrice),
    maxPrice: Number(searchParams.get("maxPrice") ?? DEFAULT_CAR_FILTERS.maxPrice),
    minYear: Number(searchParams.get("minYear") ?? DEFAULT_CAR_FILTERS.minYear),
    maxYear: Number(searchParams.get("maxYear") ?? DEFAULT_CAR_FILTERS.maxYear),
    fuelType: searchParams.get("fuelType") ?? DEFAULT_CAR_FILTERS.fuelType,
    transmission:
      searchParams.get("transmission") ?? DEFAULT_CAR_FILTERS.transmission,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const filters = parseFilters(searchParams);
  const sort = (searchParams.get("sort") ?? "price-asc") as SortOption;
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "6");

  const filtered = filterAndSortCars(MOCK_CARS, filters, sort);
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return NextResponse.json({
    data,
    total: filtered.length,
    page,
    limit,
    totalPages: Math.ceil(filtered.length / limit) || 1,
  });
}
