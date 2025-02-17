/**
 * @author: Joy Sherly
 * @description: Admin total count of project status
 *
 */

import { dashboardAdmin } from "cypress/fixtures/dbqueries";
import { credentials, project_status_labels } from "cypress/fixtures/testdata";
import uitestutil from "cypress/support/utils/uitestutil";

describe.skip("Dashboard-Admin projects status count", () => {
    beforeEach(() => {
        cy.bypassLogin(credentials.admin_user, credentials.admin_password);
    });

    it("Verify Total projects status count", () => {
        uitestutil.verifyProjectStatusCount(
            dashboardAdmin.totalProjects,
            project_status_labels.total_Projects,
        );
    });

    it("Verify Assigned status count", () => {
        uitestutil.verifyProjectStatusCount(
            dashboardAdmin.assignedProjects,
            project_status_labels.assigned_Projects,
        );
    });

    it("Verify Unassigned status count", () => {
        uitestutil.verifyProjectStatusCount(
            dashboardAdmin.UnassignedProjects,
            project_status_labels.unassigned_Projects,
        );
    });

    it("Verify New status count", () => {
        uitestutil.verifyProjectStatusCount(
            dashboardAdmin.NEWProjects,
            project_status_labels.new_Projects,
        );
    });

    it("Verify Closed status count", () => {
        uitestutil.verifyProjectStatusCount(
            dashboardAdmin.ClosedProjects,
            project_status_labels.closed_Projects,
        );
    });

    it("Verify InProgress status count", () => {
        uitestutil.verifyProjectStatusCount(
            dashboardAdmin.InprogressProjects,
            project_status_labels.inprogress_Projects,
        );
    });

    it("Verify Resolved status count", () => {
        uitestutil.verifyProjectStatusCount(
            dashboardAdmin.ResolvedProjects,
            project_status_labels.resolved_Projects,
        );
    });

    it("Verify Backlog status count", () => {
        uitestutil.verifyProjectStatusCount(
            dashboardAdmin.BacklogProjects,
            project_status_labels.backlog_Projects,
        );
    });

    it("Verify Waiting status count", () => {
        uitestutil.verifyProjectStatusCount(
            dashboardAdmin.WaitingProjects,
            project_status_labels.waiting_Projects,
        );
    });
});
