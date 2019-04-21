const forever = require('forever'),
      config = require('config')

(new (forever.Monitor)('sync.js', {
  silent: true,
  args: [],
  outfile: config.logFile
})).start()