# Site Maintenace Scripts

Lightweight Javascript utilities to help you be a better admin. Intended to be hacked on.

## Site Availability Monitor

Automates checking if your sites are being served correctly. Can take screenshots, check for multiple pages, etc. Defaults to one check per 15 minutes.

## Trellis Sync Scripts Scheduler

Automate your Trellis syncs.

### Usage

- `example.config.js` must be renamed to `config.js`.

- The function of each configuration parameter is largely self-evident.

- `yarn run script-scheduler` to run scripts

- `yarn run cypress open` will initiate the test suite manually. Runs in an electron window.

### Notes

- This software is in alpha. Please test thoroughly and check your logs frequently.
- Since this is intended to run headlessly it is necessary to modify Roots' `sync.sh` and remove the user prompt.

### Configuration

#### Top level stuff

| Config option | Purpose                                   |
| ------------- | ----------------------------------------- |
| projectsPath  | Absolute path to your sites/code folder   |
| sshKey        | Absolute path to your SSH key             |
| logFile       | Specify where you'd like to log to        |

#### Sites

| Config option | Purpose                                   |
| ------------- | ----------------------------------------- |
| name          | For humans                                |
| domain        | TLD. These scripts assume SSH             |
| scriptPath    | Location of Trellis Sync script           |
| script        | filename of sync script (it requires modifying the original script) |
| origin        | Where are you pulling from?               |
| destination   | Where are you pushing to?                 |
| schedule      | crontab format schedule for sync job      |
| local         | `TRUE` if not using VM/container          |

#### Testing

| Config option | Purpose                                   |
| ------------- | ----------------------------------------- |
| screenshot    | `TRUE` if you want test scripts to take screenshot of site |
| routes        | Array of additional URIs to test with cypress. Include `name`, `path` and `screenshot` for each route                              |
| exceptions       | if you get gnarly feedback from Cypress and wish to ignore the browser error so your test suite passes you can include a part of Chrome's error message string here and Cypress will stop pestering you.             |

#### CronOptions

| Config option | Purpose                                   |
| ------------- | ----------------------------------------- |
| scheduled    | leave as `true` most likely  |
| timezone       | used to schedule tasks            |


```js
module.exports = {
  //Location of your
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
  cronOptions: {
    scheduled: true,
    timezone: 'America/Los_Angeles',
  },
}
```

### Contribution guidelines

Sure! My own style preferences are in a war right now so NBD; just keep it clean-ish.
