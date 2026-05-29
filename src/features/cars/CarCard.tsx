"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import type { Car } from "@/types/car";
import { useCarsStore } from "@/store/carsStore";

const PLACEHOLDER_IMAGE = "/placeholder-car.svg";

export function CarCard({ car, index }: { car: Car; index: number }) {
  const openCar = useCarsStore((s) => s.openCar);
  const [imageSrc, setImageSrc] = useState(car.image);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="glass cursor-pointer overflow-hidden rounded-2xl"
      onClick={() => openCar(car.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") openCar(car.id);
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageSrc}
          alt={`${car.make} ${car.model}`}
          fill
          className="object-cover transition duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          onError={() => setImageSrc(PLACEHOLDER_IMAGE)}
        />
        <p className="absolute bottom-2 left-3 font-semibold text-white">
          {formatCurrency(car.price)}
        </p>
      </div>
      <div className="p-4">
        <h3 className="font-semibold">
          {car.year} {car.make} {car.model}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {formatNumber(car.mileage)} mi · {car.fuelType}
        </p>
      </div>
    </motion.article>
  );
}
