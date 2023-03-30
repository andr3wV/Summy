// Constructs a query string from the map and appends it to the base url
// Uses a a map data structure to store the optional parameters and their values
// Creates response.json file to store the response from the API which will then be displayed to the user

// Imports
const axios = require('axios');
require('dotenv').config();
const fs = require('fs');

//Global Variables
searchResponse = null;
var baseURL =  "https://api.tequila.kiwi.com/v2/search?";
//Link to full documenation of param queries: https://tequila.kiwi.com/portal/docs/tequila_api/search_api
var checkQuery = {
    'booking_token': null, //required
    'bnum': null, //required
    'adults': null, //required
    'children': 0, //required
    'infants': 0, //required
    'session_id': null, //required
    'currency': 'USD',
    'visitor_uniqid': null,
}

var saveQuery = {


}

var confirmQuery = {

}

// builds the API url with a base string and a map of parameters
function buildUrl(base, query) {
    var url = base;
    var first = true;
    for (var key in query) {
        if (query[key] != null) {
            url += '&';
            url += key + '=' + query[key];
        }
    }
    return url;
}

//make api Get request to the url using axios
function checkFlight(query) {
    console.log("Making GET API Request...");
    axios.get(buildUrl(baseURL, query), {
        headers: {
            'content-type': 'application/json',
            'apikey': process.env.TEQUILA_API_KEY // API key from .env file
        }
    })
        .then(response => {
            response = response.data;
            console.log('Response Saved to response.json!');
            fs.writeFileSync('data/getResponse.json', JSON.stringify(response.data, null, 3));
        })
        .catch(error => {
            console.log(error);
            console.log("You suck!");
        });
}

// Function to start checking the flight loop
function startFlightCheck(query) {
    // Set the interval to 2 or 3 seconds
    const intervalTime = 2000;
    const intervalId = setInterval(() => {
      // Make the API request
      checkFlight(query);
      // Check the values of the required properties
      const response = JSON.parse(fs.readFileSync('data/getResponse.json'));
      const flightsChecked = response.flights_checked;
      const priceChange = response.price_change;
      const flightsInvalid = response.flights_invalid;
      // If all required properties are set to the desired values, stop the interval
      if (flightsChecked && !priceChange && !flightsInvalid) {
        clearInterval(intervalId);
        console.log("Flight is ready to book!");
        return true;
      }
      // TODO: make an exception for if the price changes!
    }, intervalTime);
  }

  function saveBooking(){
    console.log('Making POST API Request...');
    axios.post(buildUrl(baseURL, query), {
        headers: {
            'content-type': 'application/json',
            'apikey': process.env.TEQUILA_API_KEY // API key from .env file
        }
    })
        .then(response => {
            response = response.data;
            console.log('Response Saved to response.json!');
            fs.writeFileSync('data/saveBooking.json', JSON.stringify(response.data, null, 3));
        })
        .catch(error => {
            console.log(error);
            console.log("You suck!");
        });
  }