import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({libraryStatus, currentSong, songs, setCurrentSong, audioRef, isPlaying}) => {
    return (
        <div className={`library ${libraryStatus ? "active":""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => <LibrarySong currentSong={currentSong} isPlaying={isPlaying} audioRef={audioRef} song={song} setCurrentSong={setCurrentSong} key={song.id}/>)}
            </div>
        </div>
    )
}

export default Library;