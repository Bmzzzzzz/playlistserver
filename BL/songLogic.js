const songController = require('../DL/controllers/songController')
const playlistLogic = require('./playlistLogic');
const userLogic = require('./userLogic');


async function addSong(song){

    const {playlistId, userId, id, title, url, duration_formatted} = song;
    if(!song) throw({ code: 404, message: "missing data" });
    if(!playlistId || !userId || !id || !title || !url || !duration_formatted ) throw({ code: 404, message: "missing song data" });
    
    const user = await userLogic.getUserDetailsById(userId)
    if (!user) throw({ code: 404, message: "user not found" });

    const playList = await playlistLogic.getPlaylistById(playlistId)
    if (!playList) throw({ code: 404, message: "playlist not found" });

    const ifExist = await songController.read({ playlistId, id })
    if(ifExist.length > 0) throw({ code:405, message: "Song already exist" });
   
    const newSong= await songController.create(song)
    const updatePlaylist= await playlistLogic.updatePlaylist( playlistId , { $push :{ songs : newSong._id }});

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

async function getPlaylistSongs(playlistId){
    
    if(!playlistId ) throw({ code: 404, message: "missing playlist id data" });

    const song = await songController.read({ playlistId })
    if (!song) throw({ code: 404, message: "no songs found" });

    return song;
};

async function getUserSongs(_id){
    
    if(!_id ) throw({ code: 404, message: "missing user id data" });

    const songs = await songController.read({ userId: _id })
    if (!songs) throw({ code: 404, message: "no songs found" });

    return songs;
};

async function getSongById(playlistId, id){
    
    if(!playlistId || !id) throw({ code: 404, message: "missing data" });
    
    const song = await songController.read({ playlistId, id })
 
    if (song.length===0) throw({ code: 404, message: "song not found" });

    return song;
};

module.exports = { addSong, getSongById, getPlaylistSongs, getUserSongs }
// , removeSong