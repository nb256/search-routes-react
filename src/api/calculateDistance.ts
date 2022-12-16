import cities from "./cities";

export default function calculateDistance(city1: string, city2: string) {
  const cityOne = cities.find((city) => city[0] === city1);
  const cityTwo = cities.find((city) => city[0] === city2);

  if (!cityOne || !cityTwo) {
    throw new Error("City not found");
  }

  // use the haversine formula to calculate the distance between the two cities
  const R = 6371e3; // metres
  const φ1 = (cityOne[1] * Math.PI) / 180; // φ, λ in radians
  const φ2 = (cityTwo[1] * Math.PI) / 180;
  const Δφ = ((cityTwo[1] - cityOne[1]) * Math.PI) / 180;
  const Δλ = ((cityTwo[2] - cityOne[2]) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
}
