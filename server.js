require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const twitterWebhook = require('twitter-webhooks');

const db = require('./models');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

//Config for Twitter Webhook
const webhook = twitterWebhook.userActivity({
  serverUrl: 'https://foodtrucksniffer.herokuapp.com',
  route: '/webhook/twitter',
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_SECRET,
  environment: process.env.TWITTER_WEBHOOK_ENV
});

//Checks for registered webhook. Registers & subscribes if none is found.
webhook.getWebhook().then(data => {
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

  db.FoodTruck.update(
    {
      address: address,
      addressUpdated: data.created_at
    },
    {
      where: {
        twitterId: `@${data.user.screen_name}`
      }
    }
  ).then(udpatedLocation => console.log(udpatedLocation));
});

// Routes
app.use('/', webhook);
app.use(routes);

// Helper
require('./helper/yelpAPIcall');

const syncOptions = { force: false };

// If running a test, set syncOptions.force to false
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = false;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () =>
    console.log(
      `==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
    )
  );
});

module.exports = app;
