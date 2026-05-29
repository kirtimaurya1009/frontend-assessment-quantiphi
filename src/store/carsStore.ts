import { create } from "zustand";
import type { CarFilters, SortOption } from "@/types/car";
import { DEFAULT_CAR_FILTERS } from "@/types/car";

export const useCarsStore = create<{
  filters: CarFilters;
  sort: SortOption;
  page: number;
  limit: number;
  selectedCarId: string | null;
  setFilters: (filters: Partial<CarFilters>) => void;
  resetFilters: () => void;
  setSort: (sort: SortOption) => void;
  loadMore: () => void;
  openCar: (id: string) => void;
  closeCar: () => void;
}>((set) => ({
  filters: { ...DEFAULT_CAR_FILTERS },
  sort: "price-asc",
  page: 1,
  limit: 6,
  selectedCarId: null,

  setFilters: (partial) =>
    set((s) => ({ filters: { ...s.filters, ...partial }, page: 1 })),

  resetFilters: () => set({ filters: { ...DEFAULT_CAR_FILTERS }, page: 1 }),

  setSort: (sort) => set({ sort, page: 1 }),

  loadMore: () => set((s) => ({ page: s.page + 1 })),

  openCar: (id) => set({ selectedCarId: id }),
  closeCar: () => set({ selectedCarId: null }),
}));
