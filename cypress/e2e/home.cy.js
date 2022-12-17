/* eslint-disable no-undef */

describe("Home", () => {
  it("should render the home page", () => {
    cy.visit("/");
    cy.get("h4").should("contain", "Search Your Route");
  });

  it("should fill the form and submit", () => {
    cy.visit(
      "/?passengers=1&cities=Paris%2CMarseille&date=2022-12-22T21%3A00%3A00.000Z"
    );

    cy.get("button[type='submit']").click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/results");
      expect(loc.search).to.eq(
        "?cities=Paris%2CMarseille&date=2022-12-22T21%3A00%3A00.000Z&passengers=1"
      );
    });
  });
});
