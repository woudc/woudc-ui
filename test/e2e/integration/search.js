describe('Testing searches and results on the Data Search & Download page.', () => {
  it('Check that the search page and dropdowns load', () => {
    //  Check Search page
    cy.visit('/data/data-search-and-download')

    cy.get('[class$=append-inner]').then((dropdowns) => {
      // Select an option from each dropdown
      for (var i = 0; i < 4; i++) {
        cy.get(dropdowns).eq(i).click()
        cy.get('[class^=v-menu][class$=active]').within(() => {
          cy.get('[class^=v-list-item__content]')
            .eq(0)
            .contains('All')
            .click()
            .wait(500)
        })
      }

      // Check dataset dropdown
      cy.get(dropdowns).eq(0).click()
      cy.get('[class^=v-menu][class$=active]').within(() => {
        cy.get('[class^=v-list-item__content]').eq(0).contains('All').click()
      })
      // Check country dropdown
      cy.get(dropdowns).eq(1).click()
      cy.get('[class^=v-menu][class$=active]').within(() => {
        cy.get('[class^=v-list-item__content]').eq(0).contains('All').click()
      })
      // Check station dropdown
      cy.get(dropdowns).eq(2).click()
      cy.get('[class^=v-menu][class$=active]').within(() => {
        cy.get('[class^=v-list-item__content]').eq(0).contains('All').click()
      })
      // Check instrument dropdown
      cy.get(dropdowns).eq(3).click()
      cy.get('[class^=v-menu][class$=active]').within(() => {
        cy.get('[class^=v-list-item__content]').eq(0).contains('All').click()
      })
    })
  })
  it('Ensure year range slider works and updates the data distribution graph display', () => {
    cy.contains('Files in Range:').then((files) => {
      var num1 = Number(files.text().split(' ').pop())

      // Type in year input
      cy.get('input').then((inpts) => {
        cy.get(inpts).eq(12).type('{backspace}{backspace}95{enter}')
        cy.get(inpts).eq(13).type('{backspace}{backspace}15{enter}')
      })

      // Locate and check year range slider
      cy.get('[role=slider]').then((slider) => {
        cy.get(slider).invoke('attr', 'aria-valuenow').should('eq', '1995,2015')
        cy.get(slider).invoke('attr', 'aria-valuemin').should('eq', '1924')
        cy.get(slider).invoke('attr', 'aria-valuemax').should('eq', '2022')
      })

      // Check data distribution graph
      cy.get('#bar-chart')
      cy.contains('Files in Range:').then((newfiles) => {
        var num2 = Number(newfiles.text().split(' ').pop())
        cy.expect(num2).lessThan(num1)
      })
    })
  })
  it('Ensure the sort by toggles the sort order for country and station dropdown list', () => {
    // Locate and toggle sort-by toggles for country
    cy.get('[class^=v-radio]').then((toggles) => {
      expect(toggles).have.length(4)
      // Order by country code
      cy.get(toggles).eq(0).click()
      cy.get('[class$=append-inner]').eq(1).click()
      cy.get('[class^=v-menu][class$=active]').within(() => {
        cy.get('[class^=v-list-item__content]')
          .eq(1)
          .contains('(ARE) United Arab Emirates')
          .click()
          .wait(500)
      })
      // // Order by country name
      cy.get(toggles).eq(1).click()
      cy.get('[class$=append-inner]').eq(1).click()
      cy.get('[class^=v-menu][class$=active]').within(() => {
        cy.get('[class^=v-list-item__content]')
          .eq(1)
          .should('contain', 'Algeria (DZA)')
        cy.get('[class^=v-list-item__content]').eq(0).click().wait(500)
      })
      // // Order by station ID
      cy.get(toggles).eq(2).click()
      cy.get('[class$=append-inner]').eq(2).click()
      cy.get('[class^=v-menu][class$=active]').within(() => {
        cy.get('[class^=v-list-item__content]')
          .eq(1)
          .contains('(001) Leopoldville/Kinshasa')
          .click()
          .wait(500)
      })
      // // Order by station name
      cy.get(toggles).eq(3).click()
      cy.get('[class$=append-inner]').eq(2).click()
      cy.get('[class^=v-menu][class$=active]').within(() => {
        cy.get('[class^=v-list-item__content]')
          .eq(1)
          .should('contain', 'Abastumani (033)')
        cy.get('[class^=v-list-item__content]').eq(0).click().wait(500)
      })
    })
  })
  it('Make selections from each dropdown and run data search', () => {
    // Check row selection
    cy.get('[class$=append-inner]').then((dropdowns) => {
      // Select an option from each dropdown
      var inputs = []
      // Select Lidar dataset
      cy.get(dropdowns).eq(0).click()
      cy.get('[class^=v-menu][class$=active]').within(() => {
        cy.get('[class^=v-list-item__content]')
          .eq(3)
          .then((inpt) => {
            inputs.push(inpt.text())
            cy.get(inpt).click().wait(500)
          })
      })
      // Make other search selections
      for (var i = 1; i < 4; i++) {
        cy.get(dropdowns).eq(i).click()
        cy.get('[class^=v-menu][class$=active]').within(() => {
          cy.get('[class^=v-list-item__content]')
            .eq(1)
            .then((inpt) => {
              inputs.push(inpt.text())
              cy.get(inpt).click()

              // Check that the metrics updated
              cy.intercept(
                'POST',
                /.*\/oapi\/processes\/woudc-data-registry-metrics\/execution*/
              ).as('getMetrics')
              cy.wait('@getMetrics', { timeout: 10000 }).then((xhr) => {
                expect(xhr.response.statusCode).equal(200)
              })
            })
        })
      }

      // Perform data search
      cy.get('button').contains('Submit').click()
      cy.wait(500)
      cy.get('.v-data-table').scrollIntoView()
      cy.get('.v-data-table')
        .get('[role=columnheader]')
        .should('have.length', 7)

      cy.contains('Files in Range:').then((newfiles) => {
        var num = newfiles.text().split(' ').pop()
        cy.expect(num).equal('344')
        cy.get('.v-data-footer').contains(num)
      })

      // Check the columns of the table and their sorting
      // and Verify search results match the inputs
      cy.contains('.text-start', 'Dataset Name')
        .click()
        .invoke('attr', 'aria-sort')
        .should('eq', 'ascending')
      cy.get('.v-data-table')
        .find('tr')
        .then((rows) => {
          for (var r = 2; i < 10; i++) {
            cy.get(rows).eq(r).should('contain', 'Lidar')
          }
        })

      cy.contains('.text-start', 'Platform ID')
        .click()
        .invoke('attr', 'aria-sort')
        .should('eq', 'ascending')
      cy.get('.v-data-table')
        .find('tr')
        .then((rows) => {
          for (var r = 2; i < 10; i++) {
            cy.get(rows).eq(r).should('contain', '315')
          }
        })

      cy.contains('.text-start', 'Instrument Name')
        .click()
        .invoke('attr', 'aria-sort')
        .should('eq', 'ascending')
      cy.get('.v-data-table')
        .find('tr')
        .then((rows) => {
          for (var r = 2; i < 10; i++) {
            cy.get(rows).eq(r).should('contain', 'DIAL')
          }
        })
    })
  })
})
