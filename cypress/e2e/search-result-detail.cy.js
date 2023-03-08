describe("Search Result Detail Page", () => {
  context("Unauthenticated User", () => {
    it("Redirect to login page", () => {
      cy.visit("/search-results/1");
      cy.get('h4[data-cy="login-title"]').should("be.visible");
    });
  });

  context("Authenticated User", () => {
    const searchResult = {
      id: 1,
      keyword: "iphone",
      status: "SUCCESS",
      totalSearchResults: "About 7,640,000,000 results (0.66 seconds)",
      totalLinks: 211,
      totalAdwordsAdvertisers: 11,
      htmlCode: "<h1>hello world</h1>",
    };

    before(() => {
      cy.intercept("GET", `${Cypress.env("serverHost")}/api/search-results/1`, {
        statusCode: 200,
        body: searchResult,
      });
    });

    beforeEach(() => {
      cy.visit("/login");

      cy.get('input[placeholder="Username"]').type("test");
      cy.get('input[placeholder="Password"]').type("123123");
      cy.get('button[type="submit"]').click();

      cy.get(".Toastify__toast-body").should("have.text", "Please wait...");
      cy.get(".Toastify__toast-body").should(
        "have.text",
        "Logged in sucessfully 👌"
      );

      // check navbar
      cy.get("#dropdown-button").should("be.visible");
      cy.get("#dropdown-button").should("have.text", "Hi test!");

      cy.get(".Toastify__close-button").click();
      cy.wait(1000);
    });

    it("Should display search result detail", () => {
      cy.visit("/search-results/1");

      cy.get('[data-testid="keyword"]').should(
        "have.text",
        searchResult.keyword
      );
      cy.get('[data-cy="total-ads"]').should(
        "have.text",
        searchResult.totalAdwordsAdvertisers
      );
      cy.get('[data-cy="total-links"]').should(
        "have.text",
        searchResult.totalLinks
      );
      cy.get('[data-cy="total-search-results"]').should(
        "have.text",
        searchResult.totalSearchResults
      );
      cy.get('[data-cy="html-code"]').should(
        "have.text",
        searchResult.htmlCode
      );
    });
  });
});
