const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const expresslayouts = require('express-ejs-layouts');
const mongodb = require('./config/mongoose');
const flash = require('connect-flash');
const customWare = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
}));

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expresslayouts);
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: false }));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(session({
    name: 'spark-bank',
    secret: "asldfnaldn",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/27017',
            mongooseConnection: mongodb,
            autoRemove: 'disabled'
        }, function (err) {
            console.log(err || 'connect-mongo');
        })
}));

app.use(flash());
app.use(customWare.setFlash);
app.use('/', require('./routers'));

app.listen(port, function (err) {
    if (err) {
        console.log("Error while creating server!!", err);
    }
    console.log("Succesfully server is started at ", port);
})