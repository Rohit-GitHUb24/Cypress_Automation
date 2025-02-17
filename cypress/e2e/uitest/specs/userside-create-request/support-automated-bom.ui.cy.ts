/**
 * @author: Rohit Sethi
 * @description: Support for Automated BoM automation test cases
 *
 */
import { credentials } from "cypress/fixtures/testdata";
import createRequestPage from "../../page-objects/create-request.po";
import uitestutil from "cypress/support/utils/uitestutil";
import { faker } from "@faker-js/faker";

describe.skip("Create request - Support automated for BoM", () => {
    beforeEach(() => {
        cy.bypassLogin(
            credentials.userside_user,
            credentials.userside_password,
        );
        cy.visit("/support_on_automated_bom_review");
    });
    it("Verify validation error meassage after submitting the empty form", () => {
        uitestutil.clickSubmit();
        createRequestPage.projectNameValidation();
        createRequestPage.projectVersionValidation();
        createRequestPage.supportForValidation();
        createRequestPage.completionDateValidation();
        createRequestPage.alternateContactValidation();
        createRequestPage.businessAreaValidation();
        createRequestPage.projectDescriptionValidation();
    });

    it("Verify request created successfully", () => {
        const projName = faker.word.words(2);
        const projVer = faker.number.int({ max: 1000 });

        createRequestPage.enterProjectname(projName);
        createRequestPage.enterProjectVersion(projVer);
        createRequestPage.selectSupportFor("others");
        createRequestPage.attachFile("create-request.zip");
        createRequestPage.enterCompletionDate(getRequestCompletionDate());
        createRequestPage.enterDRBNNumber(
            faker.number.int({ min: 10000, max: 99999 }),
        );
        createRequestPage.enterAlternateContact(credentials.admin_user);
        createRequestPage.verifyAltConEmail(credentials.admin_email);
        createRequestPage.selectBusinessArea("Other");
        createRequestPage.enterBusinessOwner(credentials.userside_user);
        createRequestPage.verifyBOEmail(credentials.userside_email);
        createRequestPage.enterProjectDescription(faker.lorem.paragraph());
        uitestutil.clickSubmit();

        // Wait for the URL to change
        cy.url().should("include", "/request");

        // Find the second td in the first row (index 1)
        cy.get("#suportAutomateRequestDatatable tbody tr")
            .eq(0)
            .find("td")
            .eq(1)
            .should("contain.text", `${projName} - ${projVer}`);
    });

    function getRequestCompletionDate() {
        // Get the current date
        const currentDate = new Date();

        // Add 4 weeks (28 days) to the current date
        const futureDate = new Date(
            currentDate.setDate(currentDate.getDate() + 28),
        );

        // toISOString() returns a date string in the yyyy-mm-ddTHH:mm:ss.sssZ format.
        // Format the future date to yyyy-mm-dd
        const formattedDate = futureDate.toISOString().split("T")[0];
        return formattedDate;
    }
});
