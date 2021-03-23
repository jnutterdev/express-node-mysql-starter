const express = require("express");
const exphbs = require('express-handlebars');

const app = express();

const sassMiddleware = require('node-sass-middleware');
require('dotenv').config();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Static files
const path = require('path');
app.use(sassMiddleware({
    src: __dirname + '/sass', 
    dest: __dirname + '/public/stylesheets', 
    debug: true, 
    force: true,
    outputStyle: 'compressed' 
  }),
  express.static(path.join(__dirname, 'public')))

// Templating engine
app.engine('hbs', exphbs({ 
    extname: 'hbs',
    defaultLayout: 'main', 
}));
app.set('view engine', 'hbs');

// simple route
app.get("/", (req, res) => {
  res.json({ message: Simple user management system." });
});

require("./app/routes/customer.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});
