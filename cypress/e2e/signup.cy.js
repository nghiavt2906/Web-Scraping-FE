describe("Signup Page", () => {
  it("Should signup successfully", () => {
    cy.visit("/signup");

    cy.get('input[placeholder="Username"]').type(`test${Date.now()}`);
    cy.get('input[placeholder="Password"]').type("123123");
    cy.get('button[type="submit"]').click();

    cy.get(".Toastify__toast-body").should("have.text", "Please wait...");
    cy.get(".Toastify__toast-body").should(
      "have.text",
      "Signed up sucessfully 👌"
    );
    cy.get('h4[data-cy="login-title"]').should("be.visible");
  });

  it("Should fail to signup if username already exists", () => {
    cy.visit("/signup");

    cy.get('input[placeholder="Username"]').type("test");
    cy.get('input[placeholder="Password"]').type("123123");
    cy.get('button[type="submit"]').click();

    cy.get(".Toastify__toast-body").should("have.text", "Please wait...");
    cy.get(".Toastify__toast-body").should("have.text", "User already exists!");
  });
});
