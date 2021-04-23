import Image from 'next/image';
import { useContext, useRef, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import styles from './styles.module.scss';
import { PlayerContext } from 'Contexts/PlayerContext';

export function Player(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { episodeList, currentEpisodeIndex, isPlaying, toggleIsPlaying, setPlayingState } = useContext(PlayerContext);
  const playing = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className={`${styles.player} w-96 h-screen py-12 px-16 bg-purple-600 text-white flex flex-col items-center justify-between`}>
      <header className="flex items-center gap-4">
        <img src="/img/playing.svg" alt="Tocando agora" />
        <strong className="font-Lexend font-semibold">
          <span>Tocando agora</span>
          {playing && `: ${playing.title}`}
        </strong>
      </header>

      {playing ? (
        <div className={styles.filledPlayer}>
          <Image width={192} height={192} src={playing.thumbnail} objectFit="cover" />

          <strong>{playing.title}</strong>
          <span>{playing.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!playing ? styles.noSelection : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {playing ? (
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                railStyle={{ backgroundColor: '#9f75ff' }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>00:00</span>
        </div>

        { playing && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <audio ref={audioRef} src={playing.url} autoPlay onPlay={() => setPlayingState(true)} onPause={() => setPlayingState(false)} />
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!playing}>
            <img src="/img/shuffle.svg" alt="embaralhar" />
          </button>
          <button type="button" disabled={!playing}>
            <img src="img/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button type="button" onClick={() => toggleIsPlaying()} className="h-16 w-16 flex items-center justify-center rounded-2xl bg-purple-400" disabled={!playing}>
            {isPlaying ? <img src="/img/pause.svg" alt="Tocar" /> : <img src="/img/play.svg" alt="Pausar" /> }
          </button>
          <button type="button" disabled={!playing}>
            <img src="/img/play-next.svg" alt="Tocar próxima" />
          </button>
          <button type="button" disabled={!playing}>
            <img src="/img/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
