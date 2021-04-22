import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />
        </Head>
        <body>
          {/* main é onde vai ficar nossa aplicação */}
          <Main />
          {/* scripts qu eo next precisa injetar para que ela funcione */}
          <NextScript />
        </body>
      </Html>
    );
  }
}
