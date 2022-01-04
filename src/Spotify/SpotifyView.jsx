import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import SpotifyIco from "./Spotify.svgIcons";
import styles from "./spotify.module.scss";

const SpotifyView = ({
  fetchUniqueArtist,
  choosenArtist,
  handleArtistChange,
  title,
  handleMusicChange,
  choosenSong,
  timeIListenThisSong,
}) => {
  let i = 0;
  const artistsSelect = fetchUniqueArtist.map((a) => (
    <MenuItem value={a} key={i++}>
      {a}
    </MenuItem>
  ));

  const convert = (num) => {
    let hours = 0;
    const numb = num / 60000;
    let int = Math.round(numb);
    console.log(int);
    if (int > 59) {
      hours = Math.floor(int / 60);
      int = int % 60;
      if (int < 10) {
        int = `0${int}`;
      }
    }
    let decimal = numb - Math.floor(numb);
    let second = Math.round(decimal * 60);
    if (second < 10) {
      second = `0${second}`;
    }

    return `${hours}h${int}m${second}s`;
  };

  const musicFromArtist = title.map((m) => (
    <MenuItem value={m} key={i++}>
      {m}
    </MenuItem>
  ));

  return (
    <div className={styles.spotifyApp}>
      <h1 className={styles.title}> Spotify App'</h1>
      <div className={styles.selectInput}>
        <FormControl className={styles.input}>
          <InputLabel>Artist</InputLabel>
          <Select
            label="Artist"
            value={choosenArtist}
            onChange={handleArtistChange}
          >
            {artistsSelect}
          </Select>
        </FormControl>
        {choosenArtist && (
          <a
            href={`https://open.spotify.com/search/${choosenArtist}`}
            rel="noreferrer"
            target="_blank"
          >
            <SpotifyIco style={{ fontSize: "90px" }} />
          </a>
        )}
      </div>

      {title.length > 0 && (
        <div className={styles.selectInput}>
          <FormControl className={styles.input}>
            <InputLabel>Song</InputLabel>
            <Select
              label="Song"
              value={choosenSong}
              onChange={handleMusicChange}
            >
              {musicFromArtist}
            </Select>
          </FormControl>
          {choosenSong && (
            <a
              href={`https://open.spotify.com/search/${choosenArtist}%20${choosenSong}`}
              rel="noreferrer"
              target="_blank"
            >
              <SpotifyIco style={{ fontSize: "90px" }} />
            </a>
          )}
        </div>
      )}
      {timeIListenThisSong && (
        <p className={styles.result}>
          Clem' a écouté{" "}
          {<span className={styles.resultDetails}>{choosenSong}</span>} de{" "}
          {<span className={styles.resultDetails}>{choosenArtist}</span>}{" "}
          pendant{" "}
          {
            <span className={styles.resultDetails}>
              {convert(timeIListenThisSong)}
            </span>
          }{" "}
          sur l'année 2021.
        </p>
      )}
    </div>
  );
};

export default SpotifyView;
