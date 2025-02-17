/**
 * @author: Rohit Sethi
 * @description: Create custom commands and use it wherever in the framework
 *
 */

import loginPage from "../e2e/uitest/page-objects/login.po";
import { finder } from "@medv/finder";

Cypress.Commands.add("login", (email: string, password: string) => {
    cy.visit("/");
    cy.title().should("eq", "");
    loginPage.enterUsername(email);
    loginPage.enterPassword(password);
    loginPage.clickLogin();
    verifyAfterLogin();
});

// Create session after login, no need to login again
Cypress.Commands.add("bypassLogin", (uid, password) => {
    cy.session(
        [uid, password],
        () => {
            cy.visit("/");
            cy.title().should("eq", "");
            loginPage.enterUsername(uid);
            loginPage.enterPassword(password);
            loginPage.clickLogin();
            verifyAfterLogin();
        },
        {
            cacheAcrossSpecs: true,
        },
    );
    cy.visit("/");
});

function verifyAfterLogin() {
    cy.url().should("include", "/dashboard");
    cy.get("h1").should("have.text", "Dashboard");
}

Cypress.Commands.add("logout", () => {
    loginPage.clickLogout();
});

before(() => {
    window.testedSelectors = [];
});

after(() => {
    const selectors = Cypress._.uniq(window.testedSelectors);

    // eslint-disable-next-line no-console
    console.log("tested the following selectors:", selectors);

    // shortcut to get application's window context without going through cy.window() command
    const win = cy.state("window");

    selectors.forEach((selector) => {
        const el = win.document.querySelector(selector);

        if (el) {
            (el as HTMLElement).style.opacity = "1";
            (el as HTMLElement).style.border = "2px solid magenta";
        }
    });

    // add pause if recording a video
    // cy.wait(1000, { log: false });
});

const getSelector = ($el: JQuery<HTMLElement>): string => {
    if ($el.attr("data-cy")) {
        return `[data-cy=${$el.attr("data-cy")}]`;
    }

    return finder($el[0], {
        // a trick to point "finder" at the application's iframe
        root: cy.state("window").document.body,
    });
};

const rememberSelector = ($el): void => {
    const selector = getSelector($el);
    window.testedSelectors.push(selector);
};

Cypress.Commands.overwrite(
    "type",
    function (
        originalType: (
            subject: Cypress.Chainable<JQuery<HTMLElement>>,
            text: string,
            options?: Cypress.TypeOptions | Cypress.SelectFileOptions,
        ) => Cypress.Chainable<JQuery<HTMLElement>>,
        $el: Cypress.Chainable<JQuery<HTMLElement>>,
        text: string,
        options?: Cypress.TypeOptions | Cypress.SelectFileOptions,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        rememberSelector($el);
        return originalType($el, text, options);
    },
);

Cypress.Commands.overwrite(
    "selectFile",
    function (
        originalType: (
            subject: Cypress.Chainable<JQuery<HTMLElement>>,
            text: string,
            options?: Cypress.SelectOptions,
        ) => Cypress.Chainable<JQuery<HTMLElement>>,
        $el: Cypress.Chainable<JQuery<HTMLElement>>,
        text: string,
        options?: Cypress.SelectOptions,
    ): Cypress.Chainable<JQuery<HTMLElement>> {
        rememberSelector($el);
        return originalType($el, text, options);
    },
);

Cypress.Commands.overwrite(
    "check",
    function (
        click: (
            element: JQuery<HTMLElement>,
            options?: Partial<Cypress.CheckOptions>,
        ) => Cypress.Chainable,
        $el: JQuery<HTMLElement>,
        options?: Partial<Cypress.CheckOptions>,
    ): Cypress.Chainable {
        rememberSelector($el);
        return click($el, options);
    },
);

Cypress.Commands.overwrite(
    "click",
    function (
        click: (
            element: JQuery<HTMLElement>,
            options?: Partial<Cypress.ClickOptions>,
        ) => Cypress.Chainable,
        $el: JQuery<HTMLElement>,
        options?: Partial<Cypress.ClickOptions>,
    ): Cypress.Chainable {
        rememberSelector($el);
        return click($el, options);
    },
);
