// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

const path = require('path');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();


app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

app.locals.homeRoute = `/`;
app.locals.createCelebritiesRoute = `/celebrities/create`;
app.locals.listCelebritiesRoute = `/celebrities`;
app.locals.createMoviesRoute = `/movies/create`;
app.locals.listMoviesRoute = `/movies`;

// 👇 Start handling routes here
const celebrities = require('./routes/celebrities.routes.js');
const movies = require('./routes/movies.routes.js');
const index = require('./routes/index');

app.use('/', index);
app.use('/celebrities', celebrities);
app.use('/movies', movies);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
