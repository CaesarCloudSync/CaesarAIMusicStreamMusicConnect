// FileName: PlayerSong.js

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
    currentSong,
    isPlaying,
    setIsPlaying,
    audioRef,
    setSongInfo,
    songInfo,
    songs,
    setCurrentSong,
    id,
    setSongs,
}:any) => {
    //useEffect
    const activeLibraryHandler = (nextPrev:any) => {
        const newSongs = songs.map((song:any) => {
            if (song.id === nextPrev.id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSongs);
        console.log("Hey from useEffect form player JS");
    };
    //Event Handlers
    const dragHandler = (e:any) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const getTime = (time:any) =>
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    const skipTrackHandler = async (direction:any) => {
        let currentIndex = songs.findIndex(
            (song:any) => song.id === currentSong.id
        );
        if (direction === "skip-forward") {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if (direction === "skip-back") {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                // playAudio(isPlaying, audioRef);
                activeLibraryHandler(songs[songs.length - 1]);

                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        if (isPlaying) audioRef.current.play();
    };
    //adding the styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    };
    return (
        <div className="player" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div className="time-control" style={{display:"flex"}}>
                <p style={{color:"white"}}>{getTime(songInfo.currentTime)}</p>
                <div
                 
                    className="track"
                >
                    <input
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                        type="range"
                        style={{width:"400px"}}
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p style={{color:"white"}}>
                    {songInfo.duration ? getTime(songInfo.duration) : "00:00"}
                </p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler("skip-back")}
                    size="2x"
                    style={{color:"white"}}
                    className="skip-back"
                    icon={faAngleLeft}
                />
                {!isPlaying ? (
                    <FontAwesomeIcon
                        onClick={playSongHandler}
                        size="2x"
                        style={{color:"white"}}
                        className="play"
                        icon={faPlay}
                    />
                ) : (
                    <FontAwesomeIcon
                        onClick={playSongHandler}
                        size="2x"
                        style={{color:"white"}}
                        className="pause"
                        icon={faPause}
                    />
                )}

                <FontAwesomeIcon
                    onClick={() => skipTrackHandler("skip-forward")}
                    size="2x"
                    style={{color:"white"}}
                    className="skip-forward"
                    icon={faAngleRight}
                />
            </div>
        </div>
    );
};

export default Player;
