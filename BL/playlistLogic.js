const playlistController = require('../DL/controllers/playlistController');
const userLogic = require('./userLogic')


async function addPlayList(playlist){
    const {title, userId, id,songs, img, description, category} = playlist;
    if (!title)
    throw {code: 400, message: "missing playlist title" };
    if (!userId)
    throw {code: 400, message: "missing user id" };

    const user = await userLogic.getUserDetailsById(userId);
    if (!user) throw({ code: 404, message: "user not found" });

    const playlistExist = await getPlaylistsNamesByUserId(userId)
    if ( playlistExist.find(t=>t.title===title) ) throw({code: 405, message: "playlist already exist"})

    if (!songs) playlist.songs = [];

    const newPlaylist = await playlistController.create(playlist);
    if (!newPlaylist) throw({ code: 444, message: "couldn't create playlist" });
    const addToUser = await userLogic.updateUser(userId, {$push :{ playlists: newPlaylist._id}})
    if (!addToUser) throw({ code: 444, message: "couldn't update user" });
    return ([newPlaylist,addToUser]);
}

async function getAllPlayLists(){
    const playLists = await playlistController.read({});
    if (playLists.length === 0) throw({ code: 404, message: "no playLists" });
    return playLists;
}

async function getPlaylistById(_id){
    const playList = await playlistController.readOne({ _id});
    if (!playList) throw({ code: 404, message: "playlist not found" });
    return playList;
}

async function getPlaylistsNamesByUserId(id){
    const playLists = await playlistController.read({ userId : id },"title");
    if (!playLists) throw({ code: 404, message: "playlist not found" });
    return playLists;
}

async function getPlaylistsByUserId(id){
    const playLists = await playlistController.read({ userId : id });
    if (!playLists) throw({ code: 404, message: "playlist not found" });
    return playLists;
}

async function updatePlaylist(id, newFiled) {
    if(!id || !newFiled) throw({ code: 404, message: "missing data" });
    
    const playList = await getPlaylistById(id)
    if (!playList) throw({ code: 404, message: "playlist not found" });
    
    const updatePlaylist= await playlistController.update({ _id: id }, newFiled);
    return updatePlaylist;
};

async function del (id) {
    
    const playList = await getPlaylistById(id)
    if (!playList) throw({ code: 404, message: "playlist not found" });
    
    const delPlaylist = await playlistController.del({ id: id });
    return delPlaylist;
}

module.exports = { getAllPlayLists, getPlaylistById, getPlaylistsNamesByUserId, getPlaylistsByUserId, addPlayList, updatePlaylist, del };
