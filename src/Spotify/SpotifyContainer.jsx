import React, { useState, useEffect } from "react";

import DATA from "./spotifyData.json";
import SpotifyView from "./SpotifyView";

const SpotifyContainer = () => {
  const [artists, setArtists] = useState([]);
  const [choosenArtist, setChoosenArtist] = useState("");
  const [title, setTitle] = useState([]);
  const [choosenSong, setChoosenSong] = useState("");
  const [timeIListenThisSong, setTimeIListenThisSong] = useState(null);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = () => {
    DATA.map((a) => setArtists((artists) => [...artists, a.artistName]));
  };

  const fetchUniqueArtist = artists
    .sort()
    .filter((e, i) => artists.indexOf(e) === i)
    .sort();

  const handleArtistChange = (e) => {
    setTimeIListenThisSong(null);
    setChoosenArtist(e?.target.value);
    let unique = {};
    DATA.filter((el) => el.artistName === e.target.value)
      .map((s) => s.trackName)
      .forEach((e) => {
        if (!unique[e]) {
          unique[e] = true;
        }
      });
    setTitle(Object.keys(unique).sort());
  };

  const calculateListeningTime = (song) => {
    const songMs = DATA.filter((el) => el.trackName === song).map(
      (t) => t.msPlayed
    );
    console.log(songMs);

    const totalMs = songMs.reduce((f, s) => f + s);
    setTimeIListenThisSong(totalMs);
  };

  const handleMusicChange = (e) => {
    setChoosenSong(e.target.value);
    calculateListeningTime(e.target.value);
  };

  return (
    <SpotifyView
      timeIListenThisSong={timeIListenThisSong}
      title={title}
      fetchUniqueArtist={fetchUniqueArtist}
      choosenArtist={choosenArtist}
      handleArtistChange={handleArtistChange}
      handleMusicChange={handleMusicChange}
      choosenSong={choosenSong}
    />
  );
};

export default SpotifyContainer;
