# Trellis Sync Scripts Scheduler

Automate your Trellis syncs with an easily configurable cron-adjacent JS package.

## Notes

- This software is in alpha. Please test thoroughly and check your logs frequently.
- `example.config.js` must be renamed to `config.js`. The function of each configuration parameter is largely self-evident.
- Since this is intended to run headlessly it is necessary to modify Roots' `sync.sh` and remove the user prompt.
- `sync-script-scheduler.js` will run the script directly. If you wish to require it in another script you should remove the lines which follow the module export.
- `sync-script-process.js` will run the script and keep it alive. You could set this script to run on startup.