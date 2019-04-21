const cron = require('node-cron'),
  shell = require('shelljs'),
  config = require('./config')

syncScheduler = {
  init: function(config) {
    this.config = config
    this.consoleOut.scriptHeader(config)
    return this
  },

  runCron: function() {
    for (let site of this.config.sites) {
      const localEnabled = site.local ? '--local' : null,
        path = this.config.projectsPath + site.scriptPath,
        cmd = `./${site.script} staging development ${localEnabled}`

      cron.validate(site.schedule)
        ? cron.schedule(site.schedule, () => {
            this.consoleOut.siteHeader(site).runSync(path, cmd)
          }, this.config.cronOptions).start()
        : this.invalidCronFormat()
    }
    return this
  },

  runSync: function(path, cmd) {
    shell.cd(path)
    shell.exec(
      cmd,
      { shell: '/bin/bash' },
      this.consoleOut.siteResults(code, stdout, stderr)
    )
    return this
  },

  invalidCronFormat: function() {
    shell.echo(
      `Cron schedule "${site.schedule}" is invalid. Please check your configuration.`
    )
    return this
  },

  validateSSH: function() {
    this.config.sshKey && shell.exec(`ssh-add -K ${this.config.sshKey}`)
    return this
  },

  consoleOut: {
    scriptHeader: function(config) {
      shell.echo('Sync Scheduler is being executed. Configured as:', config)
      return this
    },
    siteHeader: function(site) {
      shell.echo(`Initializing sync scripts for ${site.name}.`)
      shell.echo(
        `Running on schedule: ${site.schedule} (${this.config.timezone}).`,
      )
      return this
    },
    siteResults: (code, stdout, stderr) => {
      shell.echo('Exit code:', code)
      shell.echo('Program output:', stdout)
      shell.echo('Program stderr:', stderr)
      return this
    },
  },
}

syncScheduler
  .init(config)
  .validateSSH()
  .runCron()
