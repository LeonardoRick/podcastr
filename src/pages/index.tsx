import ptBR from 'date-fns/locale/pt-BR';
import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';

import { api } from 'Services/api';

import { EpisodesResponse } from 'Models/episodes.response.model';
import { Episode } from 'Models/episode.model';
import { convertDurationToTimeString } from 'Utils/convertDurationToTimeString';

interface HomeProps {
  episodes: Episode[];
}

export default function Home(props: HomeProps): JSX.Element {
  const { episodes } = props;
  return (
    <>
      <h1>index</h1>
      <p>{JSON.stringify(episodes)}</p>
    </>
  );
}

// SSG
// next.js server default function. Executed before component to make SSG
// executed verytime a user access our homepage. Only works on production
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    },
  }) as EpisodesResponse;

  const episodes: Episode[] = data.map(episode => ({
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
  } as Episode));
  return {
    // props is a default key
    props: {
      episodes,
    },
    // each 8 hours a new call is maded, otherwise, the static generated is
    // sent to every user
    revalidate: 60 * 60 * 8 // seconds
  };
};
