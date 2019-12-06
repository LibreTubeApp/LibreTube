import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

export default class CustomDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" key="xUaCompat" />
          <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#f00" />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="icon" type="image/png" href="/static/favicon64.png" sizes="64x64" />
          <link rel="icon" type="image/png" href="/static/favicon48.png" sizes="48x48" />
          <link rel="icon" type="image/png" href="/static/favicon32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/static/favicon16.png" sizes="16x16" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
