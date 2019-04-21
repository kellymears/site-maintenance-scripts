/**
 * Configuration
 */
module.exports = {
  projectsPath: '/users/username/sites/',
  sshKey: '/users/username/.ssh/do_rsa',
  logFile: '/users/username/logs/sync-script-process',
  sites: [
    {
      name: 'Example Site',
      scriptPath: 'example.com/site/scripts/',
      script: 'sync.sh',
      origin: 'staging',
      destination: 'development',
      schedule: '0 2 * * *',
      local: true,
    },
    {
      name: 'Example Site 2',
      scriptPath: 'example2.com/site/scripts/',
      script: 'sync.sh',
      origin: 'staging',
      destination: 'development',
      schedule: '0 2 * * *',
      local: true,
    },
  ],
  cronOptions: {
    scheduled: true,
    timezone: 'America/Los_Angeles',
  },
}
