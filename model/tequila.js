// Constructs a query string from the map and appends it to the base url
// Uses a a map data structure to store the optional parameters and their values
// Returns the url with the query string

// Imports
const axios = require('axios');
require('dotenv').config();
const apiKey = process.env.API_KEY;
const fs = require('fs');

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
function getFlights(base, query) {
    axios.get(buildUrl(baseURL, query), {
        headers: {
            'apikey': process.env.TEQUILA_API_KEY // API key from .env file
        }
    })
        .then(response => {
            console.log('Response Saved to Response.json');
            console.log('Printing Response to Console...');
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
            console.log("You suck!");
        });
}

var baseURL =  "https://api.tequila.kiwi.com/v2/search?";

//Link to full documenation of param queries: https://tequila.kiwi.com/portal/docs/tequila_api/search_api
var query = {
    'fly_from': 'LAX',
    'fly_to': 'JFK',
    'date_from': '19/04/2023', // start search date
    'date_to': '19/04/2023', // search date max
    'curr': 'USD', // currency
    'price_to': null, // max price
    'nights_in_dst_from': null,
    'nights_in_dst_to': null,
    'flight_type': null,
    'ret_from_diff_city': null,
    'ret_to_diff_city': null,
    'one_for_city': null,
    'one_per_date': null,
    'adults': null,
    'children': null,
    'infants': null,
    'selected_cabins': null,
    'mix_with_cabins': null,
    'adult_hold_bag': null,
    'adult_hand_bag': null,
    'child_hold_bag': null,
    'child_hand_bag': null,
    'fly_days': null,
    'fly_days_type': null,
    'ret_fly_days': null,
    'ret_fly_days_type': null,
    'locale': null,
    'price_from': null,
    'max_stopovers': null,
    'selected_airlines_exclude': null,
    'limit': null //limit number of results
}

getFlights(baseURL, query);
