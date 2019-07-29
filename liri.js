require("dotenv").config();
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
console.log(query);

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
            console.log(`\n\n
                CONCERT #${i + 1}:
                ======================= \n
                venue: ${venueName} \n
                location: ${venueLocation} \n
                time: ${concertTime} \n
                =======================
            `);
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

                console.log(`\n\n
                SONG #${i + 1}:
                    ======================= \n
                    ARTIST: ${artistName} \n
                    ALBUM: ${albumName} \n
                    SONG: ${songName} \n
                    spotify link: ${spotifyLink} \n
                    =======================
                `);                    
            }
        }
    )
} else if (qCommand === commands[2]) {
    console.log('time to search a movie!');

} else if (qCommand === commands[3]) {
    console.log('something');

} else {

}



let artist = "hello";

let bitURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

// console.log(process.env);







// OMDB
// AXIOS API
// NEED TO RENDER:
    // movie title
    // year released
    //imdb rating
    // rotten tomatoes rating
    // country where produced
    // language
    // plot
    // actor list
    // default to "Mr. Nobody"
    //key: trilogy