module.exports = {
  projectsPath: '/users/kellymears/code/sites/',
  sshKey: '/users/Kellymears/.ssh/do_rsa',
  logFile: '/users/Kellymears/logs/sync-script-process',
  sites: [
    {
      name: 'NDN Collective',
      scriptPath: 'ndncollective.org/ndncollective.org/scripts/',
      script: 'scheduled-sync.sh',
      schedule: '0 2 * * *',
      local: true,
    },
  ],
  cronOptions: {
    scheduled: true,
    timezone: 'America/Los_Angeles',
  },
}
