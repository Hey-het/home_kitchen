it('prints page content', () => {
  cy.visit('http://localhost:3000/menu')

  cy.get('body').then(($body) => {
    console.log($body.text())
  })
})