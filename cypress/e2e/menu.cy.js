describe('Restaurant Menu Test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/menu')
  })

  it('loads menu page', () => {
    cy.url().should('include', '/menu')
  })

})