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
  totalTimeIListenMusic,
}) => {
  let i = 0;
  const artistsSelect = fetchUniqueArtist.map((a) => (
    <MenuItem value={a} key={i++}>
      {a}
    </MenuItem>
  ));

  const convert = (num) => {
    let hours = 0;
    let day = 0;
    const numb = num / 60000;
    let int = Math.round(numb);
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
    if (hours > 23) {
      day = Math.floor(hours / 24);
      hours = hours % 24;
      return `${day}d${hours}h${int}m${second}s`;
    } else return `${hours}h${int}m${second}s`;
  };

  const musicFromArtist = title.map((m) => (
    <MenuItem value={m} key={i++}>
      {m}
    </MenuItem>
  ));

  return (
    <div className={styles.spotifyApp}>
      <h1 className={styles.title}> Spotify App'</h1>
      <h2 className={styles.title}>
        {" "}
        J'ai quand même écouté{" "}
        {
          <span className={styles.resultDetails}>
            {convert(totalTimeIListenMusic)}
          </span>
        }{" "}
        de musique cette année ...
      </h2>
      <p className={styles.taunt}> J'ai vraiment que ça à faire... </p>
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
      {timeIListenThisSong > 0 && (
        <p className={styles.result}>
          J'ai écouté{" "}
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
      {timeIListenThisSong === 0 && (
        <p className={styles.result}>
          What the hell spotify? I never listened that song the past year...
        </p>
      )}
    </div>
  );
};

export default SpotifyView;
