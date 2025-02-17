/**
 * @author: Rohit Sethi
 * @description: Login page elements and methods
 *
 */
export class LoginPage {
    get userName() {
        return cy.get('input[name="uid"]');
    }

    get password() {
        return cy.get('input[name="password"]');
    }

    enterUsername(username: string) {
        this.userName.type(username, { force: true });
    }

    enterPassword(pass: string) {
        this.password.type(pass, { force: true, log: false });
    }

    clickLogin() {
        cy.get('input[value="Login"]').click({ force: true });
    }

    clickLogout() {
        cy.get(".fa-sign-out")
            .should("be.visible")
            .click({ force: true })
            .then(() => {
                cy.contains("button", "Logout").click({ force: true });
                this.verifyUserField();
                this.verifyPasswordField();
            });
    }

    clickReset() {
        cy.get('input[type="reset"]').click({ force: true });
    }

    verifyLoginErrorMessage() {
        cy.get(".alert-danger").should(
            "contain.text",
            "Please check your login details",
        );
    }

    verifyUserField() {
        this.userName
            .should("be.visible")
            .should("have.attr", "placeholder", "User ID");
    }

    verifyPasswordField() {
        this.password
            .should("be.visible")
            .should("have.attr", "placeholder", "Password");
    }
}

const loginPage = new LoginPage();
export default loginPage;
