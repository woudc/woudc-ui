describe('E2E test for WOUDC UI Contributor List page with various selection options', () => {
  it('Check XHR POST loads', () => {
    //  Check Contributor List page
    cy.intercept('GET', /.*\/collections\/contributors\/items*/).as(
      'getContributors'
    )
    cy.visit('/contributors')

    // Retrieve contributor list
    cy.wait('@getContributors', { timeout: 10000 }).then((xhr) => {
      expect(xhr.request.method).equal('GET')
      expect(xhr.response.body.numberMatched).equal(152)
    })

    // Check for map and table view of contributors
    cy.get('#woudc-map')
    cy.get('.v-data-table')
  })
  it('Check to see if all columns sort properly', () => {
    cy.get('.v-data-table').scrollIntoView()

    // Check the 7 columns of the table
    cy.wait(5000)
    cy.get('.v-data-table').get('.text-start').should('have.length', 7)
    // Read number of table rows
    cy.get('.v-data-table')
      .find('tr')
      .then((row) => {
        cy.log(row.length)
      })

    cy.contains('.text-start', 'Project')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')
    cy.get('.v-data-table').find('tr').eq(1).contains('IONS')

    cy.contains('.text-start', 'Contributor Name')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')
    cy.get('.v-data-table')
      .find('tr')
      .eq(1)
      .contains('Academy of Sciences of Moldova-Atmospheric Research Group')

    cy.contains('.text-start', 'Country')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')
    cy.get('.v-data-table').find('tr').eq(1).contains('Algeria')

    cy.contains('.text-start', 'Date From')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')
    cy.get('.v-data-table').find('tr').eq(1).contains('2014-12-04T00:00:00Z')

    cy.contains('.text-start', 'Date To')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')

    cy.contains('.text-start', 'WMO Region')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')
    cy.get('.v-data-table').find('tr').eq(1).contains('I')

    cy.contains('.text-start', 'Acronym')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')
    cy.get('.v-data-table').find('tr').eq(1).contains('AAS-AAAC ')
  })
  it('Check for hyperlink and click on WOUDC Instrument row', () => {
    // Check row selection
    cy.get('.v-data-table')
      .find('tr')
      .eq(3)
      .click()
      .invoke('attr', 'class')
      .should('eq', 'selected-row')

    // Check hyperlinks for the a contributor (WOUDC page and external contributor page)
    cy.get('.v-data-table')
      .find('tr')
      .find('td')
      .contains('AEMET')
      .should('have.attr', 'href')
      .then((station) => {
        expect(station).eq(Cypress.config().basePath + '/contributors/AEMET')
      })
    cy.get('.v-data-table')
      .find('tr')
      .find('td')
      .contains('Spanish Meteorological Agency')
      .should('have.attr', 'href')
      .then((station) => {
        expect(station).contains('http://www.aemet.es/en/portada')
      })
  })
  it('Select filters and verify search capabilities', () => {
    // Select filters and check results
    cy.get('.v-autocomplete').then((options) => {
      cy.get(options).invoke('attr', 'class').should('not.contain', 'active')
      cy.get(options)
        .eq(1)
        .click()
        .type('IONS{enter}')
        .invoke('attr', 'class')
        .should('contain', 'active')
    })
    cy.get('button').contains('Apply').click()
    cy.get('.v-data-footer').should('contain', '8')

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
    cy.get('.v-data-footer').should('contain', '8')

    // Verify number of results after reset
    cy.get('button').contains('Reset').click()
    cy.get('.v-data-footer').contains('150')
  })
  it('Visit a particular contributor page', () => {
    // Check AEMET contributor page
    cy.get('.v-data-table').find('tr').find('td').contains('AEMET').click()
    cy.log(Cypress.config().baseUrl + '/contributors/AEMET')
    cy.url().should('eq', Cypress.config().baseUrl + '/contributors/AEMET')
    cy.wait(250)

    // Check AEMET metadata table and AEMET stations table
    cy.get('.v-data-table').eq(0).find('thead').find('tr').contains('Acronym')
    cy.get('.v-data-table').eq(0).find('tbody').find('td').contains('AEMET')
    cy.get('.v-data-table').eq(0).find('tbody').find('td').contains('WOUDC')
    cy.get('.v-data-table')
      .eq(0)
      .find('tbody')
      .find('td')
      .contains('Spanish Meteorological Agency')

    // Check sttaions table
    cy.get('#deployments-table').then((deployments) => {
      expect(deployments).contain('WOUDC Station ID')
      expect(deployments).contain('300')
      expect(deployments).contain('308')
      expect(deployments).contain('346')
      expect(deployments).contain('401')
      expect(deployments).contain('405')
      expect(deployments).contain('411')
    })

    // Click on a WOUDC Station ID to ensure it loads a single station page
    cy.get('.v-data-table').eq(1).find('tr').find('td').contains('308').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/data/stations/308')
  })
})
