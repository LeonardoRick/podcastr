import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import styles from './styles.module.scss';
import { usePlayer } from 'Contexts/PlayerContext';
import { convertDurationToTimeString } from 'Utils/convertDurationToTimeString';

export function Player(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null);
  // since the progresss is not something related to the player context, but
  // only to this component, we'll create the progress control over here
  const [progress, setProgress] = useState(0);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    hasPrevious,
    hasNext,
    toggleIsPlaying,
    toggleIsLooping,
    toggleIsShuffling,
    setPlayingState,
    clearPlayerState,
    playPrev,
    playNext
  } = usePlayer();

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

  function setupProgressListener() {
    // everytime we change the audio playing, we set it to zero
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setProgress(Math.floor(audioRef.current.currentTime));
        }
      });
    }
  }

  function handleSliderChange(amount: number): void {
    // amount is the number on duration which the user positionated the little ball on the scroll
    // its based on max value so we have control over it
    if (audioRef.current) {
      audioRef.current.currentTime = amount;
      setProgress(amount);
    }
  }

  function handleEpisodeEnded(): void {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }

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
          <span className="mr-3">{convertDurationToTimeString(progress)}</span>
          <div className={styles.slider}>
            {playing ? (
              <Slider
                max={playing.duration}
                value={progress}
                onChange={handleSliderChange}
                trackStyle={{ backgroundColor: '#04d361' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                railStyle={{ backgroundColor: '#9f75ff' }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>{convertDurationToTimeString(playing?.duration ?? 0)}</span>
        </div>

        {playing && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <audio
            // fires exactly when the audio loaded the episode data
            onLoadedMetadata={setupProgressListener}
            onEnded={handleEpisodeEnded}
            ref={audioRef}
            // always when url changes, it changes play the audio again
            src={playing.url}
            loop={isLooping}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}

        <div className={styles.buttons}>
          <button
            type="button"
            disabled={!playing}
            onClick={toggleIsShuffling}
            className={isShuffling ? styles.isActive : ''}
          >
            <img src="/img/shuffle.svg" alt="embaralhar" />
          </button>

          <button
            type="button"
            disabled={!playing || !hasPrevious}
            onClick={playPrev}
          >
            <img src="/img/play-previous.svg" alt="Tocar anterior" />
          </button>

          <button
            type="button"
            disabled={!playing}
            onClick={toggleIsPlaying}
            className="h-16 w-16 flex items-center justify-center rounded-2xl bg-purple-400"
          >
            {isPlaying ? <img src="/img/pause.svg" alt="Tocar" /> : <img src="/img/play.svg" alt="Pausar" />}
          </button>

          <button onClick={playNext} type="button" disabled={!playing || !hasNext}>
            <img src="/img/play-next.svg" alt="Tocar próxima" />
          </button>

          <button
            type="button"
            disabled={!playing}
            onClick={toggleIsLooping}
            className={isLooping ? styles.isActive : ''}
          >
            <img src="/img/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
