describe('App e2e tests', () => {
    context('Visit Other', () => {
        it('Open Projects', () => {
            cy.visit(Cypress.env('WEB_APP'));
            cy.get('#projects-link').click();
            cy.url().should('eq', `${Cypress.env('WEB_APP')}/projects`);
            cy.get('#Content').should('exist');

        })
        it('Open About', () => {
            cy.visit(Cypress.env('WEB_APP'));
            cy.get('#about-link').click();
            cy.url().should('eq', `${Cypress.env('WEB_APP')}/about`);
            cy.get('#Content').should('exist');
        })
    })
})
