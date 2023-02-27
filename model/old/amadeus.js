var Amadeus = require('amadeus');

//initializes using tokens
var amadeus = new Amadeus({
  clientId: 'VQV2XIfKxmJs12H3mxSIZ1fNPZ4gFX3m',
  clientSecret: 'bLWxagafJEwldwsE'
});

amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'SYD',
    destinationLocationCode: 'BKK',
    departureDate: '2022-06-01',
    adults: '2'
}).then(function(response){
  console.log(response.data);
}).catch(function(responseError){
  console.log(responseError.code);
});