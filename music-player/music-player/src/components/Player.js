import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons"

const Player = ({setCurrentSong, songs, songInfo, setSongInfo, audioRef, currentSong, isPlaying, setIsPlaying}) => {

    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause();
        }else{
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    const getTime = (time) => {
        return (
            Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    const skipHandler = async (direction) => {
        let currentIdx = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === "forward"){
            await setCurrentSong(songs[(currentIdx + 1) % songs.length])
        }else{
            if((currentIdx - 1) % songs.length === -1){
                await setCurrentSong(songs[songs.length - 1])
            }else{
                await setCurrentSong(songs[(currentIdx - 1) % songs.length])
            }
        }
        if(isPlaying) audioRef.current.play();
    }

    const trackAnimation = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
                    <input onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" />
                <div style={trackAnimation} className="animate-track"></div>
                </div>
                
                <p>{getTime(songInfo.duration ? songInfo.duration : "0:00")}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className='skip-back' size="2x" icon={faAngleLeft} onClick={() => skipHandler("back")}/>
                <FontAwesomeIcon className='play' size="2x" icon={isPlaying ? faPause : faPlay} onClick={playSongHandler} />
                <FontAwesomeIcon className='skip-forward' size="2x" icon={faAngleRight} onClick={() => skipHandler("forward")}/>
            </div>
        </div>  
    )
}

export default Player;