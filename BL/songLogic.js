const songController = require('../DL/controllers/songController')
const playlistLogic = require('./playlistLogic');


async function addSong(song){

    if(!song) throw({ code: 404, message: "missing data" });
    if(!song.playlistId, !song.id || !song.title || !song.url || !song.duration || !song.thumbnail) throw({ code: 404, message: "missing song data" });
    
    const playList = await playlistLogic.getPlaylistById(song.playlistId)
    if (!playList) throw({ code: 404, message: "playlist not found" });

    if( await getSongById(song.playlistId, song.id)) throw({ code:405, message: "Song already exist" });

    const updatePlaylist= await playlistLogic.updatePlaylist( song.playlistId , { $push :{ songs : song.id }});

    const newSong= await songController.create(song)

    return [updatePlaylist, newSong ];
    
};


// async function removeSong (playlistId, songId) {

//     if(!playlistId || !songId) throw({ code: 404, message: "missing data" });
    
//     const playList = await getPlaylistById(playlistId)
//     if (!playList) throw({ code: 404, message: "playlist not found" });
    
//     const song = await getSongById(playlistId, songId)
//     if (!song) throw({ code: 404, message: "song not found" });
    
//     const delSong= await songController.delet({playList[songs]:{id:songId}});///
//     return delSong;
    
// };

async function getSongById(playlistId, id){
    
    if(!playlistId || !id) throw({ code: 404, message: "missing data" });
    
    // const playList = await playlistLogic.getPlaylistById(playlistId)
    // if (!playList) throw({ code: 404, message: "playlist not found" });
    console.log("Slogic42", playlistId, id);

    const song = await songController.read({ playlistId, id })
    if (!song) throw({ code: 404, message: "song not found" });

    return song;
};

// { _id : 1 },
// { $set: { "grades.$[elem].mean" : 100 } },
// { arrayFilters: [ { "elem.grade": { $gte: 85 } } ] }


module.exports = { addSong, getSongById }
// , removeSong