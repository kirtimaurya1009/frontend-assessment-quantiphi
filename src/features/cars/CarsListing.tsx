"use client";

import { Button } from "@/components/ui/Button";
import { useCars } from "@/hooks/useCars";
import { CarCard } from "./CarCard";
import { CarFilters } from "./CarFilters";
import { CarGridSkeleton } from "./CarGridSkeleton";
import { CarModal } from "./CarModal";
import { CarsStats } from "./CarsStats";

export function CarsListing() {
  const { cars, total, loading, error, hasMore, loadMore, refetch } = useCars();

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      <header>
        <h1 className="text-3xl font-bold">Used Cars</h1>
        <p className="mt-1 text-muted">Browse inventory and filter by your preferences.</p>
      </header>

      <CarFilters />
      <CarsStats total={total} showing={cars.length} />

      {error && (
        <div className="glass rounded-2xl p-6 text-center text-rose-700 dark:text-rose-300" role="alert">
          <p>{error}</p>
          <Button className="mt-3" type="button" onClick={refetch}>
            Retry
          </Button>
        </div>
      )}

      {loading && cars.length === 0 ? (
        <CarGridSkeleton />
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {cars.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>

          {!loading && cars.length === 0 && !error && (
            <p className="glass rounded-2xl p-10 text-center text-muted">
              No cars match these filters.
            </p>
          )}

          {hasMore && (
            <div className="flex justify-center">
              <Button type="button" variant="secondary" onClick={loadMore} disabled={loading}>
                {loading ? "Loading..." : "Load more"}
              </Button>
            </div>
          )}
        </>
      )}

      <CarModal />
    </div>
  );
}
