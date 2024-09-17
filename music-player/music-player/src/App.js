import React, {useRef, useState} from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import "./styles/app.scss"

import data from "./data"

function App() {
  const [songs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  const audioRef = useRef(null);

  const timeUpdateHandler = (e) => {
    const curTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime: curTime, duration})
  }

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    endTime: 0,
  })

  return (
    <div className="App">
      
     <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
     <Song currentSong={currentSong}/>
     <Player setCurrentSong={setCurrentSong} songs={songs} songInfo={songInfo} setSongInfo={setSongInfo} audioRef={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong}/>
     <Library libraryStatus={libraryStatus} currentSong={currentSong} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong}/>
     <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
