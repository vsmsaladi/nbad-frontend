
//   describe("Successfully Login the User", () => {
//     it("passes", () => {
//       cy.visit("http://localhost:3000/login");
    
//     //   cy.url().should("eq", "http://localhost:3000/login");
//       cy.get("[id=email]").type("santoshmohan2@gmail.com");
//       cy.get("[id=password]").type("123");
//       cy.get('[id="submit"]').click();
//       cy.url().should("include", "/");
//       cy.window().its("localStorage").invoke("getItem", "token").should("exist");
//       cy.eyesOpen({
//         appName: "Personal Budget",
//         testName: "my first test",
//       });
//       cy.eyesCheckWindow();
//       cy.eyesClose();
//     });
//   });

describe("Successfully Login the User", () => {
    it("passes", () => {
      cy.visit("http://107.22.73.232:3000/");
      cy.get('[id="loginsignup-btn"]').click();
      cy.url().should("eq", "http://107.22.73.232:3000/login");
      cy.get("[id=email]").type("santoshmohan2@gmail.com");
      cy.get("[id=password]").type("123");
      cy.get('[id="submit"]').click();
      cy.url().should("include", "/");
      cy.window().its("localStorage").invoke("getItem", "token").should("exist");
      cy.eyesOpen({
        appName: "Personal Budget",
        testName: "Visual Regression Testing",
      });
      cy.eyesCheckWindow();
      cy.eyesClose();
    });
  });