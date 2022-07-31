const playlistController = require('../DL/controllers/playlistController');
const userLogic = require('./userLogic')


async function addPlayList(playlist){
    const {name, userId, id,songs, img, description, category} = playlist;
    if (!name)
    throw {code: 400, message: "missing playlist name" };
    if (!userId)
    throw {code: 400, message: "missing user id" };

    const user = await userLogic.getUserDetailsById(userId);
    if (!user) throw({ code: 404, message: "user not found" });

    if (!songs) playlist.songs = [];

    const newPlaylist = await playlistController.create(playlist);
    if (!newPlaylist) throw({ code: 444, message: "couldn't create playlist" });
    const addToUser = await userLogic.updateUser(userId, {$push :{ playlists: id}})
    if (!addToUser) throw({ code: 444, message: "couldn't update user" });
    return (newPlaylist,addToUser);
}

async function getAllPlayLists(){
    const playLists = await playlistController.read({});
    if (playLists.length === 0) throw({ code: 404, message: "no playLists" });
    return playLists;
}

async function getPlaylistById(id){
    const playList = await playlistController.readOne({ id});
    if (!playList) throw({ code: 404, message: "playlist not found" });
    return playList;
}

async function updatePlaylist(id, newFiled) {
    if(!id || !newFiled) throw({ code: 404, message: "missing data" });
    
    const playList = await getPlaylistById(id)
    if (!playList) throw({ code: 404, message: "playlist not found" });
    
    const updatePlaylist= await playlistController.update({ id: id }, newFiled);
    return updatePlaylist;
};

async function del (id) {
    
    const playList = await getPlaylistById(id)
    if (!playList) throw({ code: 404, message: "playlist not found" });
    
    const delPlaylist = await playlistController.del({ id: id });
    return delPlaylist;
}

async function addSong(playlistId, song){

    if(!playlistId || !song) throw({ code: 404, message: "missing data" });
    
    const playList = await getPlaylistById(playlistId)
    if (!playList) throw({ code: 404, message: "playlist not found" });

    const updatePlaylist= await playlistController.update({ id: playlistId }, { $push :{ songs: song}});
    return updatePlaylist;
    
};


// async function removeSong (playlistId, songId) {

//     if(!playlistId || !songId) throw({ code: 404, message: "missing data" });
    
//     const playList = await getPlaylistById(playlistId)
//     if (!playList) throw({ code: 404, message: "playlist not found" });
    
//     const song = await getSongById(playlistId, songId)
//     if (!song) throw({ code: 404, message: "song not found" });
    
//     const delSong= await playlistController.delet({playList[songs]:{id:songId}});///
//     return delSong;
    
// };

// async function getSongById(playlistId, songId){
    
//     if(!playlistId || !songId) throw({ code: 404, message: "missing data" });
    
//     const playList = await getPlaylistById(playlistId)
//     if (!playList) throw({ code: 404, message: "playlist not found" });
    
//     const song = await playlistController.findAndUpdate({_id: playlistId},,{songs.sond.id})
// };

// { _id : 1 },
// { $set: { "grades.$[elem].mean" : 100 } },
// { arrayFilters: [ { "elem.grade": { $gte: 85 } } ] }

module.exports = { getAllPlayLists, getPlaylistById, addPlayList, updatePlaylist, del, addSong };

// getSongById, removeSong
