import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { convertDurationToTimeString } from 'Utils/convertDurationToTimeString';
import { IEpisode } from 'Models/episode.model';
import { IEpisodesResponseData } from 'Models/episodes.response.model';

export function convertResponseToEpisodeList(data: IEpisodesResponseData[]): IEpisode[] {
  return data.map(episode => ({
    id: episode.id,
    title: episode.title,
    thumbnail: episode.thumbnail,
    members: episode.members,
    // iso is to convert string to date
    publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(episode.file.duration),
    durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
    description: episode.description,
    url: episode.file.url
  } as IEpisode));
}
