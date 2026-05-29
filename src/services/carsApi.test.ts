import { describe, expect, it } from "vitest";
import { fetchCars, fetchCarById } from "@/services/carsApi";
import { DEFAULT_CAR_FILTERS } from "@/types/car";

describe("cars API", () => {
  it("fetches paginated cars", async () => {
    const result = await fetchCars(DEFAULT_CAR_FILTERS, "price-asc", 1, 6);
    expect(result.data.length).toBeLessThanOrEqual(6);
    expect(result.total).toBeGreaterThanOrEqual(result.data.length);
  });

  it("fetches car by id", async () => {
    const car = await fetchCarById("1");
    expect(car.id).toBe("1");
    expect(car.make).toBeTruthy();
  });

  it("returns 404 for unknown id", async () => {
    await expect(fetchCarById("missing")).rejects.toThrow();
  });
});
