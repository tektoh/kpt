
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
// app.get('/hello', function(req, res) {
//   res.render('hello', { message: 'Congrats, you just set up your app!' });
// });

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

app.get('/script.js', function(req, res) {
  res.type('application/javascript');
  Parse.Config.get({
    success: function(config) {
      res.render('script', {
        'JAVASCRIPT_KEY': config.attributes.JAVASCRIPT_KEY,
        'APPLICATION_ID': config.attributes.APPLICATION_ID
      });
    },
    error: function(e) {
      console.log('error', e);
      res.status(500).send('Error');
    }
  });
});

app.get('/', function(req, res) {
  res.render('index', {});
});

app.get('/login', function(req, res) {
  res.render('login', {});
});

app.get('/signup', function(req, res) {
  res.render('signup', {});
});

app.get('/kpt', function(req, res) {
  res.render('kpt', {});
});

// Attach the Express app to Cloud Code.
app.listen();
