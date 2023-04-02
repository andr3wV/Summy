// GIVE UP: Couldn't figure out how to get the reponse from Qualtrics. 

const axios = require('axios');
require('dotenv').config();

//Global Variables
var API_TOKEN = process.env.QUALTRICS_API_KEY;


const url = 'https://ca1.qualtrics.com/API/v3/surveys/SV_3kpIQt58dyn8lw2/export-responses';
const headers = {
    'X-API-TOKEN': API_TOKEN,
    'Content-Type': 'application/json'
  };
  
axios.post(url, {}, { headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });