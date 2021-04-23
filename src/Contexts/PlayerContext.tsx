import { createContext, useState, ReactNode, useContext } from 'react';
import { IEpisode } from 'Models/episode.model';

interface IPlayerContext {
  episodeList: IEpisode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  play(episode: IEpisode): void;
  playList(episodes: IEpisode[], index: number): void;
  playPrev(): void;
  playNext(): void;
  toggleIsPlaying(): void;
  toggleIsLooping(): void;
  toggleIsShuffling(): void;
  setPlayingState(state: boolean): void;
  clearPlayerState(): void;
}

interface ProviderProps {
  children: ReactNode;
}

const PlayerContext = createContext({} as IPlayerContext);

export const usePlayer = (): IPlayerContext => useContext(PlayerContext);

export function PlayerContextProvider({ children }: ProviderProps): JSX.Element {
  const [episodeList, setEpisodeList] = useState([] as IEpisode[]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

  function play(episode: IEpisode): void {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playPrev() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function playNext() {
    if (isShuffling) {
      setCurrentEpisodeIndex(Math.floor(Math.random() * episodeList.length));
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playList(episodes: IEpisode[], index: number) {
    setEpisodeList(episodes);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function toggleIsPlaying(): void {
    setIsPlaying(!isPlaying);
  }

  function toggleIsLooping(): void {
    setIsLooping(!isLooping);
  }

  function toggleIsShuffling(): void {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean): void {
    setIsPlaying(state);
  }

  function clearPlayerState(): void {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      isPlaying,
      isLooping,
      isShuffling,
      hasPrevious,
      hasNext,
      play,
      playList,
      playPrev,
      playNext,
      toggleIsPlaying,
      toggleIsLooping,
      toggleIsShuffling,
      setPlayingState,
      clearPlayerState
    }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
