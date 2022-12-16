import delay from "../utils/delay";
import calculateDistance from "./calculateDistance";

export default async function calculateDistances(cities: string[]) {
  // Simulate a network request
  await delay(500);
  const distances = [] as number[];
  cities.forEach((city, index) => {
    const nextCity = cities[index + 1];
    if (nextCity) {
      const distance = calculateDistance(city, nextCity);
      distances.push(distance);
    }
  });

  return distances;
}
