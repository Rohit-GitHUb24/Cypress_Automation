/**
 * @author: Rohit Sethi
 * @description: Testdata for the test cases
 *
 */

export const credentials = {
    admin_user: Cypress.env("loginUser").admin_user,
    admin_password: Cypress.env("loginUser").admin_password,
    admin_email: Cypress.env("loginUser").admin_email,
    userside_user: Cypress.env("loginUser").userside_user,
    userside_password: Cypress.env("loginUser").userside_password,
    userside_email: Cypress.env("loginUser").userside_email,
    legal_user: Cypress.env("loginUser").legal_user,
    legal_password: Cypress.env("loginUser").legal_password,
};

export const project_status_labels = {
    total_Projects: "Total Projects",
    assigned_Projects: "Assigned Projects",
    unassigned_Projects: "Un-assigned Projects",
    new_Projects: "New Projects",
    closed_Projects: "Closed Projects",
    inprogress_Projects: "In Progress Projects",
    resolved_Projects: "Resolved Projects",
    backlog_Projects: "Backlog Projects",
    waiting_Projects: "Waiting for customer",
    acknowledged_Projects: "Acknowledged Projects",
    pendinginitial_Reportreview: "Pending Initial Report Review",
    pendingobligations_Reportreview: "Pending Obligations Report Review",
    reopend_Projects: "Reopened Projects",
};
