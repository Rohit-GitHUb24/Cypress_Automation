/**
 * @author: Rohit Sethi
 * @description: Common function for the UI test
 */

export class UiTestUtil {
    verifyuser(roles: string) {
        cy.get(".tasks-menu").prev().should("contain.text", roles);
    }

    verifyProjectStatusCount(dbQuery: string, getStatusCount: string) {
        cy.query(dbQuery).then((totalCount: Array<{ Total_Count: number }>) => {
            cy.get("b")
                .contains(getStatusCount)
                .parents("div.inner")
                .siblings("a")
                .children("b")
                .should("have.text", totalCount[0].Total_Count);
        });
    }

    clickSubmit() {
        cy.get('button[type="submit"]').click();
    }
}

const uitestutil = new UiTestUtil();
export default uitestutil;
