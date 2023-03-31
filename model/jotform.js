// Makes an API request to Jotform API to get the latest form data
const jf = require("JotForm");
const fs = require('fs');
require('dotenv').config(); // loads .env file into process.env

// form id for the survey
var formID = "230895630318055"; 

jf.options({
    debug: true,
    apiKey: process.env.JOTFORM_API_KEY
});

jf.getFormSubmissions(formID)
.then(function(response){
    /**
     successful response including submissions of form with given id. Top submission is the newest.
     */

    // select newest response answers only
    response = response[0]["answers"];

    // save response to file jotform.json
    fs.writeFileSync('./data/jotform.json', JSON.stringify(response, null, 3));
    console.log("Response Saved to jotform.json!");
})
.fail(function(error){
    /*
     error during request or not authenticated
     */
    console.log(error);
});

