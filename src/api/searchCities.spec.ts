import searchCities from "./searchCities";

describe("searchCities", () => {
  it("should return the cities matching the query", async () => {
    const response = await searchCities("paris");
    expect(response).toEqual({
      success: true,
      result: [{ name: "Paris", lat: 48.856614, lng: 2.352222 }],
    });
  });

  it("should return an empty array if no city matches the query", async () => {
    const result = await searchCities("foo");
    expect(result).toEqual({ success: true, result: [] });
  });

  it("should return an error if the query is 'fail'", async () => {
    const result = await searchCities("fail");
    expect(result).toEqual({ success: false });
  });
});
