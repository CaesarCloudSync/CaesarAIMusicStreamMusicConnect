import React from "react";
import LibrarySong from "./LibrarySong";

export default function Library({
    songs,
    setCurrentSong,
    audioRef,
    isPlaying,
    setSongs,
    setLibraryStatus,
    libraryStatus,
}:any){
    return (
        <div className={`library ${libraryStatus ? "active" : ""}`}>
            <h2 style={{ color: "white" }}>All songs</h2>
            <div className="library-songs">
                {songs.map((song:any) => (
                    <LibrarySong
                        setSongs={setSongs}
                        isPlaying={isPlaying}
                        audioRef={audioRef}
                        songs={songs}
                        song={song}
                        setCurrentSong={setCurrentSong}
                        id={song.id}
                        key={song.id}
                    />
                ))}
            </div>
        </div>
    );
};
