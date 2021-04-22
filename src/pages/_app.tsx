import 'Styles/globals.scss';
import { Header } from 'Components/Header';
import { Player } from 'Components/Player';

import styles from 'Styles/app.module.scss';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  );
}

export default MyApp;
