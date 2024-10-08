// FileName: Song.js

import React from "react";

const Song = ({ currentSong }:any) => {
    return (
        <div className="song-container">
            <img src={currentSong.thumbnail} alt={currentSong.name} />
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
        </div>
    );
};

export default Song;
