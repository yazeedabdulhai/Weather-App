// Setup empty JS object to act as endpoint for all routes
projectData = [];
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 3030;
const server = app.listen(port, listening);
// Callback to debug
function listening(){
    console.log("server running..."); 
    console.log(`running on localhost: ${port}`);   
}

// Initialize all route with a callback function
app.get('/all', getData)

// Callback function to complete GET '/all'
function getData(req, res){
    res.send(projectData)
    console.log(projectData)
}

// Post Route
app.post('/addWeather', addWeather)
function addWeather(req, res){
    newData = {
        city: req.body.city,
        temp: req.body.temp,
        date: req.body.date,
        feelings: req.body.feelings
    }
    projectData.unshift(newData)     // To get first element directly
    res.send(projectData)
    console.log(projectData)
}