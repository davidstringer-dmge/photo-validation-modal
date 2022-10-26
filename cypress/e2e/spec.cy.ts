describe("Photo Validation Modal Functionality", () => {
  it("should open a modal and validate the image once an image has been uploaded", () => {
    const imageFilename = "valid-person.jpg";

    cy.visit("http://localhost:3000");
    cy.findByTestId("file-upload").selectFile(
      `./cypress/fixtures/${imageFilename}`
    );
    cy.findByTestId("banner").should("be.visible");
    cy.findByTestId("zoom-navigation").should("be.visible");
    cy.findByTestId("confirm-cta").click();
    cy.findByTestId("banner").should("not.exist");
    cy.findByTestId("zoom-navigation").should("not.exist");
    cy.findByTestId("file-upload").should("contain.value", imageFilename);
  });
});
