"use client";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { formatNumber } from "@/lib/utils";
import { useCarsStore } from "@/store/carsStore";
import type { SortOption } from "@/types/car";
import { MOCK_CARS } from "@/mocks/data/cars";
import { getUniqueMakes } from "@/utils/filterCars";

const makes = getUniqueMakes(MOCK_CARS);

export function CarFilters() {
  const filters = useCarsStore((s) => s.filters);
  const sort = useCarsStore((s) => s.sort);
  const setFilters = useCarsStore((s) => s.setFilters);
  const setSort = useCarsStore((s) => s.setSort);
  const resetFilters = useCarsStore((s) => s.resetFilters);

  return (
    <section className="glass space-y-4 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium">Filters</h2>
        <Button variant="ghost" type="button" onClick={resetFilters}>
          Reset
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block text-sm sm:col-span-2 lg:col-span-3">
          <span className="text-muted">Search</span>
          <Input
            className="mt-1"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            placeholder="Make, model, city..."
          />
        </label>

        <label className="block text-sm">
          <span className="text-muted">Make</span>
          <Select
            className="mt-1"
            value={filters.make}
            onChange={(e) => setFilters({ make: e.target.value })}
          >
            <option value="">All</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
        </label>

        <label className="block text-sm">
          <span className="text-muted">Fuel</span>
          <Select
            className="mt-1"
            value={filters.fuelType}
            onChange={(e) => setFilters({ fuelType: e.target.value })}
          >
            <option value="">All</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </Select>
        </label>

        <label className="block text-sm">
          <span className="text-muted">Transmission</span>
          <Select
            className="mt-1"
            value={filters.transmission}
            onChange={(e) => setFilters({ transmission: e.target.value })}
          >
            <option value="">All</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </Select>
        </label>

        <label className="block text-sm">
          <span className="text-muted">Min price: ${formatNumber(filters.minPrice)}</span>
          <input
            type="range"
            min={0}
            max={150000}
            step={5000}
            value={filters.minPrice}
            onChange={(e) => setFilters({ minPrice: Number(e.target.value) })}
            className="mt-2 w-full accent-cyan-500"
          />
        </label>

        <label className="block text-sm">
          <span className="text-muted">Max price: ${formatNumber(filters.maxPrice)}</span>
          <input
            type="range"
            min={0}
            max={150000}
            step={5000}
            value={filters.maxPrice}
            onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
            className="mt-2 w-full accent-cyan-500"
          />
        </label>

        <label className="block text-sm">
          <span className="text-muted">From year: {filters.minYear}</span>
          <input
            type="range"
            min={2015}
            max={2025}
            value={filters.minYear}
            onChange={(e) => setFilters({ minYear: Number(e.target.value) })}
            className="mt-2 w-full accent-cyan-500"
          />
        </label>

        <label className="block text-sm">
          <span className="text-muted">Sort</span>
          <Select
            className="mt-1"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
          >
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="year-desc">Newest</option>
            <option value="year-asc">Oldest</option>
          </Select>
        </label>
      </div>
    </section>
  );
}
