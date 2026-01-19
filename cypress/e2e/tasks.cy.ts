describe("Tasks flow", () => {
  it("adds a new task and displays it", () => {
    cy.visit("http://localhost:5173");

    cy.contains("Tasks").click();

    cy.get('input[placeholder="Task name"]').type("Cypress task");

    cy.get("form").submit();

    cy.contains("Cypress task").should("exist");

    cy.get('input[placeholder="Task name"]').type("Cypress task 2");
    cy.get('textarea[placeholder="Description (optional)"]').type(
      "Cypress task 2 description",
    );

    cy.get("form").submit();

    cy.contains("Cypress task 2").should("exist");
  });
});
