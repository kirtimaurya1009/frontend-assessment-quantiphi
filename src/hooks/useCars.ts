"use client";

import { useEffect, useState } from "react";
import { fetchCars } from "@/services/carsApi";
import { useCarsStore } from "@/store/carsStore";
import { useDebounce } from "@/hooks/useDebounce";
import type { Car } from "@/types/car";

export function useCars() {
  const { filters, sort, page, limit } = useCarsStore();
  const search = useDebounce(filters.search, 300);
  const [cars, setCars] = useState<Car[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchCars(
          { ...filters, search },
          sort,
          page,
          limit,
        );
        if (cancelled) return;
        setTotal(result.total);
        setCars((prev) =>
          page > 1 ? [...prev, ...result.data] : result.data,
        );
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load cars");
          if (page === 1) setCars([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [filters, search, sort, page, limit, reload]);

  return {
    cars,
    total,
    loading,
    error,
    hasMore: cars.length < total,
    loadMore: () => {
      if (!loading && cars.length < total) {
        useCarsStore.getState().loadMore();
      }
    },
    refetch: () => {
      useCarsStore.setState({ page: 1 });
      setReload((n) => n + 1);
    },
  };
}
