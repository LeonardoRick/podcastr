import Link from 'next/link';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import styles from './styles.module.scss';
import { api } from 'Services/api';
import { IEpisode } from 'Models/episode.model';
import { convertResponseToEpisodeList } from 'Utils/convertResponseToEpisodeList';
import { IEpisodesResponse } from 'Models/episodes.response.model';

// https://github.com/vercel/next.js/discussions/16522
interface Params extends ParsedUrlQuery {
  slug: string;
}

interface EpisodeProps {
  episode: IEpisode;
}

export default function Episode({ episode }: EpisodeProps): JSX.Element {
  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/img/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>

        <Image width={700} height={160} objectFit="cover" src={episode.thumbnail} />
        <button type="button">
          <img src="/img/play.svg" alt="Tocar áudio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.title}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: IEpisodesResponse = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  return {
    paths: data.map(episode => ({ params: { slug: episode.id } })),
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;
  const { data } = await api.get(`/episodes/${slug}`);
  const [episode] = convertResponseToEpisodeList([data]);
  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // 24 hours
  };
};
