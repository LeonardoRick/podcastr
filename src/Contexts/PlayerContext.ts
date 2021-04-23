import { createContext } from 'react';
import { IEpisode } from 'Models/episode.model';

interface IPlayerContext {
  episodeList: IEpisode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play(episode: IEpisode): void;
  toggleIsPlaying(): void;
  setPlayingState(state: boolean): void;
}

export const PlayerContext = createContext({} as IPlayerContext);
