const { syncJob } = require('./sync/index'),
      { testJob } = require('./test/index')

/**
 * Sync
 */
/* syncJob
  .init()
  .validateSSH()
  .runCron() */

/**
 * Test
 */
testJob
  .init()
  .runCron()
