/**
 * @author: Joy Sherly
 * @description: Userside total count of project status
 *
 */

import { dashboardUser } from "cypress/fixtures/dbqueries";
import { credentials, project_status_labels } from "cypress/fixtures/testdata";
import uitestutil from "cypress/support/utils/uitestutil";

describe.skip("Dashboard user status count", () => {
    beforeEach(() => {
        cy.bypassLogin(
            credentials.userside_user,
            credentials.userside_password,
        );
    });

    it("Verify Newstatus count", () => {
        uitestutil.verifyProjectStatusCount(
            dashboardUser.userNewProjects,
            project_status_labels.new_Projects,
        );
    });

    it("Verify UserInprogress count", () => {
        uitestutil.verifyProjectStatusCount(
            dashboardUser.userInprogressProjects,
            project_status_labels.inprogress_Projects,
        );
    });

    it("Verify UserResolved count", () => {
        uitestutil.verifyProjectStatusCount(
            dashboardUser.userResolvedProjects,
            project_status_labels.resolved_Projects,
        );
    });

    it("Verify UserClosed count", () => {
        uitestutil.verifyProjectStatusCount(
            dashboardUser.userClosedProjects,
            project_status_labels.closed_Projects,
        );
    });

    it("Verify Acknowledged count", () => {
        uitestutil.verifyProjectStatusCount(
            dashboardUser.AcknowledgedProjects,
            project_status_labels.acknowledged_Projects,
        );
    });
});
