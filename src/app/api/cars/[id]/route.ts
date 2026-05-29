import { NextRequest, NextResponse } from "next/server";
import { getCarById } from "@/mocks/data/cars";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const car = getCarById(id);

  if (!car) {
    return NextResponse.json({ message: "Car not found" }, { status: 404 });
  }

  return NextResponse.json(car);
}
