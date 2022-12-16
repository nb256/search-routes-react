import { SearchCitiesResponse } from "../types";
import delay from "../utils/delay";
import cities from "./cities";

export default async function searchCities(
  query: string
): Promise<SearchCitiesResponse> {
  // a fake delay to simulate a network request
  await delay(500);

  // return error if query is 'fail'
  if (query.toLowerCase() === "fail") {
    return { success: false };
  }

  const result = cities
    .filter(([name]) => name.toLowerCase().includes(query.toLowerCase()))
    .map(([name, lat, lng]) => ({ name, lat, lng }));

  return { result, success: true };
}
