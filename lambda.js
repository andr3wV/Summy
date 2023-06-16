const awsServerlessExpress = require('aws-serverless-express');
const app = require('./api/index'); // Make sure this path points to your updated Express app
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    awsServerlessExpress.proxy(server, event, context);
};