// Importing express

var express = require('express');

//mongoose : dbconnectivity ,provides functions to connect to mongodb easily rather than do in nodejs
var mongoose = require('mongoose')
//body-parser : parse strings to json()
var bodyParser = require('body-parser')

// Making instance of express
const app = express();

// Every method of express instance have this syntax ---> app.<methodName>('path', handleFunction())

var config = require('./config.json');
//connect to mongodb using url provided in config.json
mongoose.connect(config.connectionString);

app.use(bodyParser.json());

//for empty path pick static content (from static folder)
app.use('', express.static('static'));      // Hosting /static 's content on backend --- specifically index.html in /static
app.use('/home/', express.static('static'));

// app.use('', function (request, response, next) {
//     middlewareFunction();
//     next();
// });

// var middlewareFunction = function () {
//     console.log("Middleware test called");
// }

// making a function to handle GET request from /getBook page
/*
    more routing functions :
        app.post()
        app.put()
        app.delete()
        app.use()

*/

var stockRoute = require('./models/stock');
app.use('/stock', stockRoute);

var orderRoute = require('./models/order');
app.use('/flowerorder', orderRoute);

const portNumber = 8000;
app.listen(portNumber, () => {
    console.log(`App is listening at ${portNumber}`);
});