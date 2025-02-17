/**
 * @author: Rohit Sethi
 * @description: Login page positive and negative testcases
 *
 */

import loginPage from "../page-objects/login.po";
import { credentials } from "cypress/fixtures/testdata";

describe("Login - ", () => {
    context("Using multiple users", () => {
        before(() => {
            cy.intercept("POST", "/").as("omLoginAPI");
        });
        beforeEach(() => {
            cy.visit("/");
        });

        it("Verify login with valid admin credentials", () => {
            cy.login(credentials.admin_user, credentials.admin_password);
        });

        it("Verify login with valid legal credentials", () => {
            cy.login(credentials.legal_user, credentials.legal_password);
        });

        it("Verify login with valid userside credentials", () => {
            cy.login(credentials.userside_user, credentials.userside_password);
        });

        afterEach(() => {
            cy.wait("@omLoginAPI").then((object) => {
                expect(object.response.statusCode).to.eq(200);
            });
            cy.logout();
        });
    });

    context("Negative testcases", () => {
        beforeEach(() => {
            cy.visit("/");
        });

        it("Verify login with invalid user and valid password", () => {
            invalidLogin("invalid_admin", credentials.userside_password);
        });

        it("Verify login with valid user and invalid password", () => {
            invalidLogin(credentials.userside_user, "invalid_password");
        });

        it("Verify login with valid userid and empty password", () => {
            loginPage.enterUsername(credentials.userside_user);
            loginPage.password.clear({ force: true });
        });

        it("Verify login with empty userid and valid password", () => {
            loginPage.userName.clear({ force: true });
            loginPage.enterPassword(credentials.userside_password);
        });

        it("Verify login with empty userid and password", () => {
            loginPage.userName.clear({ force: true });
            loginPage.password.clear({ force: true });
        });

        afterEach(() => {
            loginPage.clickLogin();
            loginPage.verifyLoginErrorMessage();
        });
    });

    context("Reset login testcases", () => {
        it("Verify login page fields after reset", () => {
            cy.visit("/");
            invalidLogin("test", "test");
            loginPage.clickReset();
            loginPage.verifyUserField();
            loginPage.verifyPasswordField();
        });
    });

    function invalidLogin(uid: string, pass: string) {
        loginPage.enterUsername(uid);
        loginPage.enterPassword(pass);
    }
});
