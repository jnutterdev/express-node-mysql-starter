const express = require("express");
const exphbs = require('express-handlebars');
const app = express();
// const sassMiddleware = require('node-sass-middleware');
const lessMiddleware = require('less-middleware');
require('dotenv').config();

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Static files
const path = require('path');
const { SSL_OP_MSIE_SSLV2_RSA_PADDING } = require("constants");

// import LESS middleware

app.use(lessMiddleware(__dirname + '/app/public/',{
  debug: true,
  dest: __dirname + '/app/public',
  force: true
}));
app.use(express.static(__dirname + '/public'));

// Templating engine

app.engine('hbs', exphbs({ 
    extname: 'hbs',
    layoutsDir: "./app/views/layouts/",
    defaultLayout: 'main'    
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/app/views'));
// simple route
app.get("/ping", (req, res) => {
  res.json({ message: "Simple API system working." });
});

// current routes used for app
require("./app/server/routes/main.routes.js")(app);
require("./app/server/routes/customer.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});
