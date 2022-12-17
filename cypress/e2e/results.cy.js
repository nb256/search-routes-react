/* eslint-disable no-undef */

describe("Results", () => {
  it("should show results with url search parameters", () => {
    cy.visit(
      "/results?cities=Paris%2CMarseille&date=2022-12-22T21%3A00%3A00.000Z&passengers=1"
    );

    cy.contains("660 km");
    cy.contains("Paris");
    cy.contains("December 23rd 2022, 12:00:00 am");
  });
});
