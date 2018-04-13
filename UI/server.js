// require deployd
var deployd = require('deployd');
var port=2404;
// configure database etc. 
var server = deployd({
 port: process.env.PORT || port,
 env: process.env.ENV || 'development',

  db: {
    //Connection UN / PWD  should not contain an '@' included.
    connectionString: 'mongodb://localhost:27017/APPDB'
    //  mongo --port 27017 -u "myUserAdmin" -p "abc123" --authenticationDatabase "admin"
  }
});


// start the server
server.listen();

// debug
server.on('listening', function () {
  console.log("  DPD Server is listening on port: " + (process.env.PORT || port));
});

// Deployd requires this
server.on('error', function (err) {
  console.error(err);
  process.nextTick(function () { // Give the server a chance to return an error
    process.exit();
  });
});
