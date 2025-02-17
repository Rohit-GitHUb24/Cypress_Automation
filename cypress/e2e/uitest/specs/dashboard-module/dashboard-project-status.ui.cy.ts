/**
 * @author: Joy Sherly
 * @description: Dashboard Project Status testcases
 *
 */
import { credentials, project_status_labels } from "cypress/fixtures/testdata";
import uitestutil from "cypress/support/utils/uitestutil";

describe("Dashboard Project Status - ", () => {
    it("Verify all userside projects topic status", () => {
        cy.login(credentials.userside_user, credentials.userside_password);
        uitestutil.verifyuser("Functional");
        const allUsersideProjectsStatus: string[] = [
            project_status_labels.new_Projects,
            project_status_labels.inprogress_Projects,
            project_status_labels.resolved_Projects,
            project_status_labels.closed_Projects,
            project_status_labels.acknowledged_Projects,
            project_status_labels.pendinginitial_Reportreview,
            project_status_labels.pendingobligations_Reportreview,
        ];
        allUsersideProjectsStatus.forEach((projectStatus: string) => {
            verifyProjectStatusHeading(projectStatus);
        });
    });

    it("Verify all admin projects topic status", () => {
        cy.login(credentials.admin_user, credentials.admin_password);
        // uitestutil.verifyuser("Joy"); // TODO - Need to verify username fromm LDAP
        const allAdminProjectsStatus: string[] = [
            project_status_labels.total_Projects,
            project_status_labels.assigned_Projects,
            project_status_labels.new_Projects,
            project_status_labels.backlog_Projects,
            project_status_labels.inprogress_Projects,
            project_status_labels.waiting_Projects,
            project_status_labels.resolved_Projects,
            project_status_labels.closed_Projects,
            project_status_labels.reopend_Projects,
            project_status_labels.unassigned_Projects,
        ];
        allAdminProjectsStatus.forEach((projectStatus: string) => {
            verifyProjectStatusHeading(projectStatus);
        });
    });

    afterEach(() => {
        cy.logout();
    });

    function verifyProjectStatusHeading(topicName: string) {
        cy.contains(topicName).should("have.text", topicName);
    }
});
