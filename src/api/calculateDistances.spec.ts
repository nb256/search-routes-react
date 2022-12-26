import calculateDistances from "./calculateDistances";

describe("calculateDistances", () => {
  it("should return an empty array when no cities are given", async () => {
    const cities = [] as string[];
    const result = await calculateDistances(cities);
    expect(result).toEqual([]);
  });

  it("should return an empty array when only one city is given", async () => {
    const cities = ["Marseille"];
    const result = await calculateDistances(cities);
    expect(result).toEqual([]);
  });

  it("should return an array of distances between cities", async () => {
    const cities = ["Marseille", "Paris", "Lyon"];
    const result = await calculateDistances(cities);
    expect(result).toEqual([660480.5742037299, 391493.78309834626]);
  });
});
