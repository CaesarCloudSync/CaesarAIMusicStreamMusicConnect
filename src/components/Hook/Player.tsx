// FileName: App.js
import { useRef, useState,useEffect } from "react";
import Player from "./components/PlayerSong";
import Song from "./components/Song";
//import "./styles/app.scss";

// Importing DATA
import chillHop from "./components/data";
import Library from "./components/Library";
import Nav from "./components/Nav";
export default function PlayerApp({currentsong,key}:any) {
  const [songs, setSongs] = useState<any>([currentsong]);
  console.log(songs,"songs")
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const timeUpdateHandler = (e:any) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calculating percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    console.log();
    setSongInfo({
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song:any) => song.id === currentSong.id);

    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

    if (isPlaying) audioRef.current.play();
  };
  const playfromstart = () =>{
    audioRef.current.play();
    setIsPlaying(!isPlaying);
  }
  useEffect(() =>{
    playfromstart()
  },[])
  return (
    <div key={key}>
      <Player
        id={songs.id}
        songs={songs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />

      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        src={currentSong.url}
        ref={audioRef}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}


