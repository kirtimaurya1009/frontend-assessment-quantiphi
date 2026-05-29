import type { Car, CarFilters, SortOption } from "@/types/car";

/* Shared between the real API route and MSW — keep behaviour in sync. */
export function filterAndSortCars(
  cars: Car[],
  filters: CarFilters,
  sort: SortOption,
): Car[] {
  const search = filters.search.toLowerCase().trim();

  let result = cars.filter((car) => {
    if (search) {
      const haystack =
        `${car.make} ${car.model} ${car.year} ${car.location}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    if (filters.make && car.make !== filters.make) return false;
    if (car.price < filters.minPrice || car.price > filters.maxPrice)
      return false;
    if (car.year < filters.minYear || car.year > filters.maxYear) return false;
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
    if (filters.transmission && car.transmission !== filters.transmission)
      return false;
    return true;
  });

  result = [...result].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "year-desc":
        return b.year - a.year;
      case "year-asc":
        return a.year - b.year;
      default:
        return 0;
    }
  });

  return result;
}

export function getUniqueMakes(cars: Car[]): string[] {
  return [...new Set(cars.map((c) => c.make))].sort();
}

export function getPriceBounds(cars: Car[]): { min: number; max: number } {
  if (cars.length === 0) return { min: 0, max: 150000 };
  return {
    min: Math.min(...cars.map((c) => c.price)),
    max: Math.max(...cars.map((c) => c.price)),
  };
}
