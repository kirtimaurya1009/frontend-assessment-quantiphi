import { describe, expect, it } from "vitest";
import { MOCK_CARS } from "@/mocks/data/cars";
import { filterAndSortCars } from "@/utils/filterCars";
import { DEFAULT_CAR_FILTERS } from "@/types/car";

describe("filterAndSortCars", () => {
  it("filters by make", () => {
    const result = filterAndSortCars(
      MOCK_CARS,
      { ...DEFAULT_CAR_FILTERS, make: "BMW" },
      "price-asc",
    );
    expect(result.every((c) => c.make === "BMW")).toBe(true);
  });

  it("sorts by price descending", () => {
    const result = filterAndSortCars(
      MOCK_CARS,
      DEFAULT_CAR_FILTERS,
      "price-desc",
    );
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].price).toBeGreaterThanOrEqual(result[i].price);
    }
  });

  it("filters by search query", () => {
    const result = filterAndSortCars(
      MOCK_CARS,
      { ...DEFAULT_CAR_FILTERS, search: "tesla" },
      "price-asc",
    );
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].make).toBe("Tesla");
  });
});
