/**
 * Configuration
 */
module.exports = {
  projectsPath: '/users/username/sites/',
  sshKey: '/users/username/.ssh/do_rsa',
  logFile: '/users/username/logs/sync-script-process',
  sites: [
    {
      name: 'Example',
      domain: 'example.org',
      scriptPath: 'example.org/example.org/scripts/',
      script: 'scheduled-sync.sh',
      origin: 'staging',
      destination: 'development',
      schedule: '0 2 * * *',
      local: true,
    },
    {
      name: 'Another Example',
      domain: 'anotherexample.org',
      scriptPath: 'anotherexample.org/anotherexample.org/scripts/',
      script: 'scheduled-sync.sh',
      origin: 'staging',
      destination: 'development',
      schedule: '0 2 * * *',
      local: true,
      screenshot: true,
      testing: {
        routes: [
          {
            name: 'Stories',
            path: '/stories',
            screenshot: true,
          },
        ],
        exceptions: [] // place any chrome errors to be ignored here
      },
    },
  ],
  testsConfig: {
    spec: 'networkavailable.js'
  },
  cronOptions: {
    scheduled: true,
    timezone: 'America/Los_Angeles',
  },
}
