function parseArtistIds (response){
    let artists = response.artists.items;
    // console.log(artists);
    let list = [];
    for (let i = 0; i < artists.length; i++){
        list.push({
            name: artists[i].name,
            id: artists[i].id,
        });
    }
    return list;
}

module.exports = {parseArtistIds};

