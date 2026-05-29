import type { Car } from "@/types/car";

export const MOCK_CARS: Car[] = [
  {
    id: "1",
    make: "BMW",
    model: "M4 Competition",
    year: 2023,
    mileage: 12400,
    fuelType: "Gasoline",
    transmission: "Automatic",
    price: 78900,
    location: "Los Angeles, CA",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80",
    ],
    description:
      "Immaculate M4 Competition with carbon bucket seats, executive package, and full dealer service history.",
  },
  {
    id: "2",
    make: "Mercedes-Benz",
    model: "AMG GT 53",
    year: 2022,
    mileage: 18200,
    fuelType: "Hybrid",
    transmission: "Automatic",
    price: 92500,
    location: "Miami, FL",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
    ],
    description:
      "Elegant four-door coupe blending AMG performance with everyday luxury and advanced driver assistance.",
  },
  {
    id: "3",
    make: "Porsche",
    model: "911 Carrera S",
    year: 2021,
    mileage: 22100,
    fuelType: "Gasoline",
    transmission: "Automatic",
    price: 118500,
    location: "San Francisco, CA",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
    ],
    description:
      "Iconic rear-engine sports car with Sport Chrono, PASM, and premium interior in Chalk over black leather.",
  },
  {
    id: "4",
    make: "Audi",
    model: "RS6 Avant",
    year: 2023,
    mileage: 9800,
    fuelType: "Gasoline",
    transmission: "Automatic",
    price: 105900,
    location: "Seattle, WA",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80",
    ],
    description:
      "Super-wagon with 591 hp, quattro AWD, and a perfect blend of family practicality and supercar pace.",
  },
  {
    id: "5",
    make: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    mileage: 5200,
    fuelType: "Electric",
    transmission: "Automatic",
    price: 89990,
    location: "Austin, TX",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
    ],
    description:
      "Tri-motor flagship with yoke steering, full self-driving capability, and sub-2-second 0-60 acceleration.",
  },
  {
    id: "6",
    make: "Ford",
    model: "Mustang GT Premium",
    year: 2020,
    mileage: 34500,
    fuelType: "Gasoline",
    transmission: "Manual",
    price: 38900,
    location: "Denver, CO",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80",
    ],
    description:
      "5.0L V8 with MagneRide, Brembo brakes, and a six-speed manual for the purist driver.",
  },
  {
    id: "7",
    make: "Toyota",
    model: "GR Supra 3.0",
    year: 2022,
    mileage: 15600,
    fuelType: "Gasoline",
    transmission: "Automatic",
    price: 54900,
    location: "Portland, OR",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
    ],
    description:
      "Inline-six turbo with adaptive suspension, JBL audio, and striking Renaissance Red paint.",
  },
  {
    id: "8",
    make: "Land Rover",
    model: "Range Rover Sport",
    year: 2023,
    mileage: 11200,
    fuelType: "Hybrid",
    transmission: "Automatic",
    price: 96800,
    location: "New York, NY",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80",
    ],
    description:
      "P400e plug-in hybrid with Meridian surround sound, air suspension, and panoramic roof.",
  },
  {
    id: "9",
    make: "Chevrolet",
    model: "Corvette Stingray",
    year: 2021,
    mileage: 19800,
    fuelType: "Gasoline",
    transmission: "Automatic",
    price: 72900,
    location: "Chicago, IL",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&q=80",
    ],
    description:
      "Mid-engine C8 with Z51 package, front lift, and 2LT trim in Torch Red.",
  },
  {
    id: "10",
    make: "Volkswagen",
    model: "Golf R",
    year: 2022,
    mileage: 21400,
    fuelType: "Gasoline",
    transmission: "Automatic",
    price: 42900,
    location: "Boston, MA",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80",
    ],
    description:
      "315 hp hot hatch with 4Motion AWD, Akrapovič exhaust, and lap-timer display.",
  },
  {
    id: "11",
    make: "Lexus",
    model: "LC 500",
    year: 2020,
    mileage: 28900,
    fuelType: "Gasoline",
    transmission: "Automatic",
    price: 79900,
    location: "Phoenix, AZ",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80",
    ],
    description:
      "Naturally aspirated 5.0L V8 grand tourer with Mark Levinson audio and structural blue paint.",
  },
  {
    id: "12",
    make: "Rivian",
    model: "R1T Adventure",
    year: 2023,
    mileage: 14300,
    fuelType: "Electric",
    transmission: "Automatic",
    price: 72900,
    location: "Salt Lake City, UT",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
    ],
    description:
      "Quad-motor electric truck with camp kitchen, off-road package, and large battery pack.",
  },
  {
    id: "13",
    make: "Honda",
    model: "Civic Type R",
    year: 2024,
    mileage: 3200,
    fuelType: "Gasoline",
    transmission: "Manual",
    price: 48900,
    location: "Atlanta, GA",
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80",
    ],
    description:
      "Latest FL5 Type R with Brembo brakes, limited-slip diff, and championship white finish.",
  },
  {
    id: "14",
    make: "Jeep",
    model: "Wrangler Rubicon 392",
    year: 2022,
    mileage: 26700,
    fuelType: "Gasoline",
    transmission: "Automatic",
    price: 62900,
    location: "Nashville, TN",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
    ],
    description:
      "6.4L HEMI V8 off-roader with Fox shocks, steel bumpers, and removable top.",
  },
];

export function getCarById(id: string): Car | undefined {
  return MOCK_CARS.find((car) => car.id === id);
}
