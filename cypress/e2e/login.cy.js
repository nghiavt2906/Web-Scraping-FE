describe("Login Page", () => {
  it("Should login successfully", () => {
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
  });

  it("Should fail to login with invalid password", () => {
    cy.visit("/login");

    cy.intercept("POST", `${Cypress.env.server_host}/api/auth/login`, {
      statusCode: 400,
      body: "Username or password is invalid!",
    }).as("postLogin");

    cy.get('input[placeholder="Username"]').type("test");
    cy.get('input[placeholder="Password"]').type("abc123");
    cy.get('button[type="submit"]').click();

    cy.get(".Toastify__toast-body").should("have.text", "Please wait...");
    cy.get(".Toastify__toast-body").should(
      "have.text",
      "Username or password is invalid!"
    );
  });

  it("Should fail to login with invalid username", () => {
    cy.visit("/login");

    cy.intercept("POST", `${Cypress.env.server_host}/api/auth/login`, {
      statusCode: 400,
      body: "Username or password is invalid!",
    }).as("postLogin");

    cy.get('input[placeholder="Username"]').type("nonexistuser");
    cy.get('input[placeholder="Password"]').type("abc123");
    cy.get('button[type="submit"]').click();

    cy.get(".Toastify__toast-body").should("have.text", "Please wait...");
    cy.get(".Toastify__toast-body").should(
      "have.text",
      "Username or password is invalid!"
    );
  });
});
