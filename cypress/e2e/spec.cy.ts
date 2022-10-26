describe("Photo Validation Modal Functionality", () => {
  describe("When an image has been uploaded", () => {
    const imageFilename = "valid-person.jpg";

    beforeEach(() => {
      cy.visit("http://localhost:3000");
      cy.findByTestId("file-upload").selectFile(
        `./cypress/fixtures/${imageFilename}`
      );
    });

    it("should open a modal and validate the image once an image has been uploaded", () => {
      cy.findByTestId("banner").should("be.visible");
      cy.findByTestId("zoom-navigation").should("be.visible");
      cy.findByTestId("confirm-cta").click();
      cy.findByTestId("banner").should("not.exist");
      cy.findByTestId("zoom-navigation").should("not.exist");
      cy.findByTestId("file-upload").should("contain.value", imageFilename);
    });

    it("should open a modal and be able to close it without changing anything", () => {
      cy.findByTestId("banner").should("be.visible");
      cy.findByTestId("zoom-navigation").should("be.visible");
      cy.findByTestId("cancel-cta").click();
      cy.findByTestId("banner").should("not.exist");
      cy.findByTestId("zoom-navigation").should("not.exist");
      cy.findByTestId("file-upload").should("not.contain.value", imageFilename);
    });
  });
});
