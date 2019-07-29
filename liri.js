require("dotenv").config();
const fs = require('fs');
const moment = require('moment');
const axios = require('axios');
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const commands = [
    'concert-this',
    'spotify-this-song',
    'movie-this',
    'do-what-it-says'
];
const q = process.argv;
const qCommand = q[2];
let query = '';

for (let i = 3; i < q.length; i++) {
    query += `${q[i]}+`;
}

query = query.slice(0, -1);

if (qCommand === commands[0]) {
    const artist = query;
    axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`).then(response => {
        const concerts = response.data;
        for (let i = 0; i < concerts.length; i++) {
            const venueName = concerts[i].venue.name;
            const venueLocation = concerts[i].venue.city + ", " + 
                                  concerts[i].venue.country;
            let concertTime = concerts[i].datetime;
            concertTime = moment(concertTime).format("MM/DD/YYYY");
            const summary = `\n\n
                CONCERT #${i + 1}:
                ======================= \n
                venue: ${venueName} \n
                location: ${venueLocation} \n
                time: ${concertTime} \n
                =======================
            `;
            console.log(summary);

            updateFiles(summary);
        }
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    });

} else if (qCommand === commands[1]) {
    console.log('time to search a song!');
    let spotify = new Spotify(keys.spotify);
    const song = query;
    spotify.search(
        {
            type: 'track',
            query: song,
            limit: 5
        },
        (err,data) => {
            if (err) {
                console.log(err);
            }
            const songs = data.tracks.items;
            for (let i = 0; i < songs.length; i++ ) {
                let artists = songs[i].artists;
                let album = songs[i].album;
                let artistName = artists[0].name;
                let spotifyLink = (album.external_urls.spotify);
                let albumName = (album.name);
                let songName = (songs[i].name);

                const summary = (`\n\n
                SONG #${i + 1}:
                    ======================= \n
                    ARTIST: ${artistName} \n
                    ALBUM: ${albumName} \n
                    SONG: ${songName} \n
                    spotify link: ${spotifyLink} \n
                    =======================
                `);    
                console.log(summary);
                updateFiles(summary);                
            }
        }
    )
} else if (qCommand === commands[2]) {
    console.log('time to search a movie!');
    let movie = query;

    if (!query) {
        movie = 'Mr. Nobody';
    }
    axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${movie}&plot=long`).then(
        response => {
            console.log(response.data);
            const movieTitle = response.data.Title;
            const movieYear = response.data.Year;
            const imdbRating = response.data.imdbRating;
            const rottenTRating = response.data.Ratings[1].Value;
            const movieCountry = response.data.Country;
            const movieLanguage = response.data.Language;
            const moviePlot = response.data.Plot;

           const summary = (`\n\n
                _________Movie_________
                ======================= \n
                TITLE: ${movieTitle} \n
                RELEASE YEAR: ${movieYear} \n
                IMDB RATING: ${imdbRating} \n
                ROTTEN TOMATOES: ${rottenTRating} \n
                MOVIE COUNTRIES: ${movieCountry} \n
                MOVIE LANGUAGE: ${movieLanguage} \n
                MOVIE PLOT: ${moviePlot} \n

                =======================
            `);             
            console.log(summary);
            updateFiles(summary);
        }
    ).catch(
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
} else if (qCommand === commands[3]) {
    console.log('something');
} 



function updateFiles(data) {
    fs.appendFile('log.txt', data, err => {
        if (err) {
            console.log(err);
        }
        console.log('The File Was Updated With The Results!');
    });
}









