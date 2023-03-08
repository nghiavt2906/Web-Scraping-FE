describe("Home Page", () => {
  context("Unauthenticated User", () => {
    it("Redirect to login page", () => {
      cy.visit("/");
      cy.get('h4[data-cy="login-title"]').should("be.visible");
    });
  });

  context("Authenticated User", () => {
    before(() => {
      cy.intercept("POST", `${Cypress.env("serverHost")}/api/reports/upload`, {
        statusCode: 200,
        body: { id: 1 },
      });

      cy.intercept(
        "GET",
        `${Cypress.env("serverHost")}/api/reports/1/search-results`,
        {
          statusCode: 200,
          body: [
            { id: 1, keyword: "iphone", status: "SUCCESS" },
            { id: 2, keyword: "mac", status: "PROCESSING" },
            { id: 3, keyword: "pizza", status: "PROCESSING" },
          ],
        }
      );

      cy.intercept("GET", `${Cypress.env("serverHost")}/api/search-results/1`, {
        statusCode: 200,
        body: {
          id: 1,
          keyword: "iphone",
          status: "SUCCESS",
          totalSearchResults: "About 7,640,000,000 results (0.66 seconds)",
          totalLinks: 211,
          totalAdwordsAdvertisers: 11,
          htmlCode: "<h1>hello world</h1>",
        },
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

    it("Should submit file successfully", () => {
      cy.get('input[data-cy="file-input"]').selectFile(
        "cypress/fixtures/test.csv"
      );
      cy.get('button[data-cy="file-submit-btn"]').click();

      cy.get(".Toastify__toast-body").should(
        "have.text",
        "File uploaded successfully!"
      );
      cy.get("[data-cy=processing-keywords-list]")
        .children()
        .should("have.length.greaterThan", 0);
      cy.get('[data-cy="processing-keywords-list"] > :nth-child(1)').should(
        "have.length.greaterThan",
        0
      );
      cy.get(
        '[data-cy="processing-keywords-list"] > :nth-child(1) > .badge'
      ).should("have.text", "SUCCESS");
      cy.get(
        '[data-cy="processing-keywords-list"] > :nth-child(2) > .badge'
      ).should("have.text", "PROCESSING");
      cy.get('button[data-cy="file-submit-btn"]').should("be.disabled");

      cy.get('[data-cy="processing-keywords-list"] > :nth-child(1)').click();
      cy.location("pathname").should("include", "/search-results/1");
      cy.get('[data-testid="keyword"]').should("have.text", "iphone");

      cy.get(".back-btn").click();
      cy.get('[data-cy="home-title"]').should("have.text", "Upload");
    });

    it("Should fail to submit if file input is empty", () => {
      cy.get('button[data-cy="file-submit-btn"]').click();
      cy.get(".Toastify__toast-body").should(
        "have.text",
        "CSV file is required!"
      );
    });

    it("Should failt to submit if file format is not CSV", () => {
      cy.get('input[data-cy="file-input"]').selectFile(
        "cypress/fixtures/abc.txt"
      );
      cy.get('button[data-cy="file-submit-btn"]').click();

      cy.get(".Toastify__toast-body").should(
        "have.text",
        "File format must be CSV!"
      );
    });
  });
});
