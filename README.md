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

### Contribution guidelines

Sure! My own style preferences are in a war right now so NBD; just keep it clean-ish.
