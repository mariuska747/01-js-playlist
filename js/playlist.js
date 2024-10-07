/**
 * @typedef {Object} Song
 * @property {string} title - The title of the song.
 * @property {string} artist - The artist of the song.
 * @property {string} genre - The genre of the song.
 * @property {number} duration - The duration of the song in seconds.
 * @property {boolean} favorite - Whether the song is marked as a favorite.
 */
// Example: { title: 'Song Title', artist: 'Song Artist', genre: 'Song Genre', duration: 180, favorite: false }


/**
 * @typedef {Object} Playlist
 * @property {string} name - The name of the playlist.
 * @property {Song[]} songs - The list of songs in the playlist.
 */
// Example: { name: 'Playlist Name', songs: [{ title: 'Song Title', artist: 'Song Artist', genre: 'Song Genre', duration: 180, favorite: false }] }

/*
let playlists = {
    playlist: Rock,
        songs: [
            {title:'one',artist:'metallica',genre:'heavy',duration:1000},
            {title:'masterofpuppets',artist:'metallica',genre:'heavy',duration:3000},

    ],
    playlist: Pop,
        songs: [
            {title:'1',artist:'11',genre:'111',duration:1000},
            {title:'2',artist:'22',genre:'222',duration:3000},
        ],
    
};
*/ 



const musicCatalog = () => {
  /**
   * Array of playlists in the catalog.
   * @type {Playlist[]}
   */
  let playlists = [];




  /**
   * Adds a new playlist to the catalog.
   * @param {string} playlistName - The name of the new playlist.
   */
  const createPlaylist = (playlistName) => {
    //playlists = [...playlists, playlistName];
    playlists = [...playlists, { name:playlistName, songs:[] } ];
    if (playlists.name === playlistName){
      throw new Error ('La lista ya existe')
    }
  }
   
  


  /**
   * Gets all playlists in the catalog.
   * @returns {Playlist[]} The list of all playlists.
   */
  const getAllPlaylists = () => {
    return playlists;
  };
    



  /**
   * Removes a playlist from the catalog.
   * @param {string} playlistName - The name of the playlist to remove.
   */
    const removePlaylist = (playlistName) => {
      playlists = playlists.filter(element => element.name !== playlistName);
      //console.log(playlists)
    };



  /**
   * Adds a song to a specific playlist.
   * @param {string} playlistName - The name of the playlist to add the song to.
   * @param {{ title: string, artist: string, genre: string, duration: number }} song - The song to add to the playlist.
   * @throws {Error} If the playlist is not found.
   */
  
    
  const addSongToPlaylist = (playlistName, song) => {

    const playlistExists = playlists.some((playlist) => playlist.name === playlistName);
  
    // Si la playlist no existe, lanzamos un error
    if (!playlistExists) {
      throw new Error(`La playlist "${playlistName}" no existe.`);
    }

    const newPlaylist = playlists.map(playlist => {
      if (playlist.name === playlistName) {
        // Si la playlist coincide, añadimos la canción
        return {
          ...playlist,
          songs: [...playlist.songs, song],
        };
      }
      // Si no coincide, simplemente devolvemos la playlist tal cual
      return playlist;
    });
  
    // Actualizamos la lista de playlists con la nueva versión
    playlists = newPlaylist;
  };
    



  /**
   * Removes a song from a specific playlist.
   * @param {string} playlistName - The name of the playlist to remove the song from.
   * @param {string} title - The title of the song to remove.
   * @throws {Error} If the playlist or song is not found.
   */

  
  const removeSongFromPlaylist = (playlistName, song) => {

    const playlist = playlists.find((playlist) => playlist.name === playlistName);

    // Si la playlist no existe, lanzamos un error
    if (!playlist) {
      throw new Error(`La playlist "${playlistName}" no existe.`);
    }
  
    const songExists = playlist.songs.includes(song);
  
    // Si la canción no existe en la playlist, lanzamos un error
    if (!songExists) {
      throw new Error(`La canción "${song.title}" no existe en la playlist "${playlistName}".`);
    }

    const newPlaylist = playlists.map(playlist => {
      if (playlist.name === playlistName) {
        return {
          ...playlist,
          songs: playlist.songs.filter(songsToKeep => songsToKeep !== song), // Filtramos la canción que queremos eliminar
        };
      }
      return playlist;
    });
  
    // Actualizamos la lista de playlists con la nueva versión
    playlists = newPlaylist;
  };


  /**
   * Marks a song as a favorite or removes the favorite status.
   * @param {string} playlistName - The name of the playlist containing the song.
   * @param {string} title - The title of the song to mark as a favorite.
   */
  const favoriteSong = (playlistName, title) => {

    const actualPlaylist = playlists.find(element => element.name === playlistName);
    const fav =  actualPlaylist.songs.find(element => element.title === title);

      // Si la canción no tiene la propiedad 'favorite', la inicializamos en false
    if (fav.favorite === undefined) {
      fav.favorite = false;
    }
/*
    if (fav.favorite === false){
      fav.favorite = true;
    }else if(fav.favorite === true){
      fav.favorite = false;
    }
*/
    // ternario : fav.favorite = fav.favorite === true ? false : true;
    fav.favorite = !fav.favorite

    return fav.favorite;

  };


  /**
   * Sorts songs in a specific playlist by a given criterion (title, artist, or duration).
   * @param {string} playlistName - The name of the playlist to sort songs in.
   * @param {'title' | 'artist' | 'duration'} criterion - The criterion to sort by.
   * @returns {Song[]} The list of sorted songs.
   * @throws {Error} If the playlist is not found or the criterion is invalid.
   */
  const sortSongs = (playlistName, criterion) => {

    // está refactorizado. Código inicial comentado


    const actualPlaylist = playlists.find(element => element.name === playlistName);
  
    if(!actualPlaylist){
      throw new Error(`La lista ${actualPlaylist} no existe`);
    }

    const validCriteria = ['artist','title','duration'];
    if (!validCriteria.includes(criterion)){
      throw new Error(`El criterio elegido ${criterion} no existe`);
    }

    actualPlaylist.songs.sort((a,b)=>{
      if (criterion==='duration'){
        return a.duration - b.duration
      } else {
        return a[criterion].localeCompare(b[criterion])
      }});
      
    return actualPlaylist.songs  
  
    /*
    const changeCriteria = (criteria) => {
      
        actualPlaylist.songs.sort((a,b) => (
          a[criteria] < b[criteria] ? -1: 
          a[criteria] > b[criteria] ? 1: 
          0
        ))
          */
      /*  
      if (criterion === 'duration'){
        actualPlaylist.songs.sort((a,b) => a.duration - b.duration);
      }
      else if (criterion === 'artist'){
        changeCriteria ('artist');
      }
      else if (criterion === 'title'){
        changeCriteria ('title');
      }
      */

      // inicio
    /** 
    else if (criterion === 'artist'){
      actualPlaylist.songs.sort((a,b) =>{
      if (a.artist < b.artist) return -1;
      else if(a.artist > b.artist) return 1;
      return 0;
    });

    } else if (criterion === 'title'){
        actualPlaylist.songs.sort((a,b) =>{
        if (a.title < b.title) return -1;
        else if(a.title > b.title) return 1;
        return 0;
    });
    */
    
      
  };



  return { createPlaylist, addSongToPlaylist, removeSongFromPlaylist, sortSongs, getAllPlaylists, removePlaylist, favoriteSong };

};

const song = { title: 'Billie Jean', artist: 'Michael Jackson', genre: 'Pop', duration: 300 };
const catalog = musicCatalog();
catalog.createPlaylist('Rock Classics');
catalog.createPlaylist('Pop Hits');
catalog.addSongToPlaylist('Rock Classics', song);
const originalPlaylistWithoutPopHitSong = catalog.getAllPlaylists();
console.log(originalPlaylistWithoutPopHitSong);
catalog.addSongToPlaylist('Pop Hits', song);
const playlistWithPopHitsSongs = catalog.getAllPlaylists();
console.log(playlistWithPopHitsSongs);
console.log(originalPlaylistWithoutPopHitSong);
catalog.removeSongFromPlaylist('Pop Hits', song);
const remove = catalog.getAllPlaylists();
console.log(remove);
catalog.removeSongFromPlaylist('Pop Hits', song);
const removeError = catalog.getAllPlaylists();
console.log(removeError);


export default musicCatalog


