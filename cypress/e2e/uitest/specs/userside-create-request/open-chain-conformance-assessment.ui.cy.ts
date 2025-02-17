/**
 * @author: Rohit Sethi
 * @description:  Open Chain Conformance Assessment automation test cases
 *
 */
import { credentials } from "cypress/fixtures/testdata";
import createRequestPage from "../../page-objects/create-request.po";
import uitestutil from "cypress/support/utils/uitestutil";
import { faker } from "@faker-js/faker";

describe.skip("Create request - Open Chain Conformance Assessment", () => {
    beforeEach(() => {
        cy.bypassLogin(
            credentials.userside_user,
            credentials.userside_password,
        );
        cy.visit("/open_chain_assessement");
    });
    it("Verify validation error meassage after submitting the empty form", () => {
        uitestutil.clickSubmit();
        createRequestPage.projectNameValidation();
        createRequestPage.businessAreaValidation();
        createRequestPage.alternateContactValidation();
        createRequestPage.projectDescriptionValidation();
    });

    it("Verify request created successfully", () => {
        const projName = faker.word.words(2);
        createRequestPage.enterProjectname(projName);
        createRequestPage.selectBusinessArea("Other");
        createRequestPage.enterBusinessOwner(credentials.userside_user);
        createRequestPage.verifyBOEmail(credentials.userside_email);
        createRequestPage.enterDRBNNumber(
            faker.number.int({ min: 10000, max: 99999 }),
        );
        createRequestPage.enterAlternateContact(credentials.admin_user);
        createRequestPage.verifyAltConEmail(credentials.admin_email);
        createRequestPage.attachFile("create-request.zip");
        createRequestPage.enterProjectDescription(faker.lorem.paragraph());
        uitestutil.clickSubmit();

        cy.url().should("include", "/request");
        cy.get("#openChainRequestDatatable tbody tr")
            .eq(0)
            .find("td")
            .eq(1)
            .should("contain.text", projName);
    });
});
