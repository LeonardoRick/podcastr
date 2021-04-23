import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import { IEpisodesResponse } from 'Models/episodes.response.model';
import { api } from 'Services/api';
import { IEpisode } from 'Models/episode.model';
import styles from 'pages/home.module.scss';
import { convertResponseToEpisodeList } from 'Utils/convertResponseToEpisodeList';
import { usePlayer } from 'Contexts/PlayerContext';

interface HomeProps {
  latestEpisodes: IEpisode[];
  remainEpisodes: IEpisode[];
}

export default function Home({ latestEpisodes, remainEpisodes }: HomeProps): JSX.Element {
  const { playList } = usePlayer();

  const episodeList = [...latestEpisodes, ...remainEpisodes];

  return (
    <div className={`${styles.homepage} px-16 overflow-y-scroll`}>

      <Head>
        <title>Home | Podcastr</title>
      </Head>
      <section className={styles.latestEpisodes}>
        <h2 className="mt-12 mb-6">Últimos lançamentos</h2>
        <ul className="list-none grid grid-cols-2 gap-6">
          {latestEpisodes.map((episode, index) => (
            <li className="bg-white border border-solid border-gray-100 p-5 rounded-3xl relative flex items-center" key={episode.id}>
              <Image
                className={styles.imageWrapper}
                width={192}
                height={192}
                objectFit="cover"
                src={episode.thumbnail}
                alt={episode.title}
              />

              <div className={`${styles.details} flex-1 ml-4`}>
                <Link href={`/episodes/${episode.id}`}>
                  <a className="block text-gray-800 font-Lexend font-semibold leading-5 hover:underline">{episode.title}</a>
                </Link>
                <p className="text-sm mt-2 overflow-hidden overflow-ellipsis">{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button
                type="button"
                onClick={() => playList(episodeList, index)}
                className={`${styles.playButton}
                absolute right-8 bottom-8 w-10 h-10 bg-white border border-solid border-gray-100 rounded-lg flex items-center justify-center`}
              >
                <img className="h-6 w-6" src="img/play-green.svg" alt="Tocar episódio" />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.remainEpisodes}>
        <h2>Todos os episódios</h2>
        <table cellSpacing={0}>
          <thead className="text-left">
            <tr>
              <th> </th>
              <th>Poadcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {remainEpisodes.map((episode, index) => (
              <tr key={episode.id}>
                <td style={{ width: '72px' }}>
                  <Image src={episode.thumbnail} width={120} height={120} objectFit="cover" alt={episode.title} />
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}><a>{episode.title}</a></Link>
                </td>
                <td>{episode.members}</td>
                <td className="whitespace-nowrap text-center">{episode.publishedAt}</td>
                <td>{episode.durationAsString}</td>
                <td>
                  <button
                    onClick={() => playList(episodeList, index + latestEpisodes.length)}
                    className={`${styles.remainPlayButton}
                    w-8 h-8 bg-white border border-solid border-gray-100 rounded-lg flex items-center justify-center`}
                    type="button"
                  >
                    <img src="/img/play-green.svg" alt="Tocar episódio" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
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
      _order: 'desc',
    },
  }) as IEpisodesResponse;

  const episodes: IEpisode[] = convertResponseToEpisodeList(data);

  const latestEpisodes = episodes.slice(0, 2);
  const remainEpisodes = episodes.slice(2, episodes.length);
  return {
    // props is a default key
    props: {
      latestEpisodes,
      remainEpisodes,
    } as HomeProps,
    // each 8 hours a new call is maded, otherwise, the static generated is
    // sent to every user
    revalidate: 60 * 60 * 8, // seconds
  };
};
