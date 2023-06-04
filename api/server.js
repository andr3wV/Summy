const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const summarize = require('./summarize');
const encode = require('./encode.js');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Register the submit handler as a POST route to summarize text
app.post('/api/summarize', summarize);
app.post('/api/encode', encode);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});