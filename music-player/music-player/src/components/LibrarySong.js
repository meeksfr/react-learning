import React from 'react';
import {playAudio} from "../util.js"

const LibrarySong = ({currentSong, song, setCurrentSong, audioRef, isPlaying}) => {
    const songSelectHandler = () => {
        setCurrentSong(song);
        
        playAudio(isPlaying, audioRef)
        
    }
    return(
        <div onClick={songSelectHandler} className={`library-song ${song.id === currentSong.id ? "selected":"unselected"}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
            
        </div>  
    )
}

export default LibrarySong;