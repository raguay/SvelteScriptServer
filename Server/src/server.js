
const express = require('express')
const app = express()
const port = 3000
const bodyparser = require('body-parser')
const serveStatic = require('serve-static')
const childprocess = require('child_process')
const path = require('path')
const os = require('os')

//
// Load the middleware:
//
app.use(bodyparser.json()) // for parsing application/json
app.use(bodyparser.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded

//
// This will serve the UI files.
//
app.use(serveStatic('../UI/public/'))

//
// Now, Serve the API routes that run programs and scripts from the
// user.
//
app.route('/api/commandline').put((req, res, next) => {
  //
  // Execute the commandline and get the results.
  //
  var commandLine = req.body.script + " " + req.body.args.join(' ') + '\n';
  var line = '';
  try {
    line = childprocess.execSync(commandLine,{
      cwd: os.homedir()
    });
  } catch(e) {
    line = e.toString()
  }
  
  //
  // return the results.
  //
  res.json({
    result: line.toString()
  })
});


// Start the server.
//
app.listen(port, () => {
  console.log(`Script Server is listening at http://localhost:${port}`)
})

