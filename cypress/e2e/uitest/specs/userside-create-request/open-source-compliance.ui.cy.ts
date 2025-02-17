/**
 * @author: Rohit Sethi
 * @description: Open Source Compliance Automation test cases
 *
 */
import { credentials } from "cypress/fixtures/testdata";
import createRequestPage from "../../page-objects/create-request.po";
import uitestutil from "cypress/support/utils/uitestutil";
import { faker } from "@faker-js/faker";

describe.skip("Create request - Open Source Compliance Automation", () => {
    beforeEach(() => {
        cy.bypassLogin(
            credentials.userside_user,
            credentials.userside_password,
        );
        cy.visit("/opensourcecompliance_automation_review");
    });
    it("Verify validation error meassage after submitting the empty form", () => {
        uitestutil.clickSubmit();
        createRequestPage.projectNameValidation();
        createRequestPage.projectVersionValidation();
        createRequestPage.alternateContactValidation();
        createRequestPage.projectDescriptionValidation();
    });

    it("Verify request created successfully", () => {
        const projName = faker.word.words(2);
        const projVer = faker.number.int({ max: 1000 });

        createRequestPage.enterProjectname(projName);
        createRequestPage.enterProjectVersion(projVer);
        createRequestPage.enterAlternateContact(credentials.admin_user);
        createRequestPage.verifyAltConEmail(credentials.admin_email);
        createRequestPage.enterBusinessOwner(credentials.userside_user);
        createRequestPage.verifyBOEmail(credentials.userside_email);
        cy.get('input[name="repo_url"]').type(faker.internet.url());
        createRequestPage.enterDRBNNumber(
            faker.number.int({ min: 10000, max: 99999 }),
        );
        cy.get('input[name="is_your_project_using_gitHub"]').eq(1).check();
        cy.get('input[name="is_your_project_using_jenkins"]').eq(1).check();
        cy.get('textarea[name="tool_details"]').type("Big Bucket");
        createRequestPage.enterProjectDescription(faker.lorem.paragraph());
        uitestutil.clickSubmit();

        cy.url().should("include", "/request");
        cy.get("#openSourceComplianceDatatable tbody tr")
            .eq(0)
            .find("td")
            .eq(1)
            .should("contain.text", `${projName} - ${projVer}`);
    });
});
