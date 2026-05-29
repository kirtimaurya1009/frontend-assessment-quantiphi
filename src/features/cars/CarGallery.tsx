"use client";

import Image from "next/image";
import { useState } from "react";

const PLACEHOLDER_IMAGE = "/placeholder-car.svg";

export function CarGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [usePlaceholder, setUsePlaceholder] = useState(false);
  const list = images.length ? images : [PLACEHOLDER_IMAGE];
  const current = list[index] ?? PLACEHOLDER_IMAGE;
  const src = usePlaceholder ? PLACEHOLDER_IMAGE : current;

  const goTo = (next: number) => {
    setIndex(next);
    setUsePlaceholder(false); // try the real image again when user navigates
  };

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <Image
          key={`${index}-${current}`}
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="800px"
          onError={() => setUsePlaceholder(true)}
        />
      </div>
      {list.length > 1 && (
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-[var(--border)] px-3 py-1 text-sm text-foreground hover:bg-black/5 dark:hover:bg-white/5"
            onClick={() => goTo((index - 1 + list.length) % list.length)}
          >
            Prev
          </button>
          <button
            type="button"
            className="rounded-lg border border-[var(--border)] px-3 py-1 text-sm text-foreground hover:bg-black/5 dark:hover:bg-white/5"
            onClick={() => goTo((index + 1) % list.length)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
