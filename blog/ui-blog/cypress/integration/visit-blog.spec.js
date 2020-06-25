describe('App e2e tests', () => {
    context('Visit Blog', () => {
        it('Create Post', () => {
            cy.visit(Cypress.env('WEB_APP'));
            cy.get('#post-create').scrollIntoView();
            cy.get('#post-create').click();
            cy.url().should('eq', `${Cypress.env('WEB_APP')}/blog/create`);
            cy.get('#title').type('Hello Post');
            cy.get('#content').type("##Hello Post content\n\nHello Post  \n\nHello Post");
            cy.get('#tags').type('hello post');
            cy.get('span > #post-create').click({force: true});
            cy.url().should('eq', `${Cypress.env('WEB_APP')}/blog/hello-post`);
        })
        it('Open Post', () => {
            cy.visit(Cypress.env('WEB_APP'));
            cy.get('#hello-post').click({force: true});
            cy.url().should('eq', `${Cypress.env('WEB_APP')}/blog/hello-post`);
        })
        it('Update Post', () => {
            cy.visit(Cypress.env('WEB_APP'));
            cy.get('#hello-post').scrollIntoView();
            cy.get('#hello-post').click({force: true});
            cy.url().should('eq', `${Cypress.env('WEB_APP')}/blog/hello-post`);
            cy.get('#post-edit').scrollIntoView();
            cy.get('#post-edit').click();
            cy.get('#content').type("  \n\n Updated");
            cy.get('#tags').type(' updated');
            cy.get('span > #post-edit').click({force: true});
            cy.url().should('eq', `${Cypress.env('WEB_APP')}/blog/hello-post`);
        })
        it('Delete Post', () => {
            cy.visit(Cypress.env('WEB_APP'));
            cy.get('#hello-post').scrollIntoView();
            cy.get('#hello-post').click({force: true});
            cy.url().should('eq', `${Cypress.env('WEB_APP')}/blog/hello-post`);
            cy.get('#post-delete').scrollIntoView();
            cy.get('#post-delete').click();
            cy.url().should('eq', `${Cypress.env('WEB_APP')}/blog/hello-post/delete`);
            cy.get('span > #post-delete').click({force: true});
            cy.url().should('eq', `${Cypress.env('WEB_APP')}/blog`);
            cy.visit(Cypress.env('WEB_APP'));
            cy.get('#hello-post').should('not.exist');
        })
    })
})
