const cron = require('node-cron'),
  shell = require('shelljs'),
  config = require('./../config'),

  /**
   * Sync Scheduler
   *
   * Executes Roots' trellis syncronization script on a schedule
   */
  syncJob = {
    /**
     * Init
     *
     * @param config
     * @returns self
     */
    init: function() {
      this.config = config
      this.consoleOut.scriptHeader(config)
      return this
    },

    /**
     * Run Job Manager
     *
     * @param void
     * @returns self
     */
    runCron: function() {
      for (let site of this.config.sites) {
        const localEnabled = site.local ? '--local' : null,
          path = this.config.projectsPath + site.scriptPath,
          cmd = `./${site.script} ${site.origin} ${
            site.destination
          } ${localEnabled}`

        cron.validate(site.schedule)
          ? cron
              .schedule(
                site.schedule,
                () => {
                  this.consoleOut.siteHeader(site).runSync(path, cmd)
                },
                this.config.cronOptions,
              )
              .start()
          : this.consoleOut.invalidCronFormat(site)
      }
      return this
    },

    /**
     * Run Trellis Sync Script
     *
     * @param string path
     * @param string cmd
     * @returns self
     */
    runSync: function(path, cmd) {
      shell.cd(path)
      shell.exec(
        cmd,
        { shell: '/bin/bash' },
        this.consoleOut.siteResults(code, stdout, stderr),
      )
      return this
    },

    /**
     * Check to make sure SSH keys are set
     *
     * @param void
     * @returns self
     */
    validateSSH: function() {
      this.config.sshKey && shell.exec('ssh-add -K', this.config.sshKey)
      return this
    },

    /**
     * Message events to console
     */
    consoleOut: {
      /**
       * Start of script execution
       *
       * @param object config
       * @returns self
       */
      scriptHeader: function(config) {
        shell.echo('Sync Scheduler is being executed. Configured as:', config)
        return this
      },

      /**
       * Start of scheduled job execution
       *
       * @param object site
       * @returns self
       */
      siteHeader: function(site) {
        shell.echo('Initializing sync scripts for', site.name)
        shell.echo(
          `Running on schedule: ${site.schedule} (${this.config.timezone}).`,
        )
        return this
      },

      /**
       * End of scheduled job execution
       *
       * @param string code
       * @param string stdout
       * @param string stderr
       * @returns self
       */
      siteResults: function(code, stdout, stderr) {
        shell.echo('Exit code:', code)
        shell.echo('Program output:', stdout)
        shell.echo('Program stderr:', stderr)
        return this
      },

      /**
       * Notification of invalid cron spec
       *
       * @param object site
       * @returns self
       */
      invalidCronFormat: function(site) {
        shell.echo(
          `Cron schedule "${
            site.schedule
          }" is invalid. Please check your configuration.`,
        )
        return this
      },
    },
  }

/**
 * Export module
 *
 * @exports object syncJob
 */
module.exports = { syncJob }
