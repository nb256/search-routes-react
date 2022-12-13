export type City = {
  name: string;
  lat: number;
  lng: number;
};

export type SearchCitiesResponse = {
  result?: City[];
  success: boolean;
};
