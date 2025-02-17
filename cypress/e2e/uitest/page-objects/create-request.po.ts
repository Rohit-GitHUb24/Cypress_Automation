/**
 * @author: Rohit Sethi
 * @description: User side create request page elements and methods
 *
 */

class CreateRequestPage {
    get projectName() {
        return cy.get('input[name="project_name"]');
    }

    projectNameValidation() {
        this.projectName.next().should("have.text", "Project name is required");
    }

    get projectVersion() {
        return cy.get('input[name="project_version"]');
    }

    projectVersionValidation() {
        this.projectVersion
            .next()
            .should("have.text", "Project version is required");
    }

    get supportFor() {
        return cy.get('select[name="support_on"]');
    }

    supportForValidation() {
        this.supportFor.next().should("have.text", "Support for is required");
    }

    get completionDate() {
        return cy.get('input[name="request_completion_date"]');
    }

    completionDateValidation() {
        this.completionDate
            .next()
            .should("have.text", "Request completion date is required");
    }

    get drbnNumber() {
        return cy.get('input[name="drnumber"]');
    }

    get alternateContact() {
        return cy.get('input[name="apoc"]');
    }

    alternateContactValidation() {
        this.alternateContact
            .next()
            .should("have.text", "Alternate point of contact is required");
    }

    get businessArea() {
        return cy.get('select[name="business_area"]');
    }

    businessAreaValidation() {
        this.businessArea
            .next()
            .should("have.text", "Business area is required");
    }

    get businessOwner() {
        return cy.get('input[name="business_owner_uid"]');
    }

    get projectDescription() {
        return cy.get('textarea[name="projectdescription"]');
    }

    projectDescriptionValidation() {
        this.projectDescription
            .next()
            .should("have.text", "Project description is required");
    }

    enterProjectname(proName: string) {
        this.projectName.type(proName);
    }

    enterProjectVersion(proVersion: any) {
        this.projectVersion.type(proVersion);
    }

    selectSupportFor(supportValue: string) {
        this.supportFor.select(supportValue);
    }

    enterCompletionDate(cDate: string) {
        this.completionDate.type(cDate).tab();
    }

    attachFile(fileName: string) {
        cy.get('input[type="file"]').selectFile(
            `cypress/fixtures/testfiles/${fileName}`,
        );
    }

    enterDRBNNumber(drbnNumber: number) {
        this.drbnNumber.type(`DRBN-${drbnNumber}`);
    }

    enterAlternateContact(altContact: string) {
        this.alternateContact.type(altContact).tab();
    }

    verifyAltConEmail(altEmail: string) {
        cy.get('input[name="alternatepoc_mail"]').should(
            "have.value",
            altEmail,
        );
    }

    selectBusinessArea(businessAreaValue: string) {
        this.businessArea.select(businessAreaValue);
    }

    enterBusinessOwner(bOwner: string) {
        this.businessOwner.type(bOwner).tab();
    }

    verifyBOEmail(boEmail: string) {
        cy.get('input[name="business_owner"]').should("have.value", boEmail);
    }

    enterProjectDescription(description: string) {
        this.projectDescription.type(description);
    }
}

const createRequestPage = new CreateRequestPage();
export default createRequestPage;
