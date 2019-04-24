const config = require('./../../config')

const sites = config.sites

/**
 * Check routes if specified
 */
const checkRoutes = (base, routes) => {
  for (let route of routes) {
    let testResource = base + route.path
    it(`${route.name} is available`, () => {
      cy.visit(testResource)
      cy.title()
      route.screenshot && cy.screenshot()
    })
  }
}

/**
 * Handle exceptions if specified
 */
const checkExceptions = exceptions => {
  for (let exception of exceptions) {
    Cypress.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include(exception)
      done()
      return false
    })
  }
}

/**
 * Run suite
 */
for (let site of sites) {
  let testResource = `https://${site.domain}`

  describe(`${site.domain} is available`, () => {
    it('Loads successfully', () => {
      /**
       * Handle specified exceptions
       */
      site.testing &&
        site.testing.exceptions &&
        checkExceptions(site.testing.exceptions)

      /**
       * Visit resource and check
       * for document title
       */
      cy.visit(testResource)
      cy.title()

      /**
       * If specified take screenshot
       */
      site.screenshot && cy.screenshot()
    })

    /**
     * Run any specified additional routes
     */
    site.testing &&
      site.testing.routes &&
      checkRoutes(testResource, site.testing.routes)
  })
}
