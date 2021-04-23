import 'Styles/globals.scss';
import { AppProps } from 'next/app';
import { Header } from 'Components/Header';
import { Player } from 'Components/Player';

import styles from 'Styles/app.module.scss';
import { PlayerContextProvider } from 'Contexts/PlayerContext';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );
}

export default MyApp;
