var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');


var getMyTweets =function(){

    var client = new Twitter(keys.twitterKeys);

    var params = { screen_name: 'jazz_fan_101' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
         //console.log(tweets);
            for (var i=0; i<tweets.length; i++){
            console.log(tweets[i].created_at);
            console.log(' ');
            console.log(tweets[i].text);
            }
        }
    });

}

var getArtistNames = function(artist) {
    return artist.name;
}

var getMeSpotify = function(songName) {

    spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        var songs = data.tracks.items;
            for(var i=0; i<songs.length; i++){
                console.log(i);
                console.log('artist(s): ' + songs[i].artist.map(getArtistNames));
                console.log('song name: ' + songs[i].name);
                console.log('preview song: ' + songs[i].preview_url);
                console.log('album: ' + songs[i].album.name);
                console.log('----------------------------');
            }
    });
}
var getMeMovie= function(movieName){
    request('http://www.omdbapi.com/?t=' + '&y=plot=short&r=json', function (error, response, body) {
        if(!error && response.statusCode == 200 ){    
        
            var jsonData = JSON.parse(body);

            console.log('Title: ' + jsonData.Title);
            console.log('Year: ' + jsonData.Year);
            console.log('Rated: ' + jsonData.Rated);
            console.log('IMDB Rating: ' + jsonData.imbdRating);
            console.log('Country: ' + jsonData.Country);
            console.log('Language: ' +jsonData.Language);
            console.log('Plot: ' + jsonData.Plot);
            console.log('Actors: ' + jsonData.Actors);
            console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
            console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
        }
    });
}
var doWhatItSays = function(){
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;

        var dataArr = data.split(',');

        if (dataArr.length == 2){
            pick(dataArr[0], dataArr [1]);
        } else if (dataArr.length ==1){
            pick(dataArr[0]);
        }
        console.log(data);
    });
}
var pick = function(caseData, functionData){
    switch(caseData) {
        case 'my-tweets':
            getMyTweets();
            break;
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case 'movie-this':
            getMeMovie(functionData);
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
        console.log('LIRI does not know that');
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);