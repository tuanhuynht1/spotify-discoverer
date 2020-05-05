function parseArtists (response){
    let artists = response.artists.items;
    // console.log(artists);
    let list = [];
    for (let i = 0; i < artists.length; i++){

        // choose most recent image if available
        const image = artists[i].images.length ? artists[i].images[0] : null;

        list.push({
            name: artists[i].name,
            id: artists[i].id,
            popularity: artists[i].popularity,
            image: image
        });
    }
    return list;
}

function parseTopTracks (response){
    let tracks = response.tracks;
    // console.log(artists);
    let list = [];
    for (let i = 0; i < tracks.length; i++){

        // choose most recent image if available
        const image = tracks[i].album.images.length ? tracks[i].album.images[0] : null;

        list.push({
            name: tracks[i].name,
            id: tracks[i].id,
            album: tracks[i].album.name,
            preview_url: tracks[i].preview_url,
            images: image
        });
    }
    return list;
}


module.exports = {parseArtists, parseTopTracks};
