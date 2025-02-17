/**
 * @author: Rohit Sethi
 * @description: Leagal/Expert support automation test cases
 *
 */
import { credentials } from "cypress/fixtures/testdata";
import createRequestPage from "../../page-objects/create-request.po";
import uitestutil from "cypress/support/utils/uitestutil";
import { faker } from "@faker-js/faker";

describe.skip("Create request - Legal/Expert Support", () => {
    beforeEach(() => {
        cy.bypassLogin(
            credentials.userside_user,
            credentials.userside_password,
        );
        cy.visit("/legal_export_support");
    });
    it("Verify validation error meassage after submitting the empty form", () => {
        uitestutil.clickSubmit();

        createRequestPage.supportForValidation();
        createRequestPage.businessAreaValidation();
        createRequestPage.alternateContactValidation();
        createRequestPage.projectDescriptionValidation();
    });

    it("Verify request created successfully", () => {
        const support_for = "others";
        createRequestPage.selectSupportFor(support_for);
        createRequestPage.selectBusinessArea("Other");
        createRequestPage.enterBusinessOwner(credentials.userside_user);
        createRequestPage.verifyBOEmail(credentials.userside_email);
        createRequestPage.enterAlternateContact(credentials.admin_user);
        createRequestPage.verifyAltConEmail(credentials.admin_email);
        createRequestPage.enterDRBNNumber(
            faker.number.int({ min: 10000, max: 99999 }),
        );
        createRequestPage.attachFile("create-request.zip");
        createRequestPage.enterProjectDescription(faker.lorem.paragraph());
        uitestutil.clickSubmit();

        // Wait for the URL to change
        cy.url().should("include", "/request");

        // Find the second td in the first row (index 1)
        cy.get("#legalRequestDatatable tbody tr")
            .eq(0)
            .find("td")
            .eq(1)
            .should("contain.text", support_for);
    });
});
