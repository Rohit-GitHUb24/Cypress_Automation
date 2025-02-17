/**
 * @author: Rohit Sethi
 * @description: Declare your newly added commands to the cypress namespace so it will be detected by TypeScript
 *
 */

import "./commands";
import "cypress-mochawesome-reporter/register";
import "cypress-plugin-xhr-toggle";
import * as mysql from "cypress-mysql";
import "cypress-plugin-tab";

mysql.addCommands();

declare global {
    // User Login
    namespace Cypress {
        interface Chainable {
            login(email: string, password: string): Chainable<Element>;
        }
    }

    namespace Cypress {
        interface Chainable {
            bypassLogin(uid: string, password: string): Chainable<void>;
        }
    }

    // User Logout
    namespace Cypress {
        interface Chainable {
            logout(): Chainable<Element>;
        }
    }

    namespace Cypress {
        interface Chainable {
            state: (string) => Window;
        }
    }

    interface Window {
        testedSelectors: string[];
    }
    namespace Cypress {
        interface Chainable {
            // type(
            //     text: string,
            //     options?: Partial<Cypress.TypeOptions>,
            // ): Chainable<Element>;
            check(options?: Partial<Cypress.CheckOptions>): Chainable<Element>;
            click(options?: Partial<Cypress.ClickOptions>): Chainable<Element>;
        }
    }
}
