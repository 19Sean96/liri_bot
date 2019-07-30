# Liri Bot: A Simple Node.js Project
This Liri Bot will take commands for songs, movies &amp; concert times and provide information on those queries. The functionality of this app is through node.js, so a .env is required.

## APIs Used:
  * Spotify
  * Bands In Town
  * OMDB

## NPM Packages Used:
  * axios 
    * *This Package Was Used For Making HTTP Requests On Both The **Bands In Town** & **OMDB** api*
  * dotenv 
    * *For Securing API keys*
  * moment
    * *Formatting Dates Into Readable Format*
  * node-spotify-api
    * *For Making HTTP Requests To Spotify
    
    
 **Please note: in order to use this application you will need to create a .env with the following code:
 ```
 # Spotify API keys

SPOTIFY_ID=<Your API Key Here>
SPOTIFY_SECRET=<Your API Secret Here>
```
_You can create a spotify key very easy by visiting [their website](https://developer.spotify.com/documentation/web-api/) 
