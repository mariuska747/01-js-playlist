import musicCatalog from '../playlist';

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
