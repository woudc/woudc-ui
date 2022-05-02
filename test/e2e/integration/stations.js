describe('E2E test for WOUDC UI Station List page with various selection options', () => {
  it('Check XHR POST loads', () => {
    //  Check Station List page
    cy.intercept(
      'POST',
      /.*\/processes\/woudc-data-registry-select-distinct\/execution*/
    ).as('getStations')
    cy.visit('/data/stations')

    // Retrieve station list
    cy.wait('@getStations', { timeout: 10000 }).then((xhr) => {
      expect(xhr.request.method).equal('POST')
      cy.wait(1000)
      expect(xhr.response.body.modelResolution.length).equal(453)
    })

    // Check for map and table view of stations
    cy.get('#woudc-map')
    cy.get('.v-data-table')
  })
  it('Check to see if all columns sort properly', () => {
    cy.get('.v-data-table').scrollIntoView()

    // Check the columns of the table and their sorting
    cy.wait(5000)
    cy.get('.v-data-table').get('.text-start').should('have.length', 9)

    cy.contains('.text-start', 'GAW ID')
      .click()
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'descending')
    cy.get('.v-data-table').find('tr').eq(1).contains('ZOS')

    cy.contains('.text-start', 'Date From')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')

    cy.contains('.text-start', 'Date To')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')

    cy.contains('.text-start', 'Station Name')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')
    cy.get('.v-data-table').find('tr').eq(1).contains('Abastumani')

    cy.contains('.text-start', 'Station Country')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')
    cy.get('.v-data-table').find('tr').eq(1).contains('Algeria')

    cy.contains('.text-start', 'Revision Date')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')

    cy.contains('.text-start', 'Station Type')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')
    cy.get('.v-data-table').find('tr').eq(1).contains('SHP')

    cy.contains('.text-start', 'WOUDC Station ID')
      .click()
      .invoke('attr', 'aria-sort')
      .should('eq', 'ascending')
    cy.get('.v-data-table').find('tr').eq(1).contains('001')
  })
  it('Select filters and verify search capabilities', () => {
    // Select filters and check results
    cy.get('.v-autocomplete').then((options) => {
      cy.get(options).invoke('attr', 'class').should('not.contain', 'active')
      cy.get(options)
        .eq(3)
        .click()
        .type('Argentina{enter}')
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
    cy.get('.v-data-footer').contains('453')
  })
  it('Click on GAW ID `KAG` and ensure it opens an external link on a new tab/page of station Kagoshima', () => {
    //  Select GAW ID 'KAG' and check that an external link is opened
    cy.get(
      'a[href="https://gawsis.meteoswiss.ch/GAWSIS/index.html#/search/station/stationReportDetails/0-20008-0-KAG"]'
    )

    cy.get('.v-data-table')
      .contains('KAG')
      .should('have.attr', 'href')
      .then((gaw_id) => {
        expect(gaw_id).eq(
          'https://gawsis.meteoswiss.ch/GAWSIS/index.html#/search/station/stationReportDetails/0-20008-0-KAG'
        )
      })
  })
  it('Click on WOUDC Station row and ensure row is highlighted', () => {
    // Check station 007
    cy.get('.v-data-table').contains('007').should('have.attr', 'href')

    cy.get('.v-data-table')
      .find('tr')
      .eq(6)
      .click()
      .invoke('attr', 'class')
      .should('eq', 'selected-row')
  })
  it('Visit a particular station page', () => {
    // Check station 007
    cy.get('a[href*="007"]').eq(1).click()
    cy.url().should('eq', Cypress.config().baseUrl + '/data/stations/007')
  })
  it('Validate stations map and tables', () => {
    // Map displays a zoomed-in view of the station with popup
    cy.get('#woudc-map').get('[class^=leaflet-popup]').should('contain', '007')

    // Data distribution graph shows data with working date range sliders
    cy.get('#bar-chart')

    // Table view of station
    cy.get('[class^=v-data-table]')
      .contains('007')
      .should('have.attr', 'href')
      .then((station) => {
        expect(station).equal(Cypress.config().basePath + '/data/stations/007')
      })

    // Table view of contributor `JMA`
    cy.get('#deployments-table')
      .contains('JMA')
      .should('have.attr', 'href')
      .then((station) => {
        expect(station).contains(
          Cypress.config().basePath + '/contributors/JMA'
        )
      })

    // Table view of instruments
    cy.get('#instruments-table')
  })
  it('Check apache redirect', () => {
    // Refresh the page to see if page loads correctly to ensure the `.htaccess` / apache redirect is working (SPA fallback to enable persistant routing)
    cy.intercept('GET', /.*\/007/).as('reloadStation')
    cy.reload()
    cy.wait('@reloadStation', { timeout: 10000 }).then((xhr) => {
      expect(xhr.response.statusCode).equal(200)
    })
  })
})
