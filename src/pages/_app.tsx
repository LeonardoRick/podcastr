import 'Styles/globals.scss';
import { AppProps } from 'next/app';
import { useState } from 'react';
import { Header } from 'Components/Header';
import { Player } from 'Components/Player';

import styles from 'Styles/app.module.scss';
import { PlayerContext } from 'Contexts/PlayerContext';
import { IEpisode } from 'Models/episode.model';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [episodeList, setEpisodeList] = useState([] as IEpisode[]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: IEpisode): void {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function toggleIsPlaying(): void {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean): void {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      isPlaying,
      play,
      toggleIsPlaying,
      setPlayingState
    }}
    >
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  );
}

export default MyApp;
