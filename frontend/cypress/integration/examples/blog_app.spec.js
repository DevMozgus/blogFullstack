const { func } = require("prop-types");

describe("Blog App", function () {
  beforeEach(function () {
    cy.resetDB();
    cy.createUser({
      username: "test",
      name: "test",
      password: "test",
    });
    cy.createUser({
      username: "test2",
      name: "test2",
      password: "test2",
    });
  });

  it("front page can be opened", function () {
    cy.contains("Blogs");
  });

  it("wrong credentials fails login", function () {
    cy.contains("login").click();
    cy.get("#username").type("wrong");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();
    cy.get(".error")
      .should("contain", "Login Failed")
      .and("have.css", "border-color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");
    cy.get("html").should("not.contain", "logged in as");
  });

  it("user can log in", function () {
    cy.contains("login").click();
    cy.get("#username").type("test");
    cy.get("#password").type("test");
    cy.get("#login-button").click();
    cy.get(".success")
      .should("contain", "Successful Login")
      .and("have.css", "border-color", "rgb(0, 128, 0)")
      .and("have.css", "border-style", "solid");
    cy.contains("logged in as test");
  });

  describe("while logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test2", password: "test2" });
      cy.createBlog({
        author: "Other Test",
        title: "Other tests users blog",
        url: "much wow, very work",
        likes: 0,
      });
      cy.contains("Sign Out").click();
      cy.clearLocalStorage();
      cy.login({ username: "test", password: "test" });
      cy.createBlog({
        author: "initial",
        title: "first",
        url: "much wow, very work",
        likes: 0,
      });
      cy.createBlog({
        author: "initial",
        title: "second",
        url: "much wow, very work",
        likes: 0,
      });
    });

    it("user can delete blog through UI", function () {
      cy.get("#blogNum2").contains("show blog").click();
      cy.get("#blogNum2").contains("delete").click();
      cy.get("html").should("not.contain", "second");
    });

    it("user cannot delete other users blog through UI", function () {
      cy.get("#blogNum1").contains("show blog").click();
      cy.get("#blogNum1").contains("delete").click();
      cy.get("html").should("contain", "second");
    });

    it("a new blog can be create through UI", function () {
      cy.contains("Create Blog").click();
      cy.get("#author").type("cypress");
      cy.get("#title").type("test blog");
      cy.get("#url").type("testing.com");
      cy.get("#submit-blog").click();
      cy.get(".success")
        .should("contain", "Successfuly added blog!")
        .and("have.css", "border-color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid");
    });

    it("new blog appears", function () {
      cy.createBlog({
        author: "backendTester",
        title: "blog appears through cypress request",
        url: "much wow, very work",
        likes: 0,
      });
      cy.contains("blog appears through cypress request");
    });

    it("can add like to blog through UI", function () {
      cy.get("#blogNum1").contains("show blog").click();
      cy.get("#blogNum1").contains("like").click();
      cy.get("#blogNum1").contains("Likes: 1");
    });
  });
});
