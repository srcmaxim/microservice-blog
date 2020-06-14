describe('App e2e tests', () => {
    context('Visit Header', () => {
        it('Blog Link', () => {
            cy.visit(Cypress.env('WEB_APP'));
            cy.get('#blog-link').click();
            cy.url().should('eq', `${Cypress.env('WEB_APP')}/blog`);
        })
        it('Projects Link', () => {
            cy.visit(Cypress.env('WEB_APP'));
            cy.get('#projects-link').click();
            cy.url().should('eq', `${Cypress.env('WEB_APP')}/projects`);
        })
        it('About Link', () => {
            cy.visit(Cypress.env('WEB_APP'));
            cy.get('#about-link').click();
            cy.url().should('eq', `${Cypress.env('WEB_APP')}/about`);
        })
    })
})
