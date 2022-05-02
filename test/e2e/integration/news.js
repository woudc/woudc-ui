describe('E2E test for WOUDC UI News pages with selecting and resetting filters', () => {
  it('Check that the news articles load', () => {
    //  Check News page
    cy.intercept('GET', /.*\/collections\/notifications\/items*/).as(
      'countNews'
    )
    cy.visit('/news')

    // Retrieve news list
    cy.wait('@countNews', { timeout: 10000 }).then((xhr) => {
      expect(xhr.response.body.numberMatched).equal(17)
    })
  })
  it('Select keyword filters and reset filters', () => {
    // Click on keyword "graphs" to filter the news; should have 2 articles displayed
    cy.contains('graphs').click()
    cy.get('.v-card').should('have.length', 2)

    // Click "Reset Filters" to undo
    cy.get('.v-btn').click()
    cy.get('.v-card').should('have.length', 17)
  })
})
