//twitter 
const keys = require("./keys");

const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const request = require("request");


const fs = require("fs");


const client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
});

if (process.argv[2] === 'my-tweets') {

   const params = { screen_name: 'teddy_lockhart' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log(tweets[i].text);
            }
        }
    })
}