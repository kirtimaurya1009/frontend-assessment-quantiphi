export type FuelType = "Gasoline" | "Diesel" | "Electric" | "Hybrid";
export type Transmission = "Automatic" | "Manual";

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  price: number;
  location: string;
  image: string;
  gallery: string[];
  description: string;
}

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "year-asc";

export interface CarFilters {
  search: string;
  make: string;
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  fuelType: string;
  transmission: string;
}

export const DEFAULT_CAR_FILTERS: CarFilters = {
  search: "",
  make: "",
  minPrice: 0,
  maxPrice: 150000,
  minYear: 2015,
  maxYear: 2025,
  fuelType: "",
  transmission: "",
};
