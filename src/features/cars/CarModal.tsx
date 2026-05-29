"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { fetchCarById } from "@/services/carsApi";
import { useCarsStore } from "@/store/carsStore";
import type { Car } from "@/types/car";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { CarGallery } from "./CarGallery";

export function CarModal() {
  const selectedCarId = useCarsStore((s) => s.selectedCarId);
  const closeCar = useCarsStore((s) => s.closeCar);
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCarId) {
      setCar(null);
      return;
    }
    setLoading(true);
    fetchCarById(selectedCarId)
      .then(setCar)
      .catch(() => setCar(null))
      .finally(() => setLoading(false));
  }, [selectedCarId]);

  return (
    <Modal open={!!selectedCarId} onClose={closeCar}>
      <div className="max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-semibold">
            {car ? `${car.year} ${car.make} ${car.model}` : "Loading..."}
          </h2>
          <button type="button" onClick={closeCar} className="text-muted hover:text-foreground">
            Close
          </button>
        </div>

        {loading && <p className="text-muted">Loading car details...</p>}

        {car && !loading && (
          <div className="grid gap-6 lg:grid-cols-2">
            <CarGallery
              images={[...new Set([car.image, ...car.gallery])]}
              alt={`${car.make} ${car.model}`}
            />
            <div className="space-y-3">
              <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-400">
                {formatCurrency(car.price)}
              </p>
              <ul className="space-y-1 text-sm text-muted">
                <li>{formatNumber(car.mileage)} miles</li>
                <li>{car.fuelType} · {car.transmission}</li>
                <li>{car.location}</li>
              </ul>
              <p className="text-sm">{car.description}</p>
              <div className="flex gap-2 pt-2">
                <Button type="button">Book test drive</Button>
                <Button variant="secondary" type="button">
                  Contact
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
