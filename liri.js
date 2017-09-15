//twitter 
var keys = require("./keys");

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");


var fs = require("fs");


var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
});

if (process.argv[2] === 'my-tweets') {

    var params = { screen_name: 'teddy_lockhart' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log(tweets[i].text);
            }
        }
    })
}

// Spotify
var spotify = new Spotify({
    id: keys.spotifyKeys.id,
    secret: keys.spotifyKeys.secret,
});

if (process.argv[2] === 'spotify-this-song') {
    var song = process.argv[3]
    
    // if ( song = " ") {
    //     return console.log("\nYou need to input a song!\n")
    // }

    spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }
    
    console.log ( "Artist: " + data.tracks.items[0].artists.name +
        "\nSong: " + data.tracks.items[0].name +
        "\nPreview: " + data.tracks.items[0].preview_url +
        "\nAlbum: " + data.tracks.items[0].album.name ); 
    })

}

// OMDB

if (process.argv[2] === 'movie-this') {
    var movie = process.argv[3]

    // if ( movie = " ") {
    //     return console.log("\nYou need to input a movie!\n")
    // }

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
    
    request(queryUrl, function(error, response, body) {
    
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title +
            "\nYear: " + JSON.parse(body).Year +
            "\nIMDB Rating: " + JSON.parse(body).imdbRating +
            "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
            "\nCountry of Production: " + JSON.parse(body).Country +
            "\nLanguages: " + JSON.parse(body).Language +
            "\nPlot: " + JSON.parse(body).Plot +
            "\nActors: " + JSON.parse(body).Actors );

        }
    });
}