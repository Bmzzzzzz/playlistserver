const songController = require('../DL/controllers/songController')
const playlistLogic = require('./playlistLogic');
const playlistController = require('../DL/controllers/playlistController')
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
    
    if(ifExist.length > 0){
        if(ifExist[0].isActive)
        throw({ code:405, message: "Song already exist" });
        else{
            await playlistController.update( {playlistId, "songs._id": ifExist[0]._id} , { "songs.$.isActive": true })
            return await songController.update({_id: ifExist[0]._id},{isActive: true});
        }
    } 
    
    const newSong= await songController.create(song)
    const updatePlaylist= await playlistLogic.updatePlaylist( {_id:playlistId} , { $push :{ songs :{_id: newSong._id} }});

    return [updatePlaylist, newSong ];
    
};


async function removeSong (_id, playlistId) {

    if(!_id) throw({ code: 404, message: "missing song id data" });
    
    const song = await getSongById(_id)
    if (song.length === 0) throw({ code: 404, message: "song not found" });
    
    await playlistController.update( {playlistId, songs : {_id}} ,  { "songs.$": {_id, isActive: false} });
    const delSong= await songController.del({_id});
    return delSong;
    
};

async function getPlaylistSongs(playlistId){
    
    if(!playlistId ) throw({ code: 404, message: "missing playlist id data" });

    const song = await songController.read({ playlistId, isActive: true })
    if (!song) throw({ code: 404, message: "no songs found" });

    return song;
};

async function getUserSongs(_id){
    
    if(!_id ) throw({ code: 404, message: "missing user id data" });

    const songs = await songController.read({ userId: _id, isActive: true })
    if (!songs) throw({ code: 404, message: "no songs found" });

    return songs;
};

async function getSongById(_id){
    
    if(!_id) throw({ code: 404, message: "missing song id data" });
    
    const song = await songController.read({ _id, isActive: true });
 
    if (song.length===0) throw({ code: 404, message: "song not found" });

    return song;
};

module.exports = { addSong, removeSong, getSongById, getPlaylistSongs, getUserSongs }