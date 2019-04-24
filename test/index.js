const cron    = require('node-cron'),
      cypress = require('cypress'),
      config = require('../config')

/**
 * Test Job
 *
 * Executes Cypress spec on a timer
 */
const testJob = {
  init: function() {
    this.config = config
    return this
  },

  /**
   * Run Job Manager
   *
   * @param void
   * @returns self
   */
  runCron: function() {
    cron.schedule('*/15 * * * *', () => {
      console.log('Running test suite..')
      cypress
        .run({
          spec: `./cypress/integration/**`,
        })
        .then(results => {
          console.log(results)
        })
    }, this.config.cronOptions).start()

    return this
  }
}

/**
 * Export module
 *
 * @exports object testJobs
 */
module.exports = { testJob }
