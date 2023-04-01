// Constructs a query string from the map and appends it to the base url
// Uses a a map data structure to store the optional parameters and their values
// Creates response.json file to store the response from the API which will then be displayed to the user

// Imports
const axios = require('axios');
const apiKey = process.env.API_KEY;
const fs = require('fs');
require('dotenv').config();
const flight = require('./data/flight');
const jotform = require('./data/jotform');

class Passenger {
    constructor(name, surname, email, phone, birthday, title) {
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.phone = phone;
      this.cardno = 'D54169411x'; // placeholder ID
      this.birthday = birthday;
      this.nationality = 'US';
      this.title = title;
      this.expiration = "2030-12-10";
      this.category = 'adult';
    }

    toObject() {
        const obj = {};
        obj.name = this.name;
        obj.surname = this.surname;
        obj.email = this.email;
        obj.phone = this.phone;
        obj.cardno = this.cardno;
        obj.birthday = this.birthday;
        obj.nationality = this.nationality;
        obj.title = this.title;
        obj.expiration = this.expiration;
        obj.category = this.category;
        return obj;
      }
}

var baseURL =  "https://api.tequila.kiwi.com/v2/booking/check_flights?";

//Link to full documenation of param queries: https://tequila.kiwi.com/portal/docs/tequila_api/search_api
var checkQuery = {
    'booking_token': flight['booking_token'], 
    'bnum': 0, //Assume zero for now, but can look into bags API which isn't too difficult
    'adults': parseInt(jotform['3']['answer']), //required
    'infants': 0, //required
    'children': 0, //required
    'session_id': "", //required
    'currency': 'USD',
    'baggage': [],
    'session_id': null
} 

// TODO: BAGGAGE IS BROKEN - CAN'T BOOK FLIGHTS BECAUSE OF THIS
var saveQuery = {
    'lang': 'en',
    'passengers': [],
    'locale': 'en',
    'booking_token': flight['booking_token'],
    'session_id': null,
    'baggage': [
    ]
}

// Populates all passengers - up to four passengers supported using this loop
for (let i = 5; i <=23; i+=6) {
    // Example condition to check if currentItem should be added as a passenger
    if (jotform[i.toString()]['answer']) {  
        
        // If there are four travelers, the last phone number index is shifted one to the right, so the index i won't work for it. This is a workaround.
        try {
            const newPassenger = new Passenger('Test','Test', jotform[(i+4).toString()]['answer'], jotform[(i+5).toString()]['answer']['full'].replace(/\D/g, ''), jotform[(i+1).toString()]['prettyFormat'], jotform[(i).toString()]['answer']['prefix'].toLowerCase().slice(0,-1)).toObject();
            saveQuery.passengers.push(newPassenger);
        } catch (error) {
            const newPassenger = new Passenger('Test','Test', jotform[(i+4).toString()]['answer'], jotform['29']['answer']['full'].replace(/\D/g, ''), jotform[(i+1).toString()]['prettyFormat'], jotform[(i).toString()]['answer']['prefix'].toLowerCase().slice(0,-1)).toObject();
            saveQuery.passengers.push(newPassenger);
        }
    }
}
console.log("All passengers populated!")

// console.log(saveQuery);
// console.log(saveQuery.passengers);

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
    console.log("Running checkFlight");
    return axios.get(buildUrl(baseURL, query), {
        headers: {
            'content-type': 'application/json',
            'apikey': process.env.TEQUILA_API_KEY // API key from .env file
        }
    })
        .then(response => {
            console.log("Flight has been checked!");
            return response.data; // return the response data
        })
        .catch(error => {
            console.log(error);
            console.log("There was an error somewhere, and it's time to debug!");
            throw error; // re-throw the error so it can be caught by the caller
        });
}

// Function to start checking the flight loop
function startFlightCheck(query) {
    console.log("Running startFlightCheck");
    const intervalTime = 2000;
    return new Promise((resolve, reject) => {
      const intervalId = setInterval(async () => {
        try {
          const responseData = await checkFlight(query);
         // fs.writeFileSync('./data/response.json', JSON.stringify(responseData, null, 3));

          const flightsChecked = responseData.flights_checked;
          const priceChange = responseData.price_change;
          const flightsInvalid = responseData.flights_invalid;

          if(!checkQuery.session_id) checkQuery['session_id'] = responseData['session_id']; // sets the session_id for future checkFlight calls
          if(!saveQuery.session_id) saveQuery.session_id = responseData['session_id']; // sets the session_id for saveBooking proactively
          if (flightsChecked && !priceChange && !flightsInvalid) {
            clearInterval(intervalId);
            console.log("Flight is ready to book!");

            /*  Update baggage information for saveBooking query */

            //saveQuery.baggage = [responseData['baggage']['combinations']]



            resolve(true);
          }
        } catch (error) {
          clearInterval(intervalId);
          reject(error);
        }
      }, intervalTime);
    });
  }
  
  
// Function to start checking the flight loop
function saveBooking(query){
    console.log("Running saveBooking()");
    console.log(query);
    axios.post('https://api.tequila.kiwi.com/v2/booking/save_booking', query, {
        headers: {
            'content-type': 'application/json',
            'apikey': process.env.TEQUILA_API_KEY // API key from .env file
        }
    })
    .then(response => {
        console.log('Response Saved to saveBooking.json!');
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

startFlightCheck(checkQuery)
    .then(() => {
        //console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        //console.log(saveQuery);
        saveBooking(saveQuery);
    })
    .catch((error) => {
        console.error(error);
    });
