import type { Metadata } from "next";
import { CarsListing } from "@/features/cars/CarsListing";

export const metadata: Metadata = {
  title: "Used Cars",
};

export default function CarsPage() {
  return <CarsListing />;
}
