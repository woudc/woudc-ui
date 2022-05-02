describe('E2E test for WOUDC UI Instrument List page with various selection options', () => {
  it('Check XHR POST loads', () => {
    //  Check Instrument List page
    cy.intercept(
      'POST',
      /.*\/processes\/woudc-data-registry-select-distinct\/execution*/
    ).as('getInstruments')
    cy.visit('/data/instruments')

    // Retrieve instrument list
    cy.wait('@getInstruments', { timeout: 10000 }).then((xhr) => {
      expect(xhr.request.method).equal('POST')
      cy.wait(1000)
    })

    // Check for map and table view of instruments
    cy.get('#woudc-map')
    cy.get('.v-data-table')
  })
  it('Check to see if all columns sort properly', () => {
    cy.get('.v-data-table').scrollIntoView()

    // Check the columns of the table and their sorting
    cy.wait(5000)
    cy.get('.v-data-table').get('.text-start').should('have.length', 8)
    // Read number of table rows
    cy.get('.v-data-table')
      .find('tr')
      .then((row) => {
        cy.log(row.length)
      })

    cy.contains('.text-start', 'Instrument Model')
      .click()
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'descending')
    cy.get('.v-data-table').find('tr').eq(1).contains('Z0')

    cy.contains('.text-start', 'Data Category')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')
    cy.get('.v-data-table').find('tr').eq(1).contains('Broad-band')

    cy.contains('.text-start', 'Date From')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')
    cy.get('.v-data-table').find('tr').eq(1).contains('1952-01-03T00:00:00Z')

    cy.contains('.text-start', 'Date To')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')

    cy.contains('.text-start', 'Data Class')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')
    cy.get('.v-data-table').find('tr').eq(1).contains('Ozone')

    cy.contains('.text-start', 'Station Name')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')
    cy.get('.v-data-table').find('tr').eq(1).contains('Abastumani')

    cy.contains('.text-start', 'Web Accessible Folder')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')

    cy.contains('.text-start', 'Instrument Type')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')
    cy.get('.v-data-table').find('tr').eq(1).contains('Acton')
  })
  it('Click on a WAF folder link to ensure it opens a new page', () => {
    // Select first row of the table
    cy.get('.v-data-table')
      .find('tr')
      .eq(1)
      .click()
      .invoke('attr', 'class')
      .should('eq', 'selected-row')
    // Check WAF link
    cy.get('.v-data-table').find('td').eq(7).find('a').click()
  })
  it('Check for station hyperlink', () => {
    // Check station 256 link
    cy.get('.v-data-table')
      .contains('Lauder')
      .should('have.attr', 'href')
      .then((station) => {
        expect(station).contains(
          Cypress.config().basePath + '/data/stations/256'
        )
      })
    cy.get('tr').contains('Lauder').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/data/stations/256')
    cy.go('back').wait(1000)
  })
  it('Select filters and verify search capabilities', () => {
    // Select filters and check results
    cy.get('.v-autocomplete').then((options) => {
      cy.get(options).invoke('attr', 'class').should('not.contain', 'active')
      cy.get(options)
        .eq(0)
        .click()
        .type('Brewer-GDR{enter}')
        .invoke('attr', 'class')
        .should('contain', 'active')
    })
    cy.get('button').contains('Apply').click()
    cy.get('.v-data-footer').should('contain', '5')

    // Disable search by bounding box and verify results
    cy.get('.v-input')
      .eq(0)
      .then((swtch) => {
        cy.get(swtch).invoke('attr', 'class').should('contain', 'active')
        cy.get(swtch)
          .click()
          .invoke('attr', 'class')
          .should('not.contain', 'selected-row')
      })
    cy.get('button').contains('Apply').click()
    cy.wait(250)
    cy.get('.v-data-footer').should('contain', '5')
    cy.get('button').contains('Reset').click()
  })
})
