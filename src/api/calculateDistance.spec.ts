import calculateDistance from "./calculateDistance";

describe("calculateDistance", () => {
  it("should calculate the distance between two cities", () => {
    // approximately 660 km
    expect(calculateDistance("Marseille", "Paris")).toEqual(660480.5742037299);
  });

  it("should throw an error if a city is not found", () => {
    expect(() => calculateDistance("Mars", "Paris")).toThrowError(
      "City not found"
    );
  });
});
