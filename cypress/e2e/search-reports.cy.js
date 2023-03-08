describe("Search Reports Page", () => {
  context("Unauthenticated User", () => {
    it("Redirect to login page", () => {
      cy.visit("/search-reports");
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
    const firstReport = {
      id: 1,
      name: "test-3_8_2023-5_52_53 PM",
      keywords: [
        { id: 1, keyword: "iphone", status: "SUCCESS" },
        { id: 2, keyword: "laptop", status: "PROCESSING" },
      ],
    };

    before(() => {
      cy.intercept("GET", `${Cypress.env("serverHost")}/api/reports/all`, {
        statusCode: 200,
        body: [
          firstReport,
          {
            id: 2,
            name: "keywords-3_9_2023-8_10_27 AM",
            keywords: [
              { id: 3, keyword: "macbook", status: "PROCESSING" },
              { id: 4, keyword: "guitar", status: "PROCESSING" },
            ],
          },
        ],
      });

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

    it("Can search keyword in reports", () => {
      cy.get('[href="/search-reports"]').click();

      cy.get(":nth-child(1) > .accordion-header > .accordion-button").should(
        "have.text",
        `${firstReport.name}.csv`
      );

      const firstReportPath =
        ':nth-child(1) > .accordion-collapse > .accordion-body > [data-cy="processing-keywords-list"] > :nth-child(1)';
      cy.get(`${firstReportPath} > .ms-2`).should(
        "have.text",
        searchResult.keyword
      );
      cy.get(`${firstReportPath} > .badge`).should("have.text", "SUCCESS");
      cy.get(
        '[data-cy="report-1"] > .accordion-header > .accordion-button'
      ).click();
      cy.get(firstReportPath).click();

      cy.location("pathname").should("include", "/search-results/1");
      cy.get('[data-testid="keyword"]').should(
        "have.text",
        searchResult.keyword
      );
      cy.get(".back-btn").click();

      cy.get('[data-testid="search-keywords-input"]').type(
        searchResult.keyword
      );
      cy.get(
        '[data-cy="report-1"] > .accordion-header > .accordion-button'
      ).click();
      cy.get(firstReportPath).should("be.visible");

      cy.get('[data-testid="search-keywords-input"]').type("test");
      cy.get(firstReportPath).should("not.exist");

      cy.get('[data-testid="clear-button"]').click();
      cy.get(firstReportPath).should("be.visible");
      cy.get('[data-testid="search-keywords-input"]').should("have.text", "");
    });
  });
});
