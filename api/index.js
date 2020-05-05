const {parseArtistIds} = require('../helpers/SpotifyParser');

// configure client credentials to request access token from spotify
const dotenv = require('dotenv');
dotenv.config();
const client_credentials = new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64');


const request = require('request');             // for making request to spotify api 
const router = require('express').Router();     // router for /api endpoints


// request server to server acess token from spotify, returns json body with access_token object inside 
router.get('/token', (req,res) => {
    // configure request to spotify
    const options  = {
        'method': 'POST',
        'url': 'https://accounts.spotify.com/api/token',
        'headers': {
          'Authorization': 'Basic ' + client_credentials,
        },
        form: {
          'grant_type': 'client_credentials'
        }
    };
    // make request to spotify
    request(options , (error,response) => { 
        if (!error && response.statusCode === 200) {
            res.send(JSON.parse(response.body));
        }
    });
})

// search artist by artist query body -> artist: kid cudi, header -> Authorization: Bearer asvd...adsa 
router.get('/artist', (req,res) =>{
    const { artist } = req.body;
    const token = req.header('Token');
    // configure spotify request
    const options = {
        'method': 'GET',
        'url': `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
        'headers': {
          'Authorization': 'Bearer ' + token
        }
    };
    // request all artist info that matches the query
    request(options, function (error, response) { 
        if (!error && response.statusCode === 200) {
            // [ {name,id} ]
            res.send(parseArtistIds(JSON.parse(response.body)));
        }
    });
})

// search tracks by artist, header -> Authorization: Bearer asvd...adsa 
router.get('/artist-top-tracks/:id', (req,res) =>{
    const { id } = req.params;
    const token = req.header('Token');
    // configure spotify request
    var options = {
        'method': 'GET',
        'url': `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
        'headers': {
          'Authorization': 'Bearer ' + token 
        }
    };
    // request all tracks for the artist's id
    request(options, function (error, response) { 
        if (!error && response.statusCode === 200) {
            res.send(JSON.parse(response.body));
        }
    });
})

// search track info for all specified, header -> Authorization: Bearer asvd...adsa, body -> ids: [...id] 
router.get('/tracks', (req,res) =>{
    const { ids } = req.body;
    const token = req.header('Token');

    // append ids delimited by '%2C'
    let urlEncodedIds = '';
    for (let i = 0; i < ids.length; i++){
        urlEncodedIds += ids[i];
        // concat %2C to all ids except the last one
        if (i !== ids.length - 1) {urlEncodedIds += '%2C'}
    }

    // configure spotify request
    var options = {
        'method': 'GET',
        'url': `https://api.spotify.com/v1/tracks?ids=${urlEncodedIds}&market=US`,
        'headers': {
          'Authorization': 'Bearer ' + token 
        }
    };
    // request all tracks for the artist's id
    request(options, function (error, response) { 
        if (!error && response.statusCode === 200) {
            res.send(JSON.parse(response.body));
        }
    });
})

module.exports = router;