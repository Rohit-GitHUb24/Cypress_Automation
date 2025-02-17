/**
 * @author: Rohit Sethi
 * @description: Configuration file for the UI testcases
 *
 */

import { defineConfig } from "cypress";
import * as mysql from "cypress-mysql";
require("dotenv").config();

export default defineConfig({
    e2e: {
        specPattern: "cypress/e2e/uitest/specs/**/*.ui.cy.{js,jsx,ts,tsx}",
        viewportWidth: 1200,
        viewportHeight: 900,
        baseUrl: "",
        chromeWebSecurity: true,
        watchForFileChanges: true, // Stops tests from executing after an update
        experimentalRunAllSpecs: true, // Run all the tests in cypress runner
        setupNodeEvents(on, config) {
            require("cypress-mochawesome-reporter/plugin")(on);
            mysql.configurePlugin(on);
            return config;
        },
        env: {
            hideXhr: true, // Hide/Show XHR requests from cypress runner

            db: {
                // MySQL db connection parameters
                host: process.env.SVR_DB_HOST,
                user: process.env.SVR_DB_USERNAME,
                password: process.env.SVR_DB_PASSWORD,
                database: process.env.SVR_DB_DATABASE,
            },
        },
    },

    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
        charts: true,
        overwrite: true, // true-Overwrite existing report / false-Create new report
        reportDir: "cypress/uireports",
        reportTitle: "OSCAR MANAGER",
        reportFilename: "OSCAR_Manager_E2E_Report_[datetime]",
        timestamp: "dd/mmmm/yyyy HH_MM_ss",
        reportPageTitle: "OSCARManager_E2E_Test_Execution_Report",
        embeddedScreenshots: true, //
        inlineAssets: true,
        saveAllAttempts: false, // Saves screenshots of all test attempts
        autoOpen: false, // Auto open the report after execution
    },
});
