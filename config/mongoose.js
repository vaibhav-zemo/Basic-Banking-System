const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/basic_banking_db");
const db = mongoose.connection;

db.on('error', console.error.bind("Error while connecting to database"));
db.once('open', function () {
    console.log("Successfully connected with database");
})