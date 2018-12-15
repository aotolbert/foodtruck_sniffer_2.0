require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
var NodeGeocoder = require('node-geocoder');
const db = require("./models");
const twitterWebhook = require('twitter-webhooks');

const PORT = process.env.PORT || 3001;
const geocoder = require('./helpers/geocoder');

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view


//Config for Twitter Webhook	
const webhook = twitterWebhook.userActivity({
  serverUrl: 'https://ftsreact.herokuapp.com',
  route: '/webhook/twitter',
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_SECRET,
  environment: process.env.TWITTER_WEBHOOK_ENV
});	

 //Checks for registered webhook. Registers & subscribes if none is found.	
webhook.getWebhook().then(data => {	
  console.log(data);
  if (!data[0].valid) {
    webhook.register();
    webhook.subscribe({
      userId: process.env.TWITTER_USER_ID,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessTokenSecret: process.env.TWITTER_ACCESS_SECRET
    });	
  }
});	
 //On Twitter event, update the database with new address.	
webhook.on('event', (event, userId, data) => {	
  const arr = data.text.split('|')[0];	
  const address = arr	
    .split(' ')	
    .slice(1)	
    .join(' ');
    var options = {
      provider: 'google',
      httpAdapter: 'https', 
      apiKey: process.env.GOOGLE_API_KEY, 
      formatter: null        
    }
    var geocoder = NodeGeocoder(options);
    let pos = {};
    geocoder.geocode(address)
      .then(function (res) {
        db.FoodTruck.update(	
          {	
            address: address,	
            lat: res[0].latitude,
            long: res[0].longitude,
            addressUpdated: data.created_at	
          },	
          {	
            where: {	
              twitterId: `@${data.user.screen_name}`	
            }	
          }	
        ).then(udpatedLocation => console.log(udpatedLocation));
    
      })
      .catch(function (err) {
          console.log(err);
      })

   	
});	
 // Routes	
app.use('/webhook/twitter', webhook);
app.use(routes);

require("./helpers/yelpRepeater");

if(true===true){
var address = "NC Music Factory"
}

const syncOptions = { force: false };

// Start the API server
db.sequelize.sync(syncOptions).then(() => {
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
});

