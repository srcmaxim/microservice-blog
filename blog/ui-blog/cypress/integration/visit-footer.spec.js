describe('App e2e tests', () => {
    context('Visit Footer', () => {
        it('Open Link', () => {
            cy.visit(Cypress.env('WEB_APP'));
            cy.get('.Footer').scrollIntoView();
            cy.get('.Footer > a').should('have.prop', 'href', 'https://github.com/srcmaxim')
        })
    })
})
